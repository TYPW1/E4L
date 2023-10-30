import React from "react";
import {Checkbox, FormControlLabel, FormGroup, Slider} from "@material-ui/core";
import {Col, Row} from "react-bootstrap";
import lux from "../../public/img/luxembourg.svg";

export default function LandCalculator(props) {

    const [state, setState] = React.useState({
        solar: true,
        wind: false,
        bio: false,
        windsolar: false,
        windbio: false,
        energyConsumption: props.userResult.toFixed(0),
        areaRatio: 0,
        neededArea: 0,
        youMarkOverlaps: false,
        lux: {
            width: 0,
            height: 0
        },
        circle: {
            x: 0,
            y: 0,
            radius: 0
        }
    });

    const marks = [
        {
            label: 'You',
            value: props.userResult.toFixed(0)
        },
        {
            label: 'Luxembourg',
            value: 206
        },
        {
            label: 'EU',
            value: 102
        },
        {
            label: 'World',
            value: 62
        },
    ]

    const green = "#29a745"
    const blue = "#007bff"
    const gray = "#6c757d"
    const cyan = "#17a2b8"
    const yellow = "#ffc107"

    const energyColor = (s) => {
        if (s.solar)
            return yellow;
        else if (s.wind)
            return  blue;
        else if (s.bio)
            return  gray;
        else if (s.windsolar)
            return green;
        else if (s.windbio)
            return cyan;
    }

    const handleCheckboxChange = (event) => {
        if (!event.target.checked)
            return

        const states = {solar: false, wind: false, bio: false, windbio: false, windsolar: false}
        setState({...state, ...states, [event.target.name]: event.target.checked});
        updateCircle(state.energyConsumption)
    };

    const handleSliderChange = (event, val) => {
        setState({...state, energyConsumption: val});
        updateCircle(val)
    };

    const handleImageLoaded = (event) => {
        const w = event.target.width;
        const h = event.target.height;
        setState({...state, lux: {...state.lux, width: w, height: h}, youMarkOverlaps: checkYouOverlaps()});
        updateCircle(state.energyConsumption)
    };

    const checkYouOverlaps = () => {
        try {
            let marks = document.querySelectorAll(".MuiSlider-markLabel");

            let youMark = marks[0].getBoundingClientRect();
            let youL = youMark.left;
            let youR = youMark.right;

            for (let i = 1; i < marks.length; i++) {
                let mark = marks[i].getBoundingClientRect();
                if ((mark.left <= youL && youL <= mark.right) || (mark.left <= youR && youR <= mark.right))
                    return true;
            }
        } catch (e) {
            console.log(e)
        }

        return false;
    }

    const updateCircle = (energy) => {
        setState((s) => {
            let {neededAreaRatio, neededArea, circleRadius} = calcRadius(s)
            circleRadius = Math.min(circleRadius, Math.sqrt(Math.pow(s.lux.width, 2) + Math.pow(s.lux.height, 2)) / 2)
            return {
                ...s,
                areaRatio: neededAreaRatio,
                neededArea: neededArea,
                circle: {
                    ...s.circle,
                    x: s.lux.width / 2 - circleRadius,
                    y: s.lux.height / 2 - circleRadius,
                    radius: circleRadius
                }
            }
        })
    }

    const calcRadius = (s) => {
        const energyConsumption = s.energyConsumption;
        const imgHeight = s.lux.height;

        const luxHeight = 82;
        const luxPopulation = 614000;
        const luxArea = 2586;
        const daysInYear = 365;
        const solarEnergy = 180 * 1000000;
        const windEnergy = 22 * 1000000;
        const bioEnergy = 2 * 1000000;
        const windSolarEnergy = windEnergy + solarEnergy;
        const windBioEnergy = windEnergy + bioEnergy;

        let selectedEnergy = -1;

        if (s.solar)
            selectedEnergy = solarEnergy;
        else if (s.wind)
            selectedEnergy = windEnergy;
        else if (s.bio)
            selectedEnergy = bioEnergy;
        else if (s.windsolar)
            selectedEnergy = windSolarEnergy;
        else if (s.windbio)
            selectedEnergy = windBioEnergy;

        const scalingFactor = imgHeight / luxHeight;
        const totalConsumptionPerYear = energyConsumption * luxPopulation * daysInYear;
        const neededArea = totalConsumptionPerYear / selectedEnergy;
        const neededRadius = Math.sqrt(neededArea / Math.PI);
        const circleRadius = neededRadius * scalingFactor;
        const neededAreaRatio =  neededArea / luxArea;

        return {neededAreaRatio, neededArea, circleRadius};
    }

    const circleStyle = {
        marginTop: state.circle.y,
        marginLeft: state.circle.x,
        display: "inline-block",
        position:'absolute',
        backgroundColor: energyColor(state),
        borderRadius: "50%",
        overflow: "hidden",
        // lineHeight: `${state.circle.radius *2}px`,
        paddingTop: state.circle.radius - 26,
        verticalAlign: "middle",
        textAlign: "center",
        fontWeight: "900",
        color: "white",
        opacity: 0.9,
        width: state.circle.radius * 2,
        height: state.circle.radius * 2,
    };

    return (<div style={{width: "100%"}}>
        <Row style={{marginTop: "35px"}}>
            <Slider
                className={state.youMarkOverlaps ? "overlaps" : ""}
                defaultValue={props.userResult.toFixed(0)}
                aria-labelledby="discrete-slider-always"
                step={1}
                min={50}
                max={300}
                marks={marks}
                track={false}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
                name="energyConsumption"
            />
        </Row>
        <Row style={{marginTop: "20px"}}>
            <Col xs={3}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox style={{color: energyColor({solar: true})}} checked={state.solar} onChange={handleCheckboxChange} name="solar"/>}
                        label="Solar"
                    />
                    <FormControlLabel
                        control={<Checkbox style={{color: energyColor({wind: true})}} checked={state.wind} onChange={handleCheckboxChange} name="wind"/>}
                        label="Wind"
                    />
                    <FormControlLabel
                        control={<Checkbox style={{color: energyColor({bio: true})}} checked={state.bio} onChange={handleCheckboxChange} name="bio"/>}
                        label="Biomass"
                    />
                    <FormControlLabel
                        control={<Checkbox style={{color: energyColor({windsolar: true})}} checked={state.windsolar} onChange={handleCheckboxChange} name="windsolar"/>}
                        label="Wind + Solar"
                    />
                    <FormControlLabel
                        control={<Checkbox style={{color: energyColor({windbio: true})}} checked={state.windbio} onChange={handleCheckboxChange} name="windbio"/>}
                        label="Wind + Biomass"
                    />
                </FormGroup>
            </Col>
            <Col xs={9}>
                <div style={{width: "fit-content", height: "fit-content", float: "right", overflow: "hidden", position: "relative"}}>
                    <div style={circleStyle}>
                        {(state.areaRatio * 100).toLocaleString('de-DE', {minimumFractionDigits: 0, maximumFractionDigits: 1})}%
                        <br/>
                        {(state.neededArea).toLocaleString('de-DE', {minimumFractionDigits: 0, maximumFractionDigits: 1})} km<sup>2</sup>
                    </div>
                    <img alt="lux" onLoad={handleImageLoaded} src={lux} style={{width: "100%", maxWidth: "550px"}}/>
                </div>
            </Col>
        </Row>
    </div>);

}
