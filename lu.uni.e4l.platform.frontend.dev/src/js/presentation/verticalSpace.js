import React from "react";

export class VerticalSpace extends React.Component {

    render() {
        let height = this.props.vheight;
        return(
            <div style={{height:`${height}em`}}/>
        )
    }
}