import React from "react";
import { Answer } from "./answer";
import { connect } from "react-redux";
import { MDBBtn } from "mdbreact";
import { Trans } from "react-i18next";
import { Modal, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

@connect((store) => {
  return {
    answerReducer: store.answerReducer,
    questionnaireReducer: store.questionnaireReducer,
  };
})
export class Question extends React.Component {
constructor(props) {
 super(props);
    this.state = {
      show: false,
      isSmallScreen: !window.matchMedia("(min-width: 768px)").matches
    };
this.handleClose = this.handleClose.bind(this);
this.handleShow = this.handleShow.bind(this);
}
   handleShow = () => {
        this.setState({ show: true });
     };

    handleClose = () => {
       this.setState({ show: false });
     };

    componentDidMount() {
        const handler = e => this.setState({isSmallScreen: !e.matches});
        window.matchMedia("(min-width: 768px)").addListener(handler);
    }

  render() {
    let cssColWidth = 3;
    switch (this.props.possibleAnswers.length) {
      case 1:
        cssColWidth = 12;
        break;
      case 2:
        cssColWidth = 6;
        break;
      case 3:
        cssColWidth = 4;
        break;
    }

    return (
      <div className="row noMargin">
        <Row
          className="noMargin"
          style={{ paddingLeft: "10px", width: "100%" }}
        >
          <Col className="noPadding" md={11} xs={10} style={{ paddingTop: "8px" }}>
            <h4>{this.props.name}</h4>
          </Col>
          {this.props.detailsFile && (
                      <Col md={1} xs={2}
                        className="noMargin padding"
                        style={{ textAlign: "right" }}
                      >
          <Button variant="primary" onClick={this.handleShow} style={{float: "right"}}>
                          Info
                        </Button>

                  <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.show} onHide={this.handleClose} animation={false}>
                          <Modal.Header closeButton>
                            <Modal.Title>Information</Modal.Title>
                          </Modal.Header>
                          <Modal.Body><iframe src={this.props.detailsFile} style={{width: '100%', height:'700px'}}/></Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        </Col>
               )}
          </Row>

        <div className="show error message"
        style={{color: 'red', padding: this.state.isSmallScreen ? "0" : "20px", display: "flex", justifyContent: "center",alignItems: "center", width: "100%" }}>
        {this.getErrorMsg()}</div>

        <div className="row noMargin justify-content-center">
          {this.props.possibleAnswers.map((object, _) => (
            <Answer
              {...object}
              cssColWidth={cssColWidth}
              selectability={this.getPossibleAnswerState(this.props, object)}
              currentQuestion={this.props}
              key={object.id}
            />
          ))}
        </div>
      </div>
    );
  }
    getErrorMsg = ()=>{
    const showMaxThreshErrorMsg = this.props.questionnaireReducer.showMaxThreshErrorMsg
        if(this.props.questionnaireReducer.showMaxThreshErrorMsg){
            return <div>{this.props.questionnaireReducer.maxThreshErrorMsg}</div>
        }
    }

  getPossibleAnswerState = (question, possibleAnswer) => {
    const { answers } = this.props.answerReducer.session;
    let allPossibleAnswersInSelectedAnswers = answers.filter((item) =>
      question.possibleAnswers
        .map((item) => item.id)
        .includes(item.possibleAnswer.id)
    );
    let possibleAnswerInSelectedAnswers = answers
      .map((item) => item.possibleAnswer.id)
      .includes(possibleAnswer.id);
    if (possibleAnswerInSelectedAnswers) {
      return "selected";
    } else if (
      !possibleAnswerInSelectedAnswers &&
      question.maxAnswersNumber == 1 &&
      allPossibleAnswersInSelectedAnswers.length == 1
    ) {
      return "binarySelectable";
    } else if (
      !possibleAnswerInSelectedAnswers &&
      allPossibleAnswersInSelectedAnswers.length < question.maxAnswersNumber
    ) {
      return "selectable";
    } else if (
      !possibleAnswerInSelectedAnswers &&
      allPossibleAnswersInSelectedAnswers.length >= question.minAnswersNumber &&
      allPossibleAnswersInSelectedAnswers.length == question.maxAnswersNumber
    ) {
      return "notSelectable";
    }
  };
}
