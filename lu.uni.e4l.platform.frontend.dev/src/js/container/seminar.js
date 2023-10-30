import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { profileUpdateRequest } from "../action/userAction";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Select from "react-select";
import languageOptions from '../../public/profile/langs.json';
import { Trans } from "react-i18next";
import i18n from "../i18n";
import { Link } from "react-router-dom";
import { hideNavButton, showNavButton } from "../action/navAction";
import { getUser } from "../action/userAction"
import navReducer from "../reducer/navReducer";
import regeneratorRuntime from "regenerator-runtime";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { StatusSwitchButton } from "../presentation/StatusSwitchButton";
import NavBarAdmin from "../presentation/NavBarAdmin";
// import Table from "react-bootstrap/Table";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { VerticalSpace } from "../presentation/verticalSpace.js";
import { FixedSizeList } from "react-window";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Column } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { seminarListGetRequest, seminarCreateRequest, seminarDeleteRequest, seminarPutRequest } from "../action/seminarAction";
import { AdditionalSeminarInfo } from "./AdditionalSeminarInfo";

@connect((store) => {
    return {
        seminarReducer: store.seminarReducer,
    }
})
export class Seminar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            utils: {
                page: 0,
                rowsPerPage: 3,
                error: null,
                showCreate: false,
                showUpdate: false,
                createSubmitted: false,
                orderBy: 'eventDateTime',
                selected: null,
                order: 'asc',
                seminars: this.props.seminarReducer.seminars,
            },
            id: '',
            accessCode: '',
            eventDateTime: new Date(),
            address: '',
            audience: '',
            description: '',
            name: '',
            presenters: '',
            status: 'TODO',
        }
    }

    componentDidMount() {
        this.props.dispatch(seminarListGetRequest())
    }
    
    resetAndAddToState = (object) => {

        let new_state = {
            id: '',
            accessCode: '',
            eventDateTime: new Date(),
            address:'',
            audience: '',
            description: '',
            name: '',
            presenters: '',
            status: 'TODO', 
            object
        }

        this.setState(new_state)
    }

    resetAndAddToStateSelected = (seminarId) => {
        this.resetAndAddToState({...this.state.utils, selected: seminarId, submitted: true, seminars: this.props.seminarReducer.seminars, })
    }

    setSeminarInState = (seminar, object) => {
        this.setState({
            id: seminar.id,
            accessCode: seminar.accessCode,
            eventDateTime: new Date(seminar.eventDateTime),
            address: seminar.address,
            audience: seminar.audience,
            description: seminar.description,
            name: seminar.name,
            presenters: seminar.presenters,
            status: seminar.status,
            utils: object
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    handleDateChange = (date) => {
        this.setState({
            eventDateTime: date
        });
    }

    handleDelete = (id) => {
        this.setState({ utils: {...this.state.utils, page: 0}})
        this.props.dispatch(seminarDeleteRequest(id)).then(this.resetAndAddToState({utils: { ...this.state.utils, selected: null, page: 0, seminars: this.props.seminarReducer.seminars,} }))
    }

    handleSubmitCreate = (event) => {
        event.preventDefault();
        let newSeminar = Object.assign({}, this.state);
        delete newSeminar.utils;
        this.props.dispatch(seminarCreateRequest(newSeminar)).then(() => {
            if (!this.props.seminarReducer.isCreationPending && this.props.seminarReducer.isCreated) {
                this.handleCloseCreate();
                this.props.dispatch(seminarListGetRequest()).then(this.resetAndAddToState({ ...this.state.utils, submitted: true, selected: null, seminars: this.props.seminarReducer.seminars,}))
            } else {
                error = this.props.seminarReducer.error.response.data.message;
            }
        });
    };

    handleSubmitUpdate = (event) => {
        event.preventDefault();
        let updatedSeminar = Object.assign({}, this.state);
        delete updatedSeminar.utils;
        let new_seminar2 = this.props.seminarReducer.seminars.find(e => e.id === updatedSeminar.id);
        let merged_seminar = {...new_seminar2, ...updatedSeminar}
        this.props.dispatch(seminarPutRequest(this.state.id, merged_seminar)).then(() => {
            if (!this.props.seminarReducer.isPutPending && this.props.seminarReducer.isPut) {
                this.handleCloseUpdate();
                this.props.dispatch(seminarListGetRequest()).then(this.resetAndAddToState({ ...this.state.utils, submitted: true, selected: null, seminars: this.props.seminarReducer.seminars,}))
            } else {
                error = this.props.seminarReducer.error.response.data.message;
            }
        });
    };

    changeOrdering = (column_id, columns) => {
        let column = columns.find(column => { return column.name === column_id });
        if (column.orderable) {
        const isDesc = this.state.utils.orderBy === column_id && this.state.utils.order === 'desc';
        this.setState({ utils: { ...this.state.utils, selected: null, orderBy: column_id, order: isDesc ? 'asc' : 'desc', page: 0 } });
        } 
    }

    sort = (columns, seminars, status_list) => {
        let column = columns.find(column => { return column.name === this.state.utils.orderBy });
        if (column.orderable) {    
        return column.isDate ? this.sortByDate(this.state.utils.order, seminars) : this.sortByStatus(this.state.utils.order, seminars, status_list);
    } else {
        return this.sortByDate(this.state.utils.order, seminars)
    }
    }

    sortByDate = (order, seminars) => {
        let ordering = order ==='asc' ? 1 : -1;
        let ordered_seminars = seminars.sort( (a, b) => (a.eventDateTime > b.eventDateTime) ? 1*ordering : 
        (a.eventDateTime === b.eventDateTime) ? ((a.id > b.id)? 1*ordering : (-1)*ordering) : (-1)*ordering )
        return ordered_seminars
    }

    sortByStatus = (order, seminars, status_list) => {
        let ordering = order ==='asc' ? 1 : -1;
        let ordered_seminars = seminars.sort( (a, b) => (this.getStatusValue(a.status, status_list) > this.getStatusValue(b.status, status_list)) ? 1*ordering : 
        (this.getStatusValue(a.status, status_list) === this.getStatusValue(b.status, status_list)) ? ((a.eventDateTime > b.eventDateTime)? 1*ordering : (-1)*ordering) : (-1)*ordering )
        return seminars
    }

    getStatusValue = (status, status_list) => {
        return status_list.find(e => {return e.name === status}).value
    }
    
    toInputUppercase = (e) => {
        e.target.value = ("" + e.target.value).toUpperCase();
      };

    handleChangePage = (event, newPage) => {
        this.setState({ utils: { ...this.state.utils, selected: null, page: newPage, } });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ utils: { ...this.state.utils, selected: null, rowsPerPage: event.target.value, page: 0, } })
    };

    handleCloseCreate = () => this.setState({ utils: { ...this.state.utils, selected: null, showCreate: false, } });
    handleShowCreate = () => this.setState({ utils: { ...this.state.utils, selected: null, showCreate: true, } });

    handleCloseUpdate = () => this.setState({ utils: { ...this.state.utils, selected: null, showUpdate: false, } });
    handleShowUpdate = (seminar) => this.setSeminarInState(seminar, { ...this.state.utils, selected: null, showUpdate: true, });

    onRowClick = (value) => {
        if (this.state.utils.selected === null) {
            this.setState({utils: {...this.state.utils, selected: value, }})
        } else if (this.state.utils.selected != value) {
            this.setState({utils: {...this.state.utils, selected: value, }})
        } else {
            this.setState({utils: {...this.state.utils, selected: null, }})
        }
    }

    render() {
        
        const {seminars} = this.props.seminarReducer;
    
        const columns = [
            { name: 'name', orderable: false, isDate: false, label: 'Name', minWidth: 250 },
            { name: 'accessCode', orderable: false, isDate: false, label: 'Access Code', minWidth: 100 },
            { name: 'eventDateTime', orderable: true, isDate: true, label: 'Date', minWidth: 100 },
            { name: 'status', orderable: true, isDate: false, label: 'Status', minWidth: 130 }
        ];

        const status_list = [
            {name: 'OPEN', value: 10},
            {name: 'TODO', value: 9},
            {name: 'CLOSED', value: 8},
            {name: 'CANCELLED', value: 7},
        ];

        let ordered_seminars = this.sort(columns, seminars, status_list)
        ordered_seminars.map( e =>  e.selectability = "rowSelectable")
        let selected_seminar = null;
        if (this.state.utils.selected != null) {
            ordered_seminars.filter(e => {return e.id === this.state.utils.selected}).map(e => e.selectability = "rowSelected")
            selected_seminar = ordered_seminars.find(e => {return e.id === this.state.utils.selected})
        }        

        return (
            <React.Fragment>

                <div className="containerE4l">
                    <div className="card " >
                        <div className="card-body" >
                            <Paper>
                                <TableContainer >
                                    <Table  aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.name}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth, cursor:"pointer" }}
                                                        onClick={() => this.changeOrdering(column.name, columns)}
                                                    >
                                                       {column.orderable==true && this.state.utils.orderBy==column.name && this.state.utils.order=="desc" &&<i className="fas fa-arrow-down"></i>}
                                                       {column.orderable==true && this.state.utils.orderBy==column.name && this.state.utils.order=="asc" &&<i className="fas fa-arrow-up"></i>}
                                                       {column.orderable==true && this.state.utils.orderBy!=column.name &&<i className="fas fa-arrows-alt-v"></i>}
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                                <TableCell style={{ "width": "50px" }}><Button variant="outline-primary" style={{ "width": "100%" }} onClick={this.handleShowCreate} >Create Seminar</Button></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {ordered_seminars.slice(this.state.utils.page * this.state.utils.rowsPerPage, this.state.utils.page * this.state.utils.rowsPerPage + this.state.utils.rowsPerPage).map((el) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={el.id} className={ordered_seminars.find(e => {return e.id === el.id}).selectability} >
                                                    <TableCell onClick={() => this.onRowClick(el.id)} key={"name " + el.name} >
                                                        {el.name}
                                                    </TableCell>
                                                    <TableCell onClick={() => this.onRowClick(el.id)} key={"accesscode " + el.accessCode} >
                                                        {el.accessCode}
                                                    </TableCell>
                                                    <TableCell onClick={() => this.onRowClick(el.id)} key={"eventDateTime " + el.eventDateTime} >
                                                        {this.displayDate(el.eventDateTime)}
                                                    </TableCell>
                                                    <TableCell onClick={() => this.onRowClick(el.id)} key={"status " + el.status} >
                                                        {el.status}
                                                    </TableCell>
                                                    <TableCell style={{ "width": "50px" }}><Button onClick={() => this.handleShowUpdate(el)} style={{ "width": "45%", "marginRight": "4px" }} ><i className="far fa-edit"></i></Button> <Button onClick={() => this.handleDelete(el.id)} style={{ "width": "45%", "marginLeft": "4px" }} ><i className="fas fa-trash-alt"></i></Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[3, 6, 9]}
                                        component="div"
                                        count={ordered_seminars.length}
                                        rowsPerPage={this.state.utils.rowsPerPage}
                                        page={this.state.utils.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </Paper>
                        </div>
                        {this.state.utils.selected!=null && selected_seminar!=null &&
                        <div className="card-body">
                        <Paper style={{padding: "8px"}}>
                        <Row><Col><h3>{selected_seminar.name}</h3></Col><StatusSwitchButton resetAndAddToStateSelected={() => this.resetAndAddToStateSelected} selected_seminar={selected_seminar} /></Row>
                        <Row>
                        <Col >
                        <h5>Access code: {selected_seminar.accessCode}</h5>
                        </Col>
                        <Col>
                        <h5>Planned date: {this.displayDate(selected_seminar.eventDateTime)}</h5>
                        </Col>
                        <Col>
                        <h5>Status: {selected_seminar.status}</h5>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                Presenters: {selected_seminar.presenters}
                            </Col>
                            <Col>
                                Audience: {selected_seminar.audience}
                            </Col>
                            <Col>
                                Location: {selected_seminar.address}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Description: 
                            </Col>
                            <Col>
                                {selected_seminar.description}
                            </Col>
                        </Row>
                        </Paper>
                        <VerticalSpace vheight={1}></VerticalSpace>
                        <AdditionalSeminarInfo selected_seminar={selected_seminar} />
                        </div>}
                    </div>
                </div>
                <Modal
                    show={this.state.utils.showCreate}
                    onHide={this.handleCloseCreate}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>New Seminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.getErrorMsg()}
                        <Form >
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name={"name"} value={this.state.name} onChange={this.handleInputChange} type="text" placeholder="Name of the seminar" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label style={{ "width": "100%" }}>Event date</Form.Label>
                                    <DatePicker placeholderText="Click to select a date" name={"eventDateTime"} className="form-control" dateFormat="dd/MM/yyyy hh:mm " showTimeSelect selected={this.state.eventDateTime} onChange={this.handleDateChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAccessCode">
                                    <Form.Label>Access code</Form.Label>
                                    <Form.Control name={"accessCode"} value={this.state.accessCode} onChange={this.handleInputChange} onInput={this.toInputUppercase} type="text" placeholder="Access code" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridStatus">
                                    <Form.Label style={{ "width": "20%" }}>Status</Form.Label>
                                    <Form.Control  disabled name={"status"} value={"TODO"}  type="text" placeholder="TODO" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control name={"address"} value={this.state.address} onChange={this.handleInputChange} type="text" placeholder="Location of the seminar" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPresenters">
                                    <Form.Label>Presenters</Form.Label>
                                    <Form.Control name={"presenters"} value={this.state.presenters} onChange={this.handleInputChange} type="text" placeholder="Names of the presenters" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAudience">
                                    <Form.Label>Intended audience</Form.Label>
                                    <Form.Control name={"audience"} value={this.state.audience} onChange={this.handleInputChange} type="text" placeholder="Description of the intended audience" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control name={"description"} value={this.state.description} onChange={this.handleInputChange} as="textarea" rows={3} placeholder="Description" />
                                </Form.Group>
                            </Form.Row>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseCreate}>
                            Close
                            </Button>
                        <Button variant="primary" onClick={this.handleSubmitCreate} >Create Seminar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.utils.showUpdate}
                    onHide={this.handleCloseUpdate}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Seminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.getErrorMsg()}
                        <Form >
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control disabled name={"name"} value={this.state.name} type="text" placeholder="Name of the seminar" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label style={{ "width": "100%" }}>Event date</Form.Label>
                                    <DatePicker placeholderText="Click to select a date" name={"eventDateTime"} className="form-control" dateFormat="dd/MM/yyyy hh:mm " showTimeSelect selected={this.state.eventDateTime} onChange={this.handleDateChange} />
                                </Form.Group>

                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAccessCode">
                                    <Form.Label>Access code</Form.Label>
                                    <Form.Control disabled name={"accessCode"} value={this.state.accessCode}  type="text" placeholder="Access code" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridStatus">
                                    <Form.Label style={{ "width": "20%" }}>Status</Form.Label>
                                    <Form.Control  disabled name={"status"} value={this.state.status}  type="text" placeholder="TODO" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control name={"address"} value={this.state.address} onChange={this.handleInputChange} type="text" placeholder="Location of the seminar" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPresenters">
                                    <Form.Label>Presenters</Form.Label>
                                    <Form.Control name={"presenters"} value={this.state.presenters} onChange={this.handleInputChange} type="text" placeholder="Names of the presenters" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridAudience">
                                    <Form.Label>Intended audience</Form.Label>
                                    <Form.Control name={"audience"} value={this.state.audience} onChange={this.handleInputChange} type="text" placeholder="Description of the intended audience" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control name={"description"} value={this.state.description} onChange={this.handleInputChange} as="textarea" rows={3} placeholder="Description" />
                                </Form.Group>
                            </Form.Row>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseUpdate}>
                            Close
                            </Button>
                        <Button variant="primary" onClick={this.handleSubmitUpdate} >Update Seminar</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>


        )
    }
    getErrorMsg = () => {
        if (this.props.seminarReducer.error != null && this.props.seminarReducer.error != undefined && this.props.seminarReducer.error.response != undefined ) {
            return (
                <div className="show error message"
                    style={{ color: 'red', padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {this.props.seminarReducer.error.response.data.message}</div>
            )
        }
    }
    displayDate = (date) => {
        date = new Date(date);
        let day = date.getDate()
        let month = date.getMonth() + 1
        let hours = date.getHours()
        let minutes = date.getMinutes()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }

        return (
            day + '/' + month + '/' + date.getFullYear() + ' ' + hours + ':' + minutes
        )
    }
}