import { connect } from "react-redux";
import React from "react";

@connect((store) => {
    return {
        seminarReducer: store.seminarReducer,
    }
})
export class CreateSeminarPopup extends React.Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }