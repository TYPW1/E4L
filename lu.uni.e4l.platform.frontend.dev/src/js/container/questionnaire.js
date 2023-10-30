import React from "react";
import { Question } from "./question";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from "react-redux";
import {
  fetchQuestionnaire,
  nextPage,
  previousPage,
  restartQuestionnaire,
  resumeQuestionnaire,
  computeEnergy,
} from "../action/questionnaireAction";
import { sendSession } from "../action/answerAction";
import { seminarsGetRequest } from "../action/seminarAction";
import { Trans } from "react-i18next";
import { Redirect } from "react-router-dom";
import { showNavButton } from "../action/navAction";
import { hideMaxThresholdErrorMessage } from "../action/questionnaireAction";

@connect((store) => {
  return {
    questionnaireReducer: store.questionnaireReducer,
    answerReducer: store.answerReducer,
    userReducer: store.userReducer,
    seminarReducer: store.seminarReducer,
  };
})
export class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsFetched: false,
      energyFetched: false,
      isSmallScreen: !window.matchMedia("(min-width: 768px)").matches
    };
  }

  componentWillMount() {
    this.setState({ dataIsFetched: false });
    this.setState({ energyFetched: false });
    // const { session } = this.props.answerReducer;
    // this.props.dispatch(computeEnergy(session)).then(() => {
    //   this.setState({
    //     energyFetched: true,
    //   });
    //   console.log(
    //     "Venkat" + this.props.questionnaireReducer.calculationResult.result
    //   );
    // });
    // this.onClickQuestion = this.onClickQuestion.bind(this);
  }

  componentDidMount() {
    this.props
        .dispatch(fetchQuestionnaire())
        .then(this.setState({ dataIsFetched: true }));
    const handler = e => this.setState({isSmallScreen: !e.matches});
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }

  render() {
    const { sessionId } = this.props.answerReducer;
    const { questions } = this.props.questionnaireReducer.questionnaire;
    const totalNbQuestion = questions.length;
    const { currentQuestion } = this.props.questionnaireReducer;
    const progressBarValue = ((currentQuestion + 1) * 100) / totalNbQuestion;
    const progressInstance = <ProgressBar now={progressBarValue} max={100} />;
    const dataFetched = this.props.questionnaireReducer.fetched;
    const dataFetching = this.props.questionnaireReducer.fetching;
    const { calculationResult, error } = this.props.answerReducer;

    if (
      currentQuestion != undefined &&
      questions != undefined &&
      this.state.dataIsFetched &&
      // this.state.energyFetched &&
      !dataFetching &&
      dataFetched &&
      !sessionId
    ) {
      return (
        <React.Fragment>
          <Container>
            <div>
              <Question
                {...questions[currentQuestion]}
              // onClick={() => this.onClickQuestion()}
              />
              { !this.state.isSmallScreen &&
              <Row className="noMargin padding justify-content-between" style={{margin: "0", padding: "15px"}}>
                <Col className="noPadding" xs={2}>
                  <Row className="noMargin">{this.previousButton()}</Row>
                </Col>
                <Col className="padding" xs={6}>
                  <Row>
                    <Col>
                      <div className="noMargin">{progressInstance}</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className={"text-center"}>
                      {currentQuestion + 1}/{totalNbQuestion}
                    </Col>
                  </Row>
                </Col>
                <Col className="noPadding" xs={2}>
                  <Row className="noMargin">
                    {this.nextButton()}
                  </Row>
                  <Row className="noMargin ">{this.submitButton()}</Row>
                </Col>
              </Row>}
              { this.state.isSmallScreen &&
                <div style={{position: "fixed", bottom: 0, left: 0, width: "100%", backgroundColor: "white"}}>
                  <Row className="justify-content-between" style={{margin: "0", padding: "15px"}}>
                    <Col className="noPadding" xs={3}>
                      <Row className="noMargin">{this.previousButton("btn-lg")}</Row>
                    </Col>
                    <Col className="padding" xs={6}>
                      <Row>
                        <Col>
                          <div className="noMargin">{progressInstance}</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={"text-center"}>
                          {currentQuestion + 1}/{totalNbQuestion}
                        </Col>
                      </Row>
                    </Col>
                    <Col className="noPadding" xs={3}>
                      <Row className="noMargin">
                        {this.nextButton("btn-lg")}
                      </Row>
                      <Row className="noMargin ">{this.submitButton("btn-lg")}</Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {this.adaptiveEnergyScore()}
                    </Col>
                  </Row>
                </div>
              }
              { !this.state.isSmallScreen && <div>{this.updateEnergyScore()}</div>}
            </div>
          </Container>
        </React.Fragment>
      );
    } else if (dataFetched && sessionId) {
      return <Redirect to={"/result/" + sessionId} />;
    }
    // else if (currentQuestion==undefined) {
    //     return (
    //         window.location.reload()
    //     )
    // }
    else {
      return <div></div>;
    }
  }
  // onClickQuestion = () => {
  //   const { session } = this.props.answerReducer;
  //   this.props.dispatch(computeEnergy(session));
  // };
  onClickNextButton = () => {
    this.props.dispatch(nextPage());
    this.props.dispatch(hideMaxThresholdErrorMessage());
  };
  onClickPreviousButton = () => {
    this.props.dispatch(previousPage());
  };
  onClickRestartButton = () => {
    this.props.dispatch(restartQuestionnaire());
  };

  onClickSubmitButton = () => {
    this.props.dispatch(seminarsGetRequest()).then(() => {
      const { session } = this.props.answerReducer;
      this.props.dispatch(sendSession(session));
      this.props.dispatch(showNavButton());
      window.localStorage.setItem("currentPage", 0);
      if (session.seminar_access_code != null && session.seminar_access_code in this.props.seminarReducer.simpleSeminars) {
        window.localStorage.setItem("currentSeminarStatus", this.props.seminarReducer.simpleSeminars[session.seminar_access_code]);
      }
    })
  };

  getItemFromArray = (arr, name) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].question == name) {
        return i;
      }
    }
    return null;
  }

  updateEnergyScore = () => {
    const { calculationResult, error } = this.props.answerReducer;
    const { questionnaire, error1 } = this.props.questionnaireReducer;
    let questions = questionnaire.questions
    var elements = [];
    var colors = [
      "bg-primary ",
      "bg-success ",
      "bg-danger ",
      "bg-warning ",
      "bg-info ",
      "bg-secondary ",
      "bg-dark ",
    ];
    if (calculationResult != null) {
      for (var i = 0; i < questions.length; i++) {
        let j = this.getItemFromArray(calculationResult.breakdown, questions[i].name)
        if (j == null) {
          console.log("Empty")
        }
        else {
          var color = colors[i];
          if (i == 3 || i == 5) {
            elements.push(
              <span
                style={{ minWidth: "50px" }}
                className={color + "text-center text-white padding"}
              >
                {calculationResult.breakdown[j].result.toFixed(2)}
              </span>
            );
          }
          else {
            elements.push(
              <span
                style={{ minWidth: "50px" }}
                className={color + "text-center text-white padding"}
              >
                {calculationResult.breakdown[j].result}
              </span>);
          }
        }
      }
      elements.push(
        <Trans i18nKey="questionnaire.your_score"
          values={{ score: calculationResult.result.toFixed(2) }} />
      );
      return (
        <div>
          <div>{elements}</div>
          <div style={{ marginTop: "10px" }}>
            <Trans i18nKey="questionnaire.world_score" />
          </div>
        </div>
      );
    } else return null;
  }

  adaptiveEnergyScore = () => {
    const { calculationResult, error } = this.props.answerReducer;
    const { questionnaire, error1 } = this.props.questionnaireReducer;

    const colors = [
      "bg-primary",
      "bg-success",
      "bg-danger",
      "bg-warning",
      "bg-info",
      "bg-secondary",
      "bg-dark",
    ];

    const result = !calculationResult || !calculationResult.result || !calculationResult.breakdown
                    ? {result: 0, breakdown: []}
                    : calculationResult;

    const questions = questionnaire.questions.map((q) => q.name)

    const total = result.result
    const results = result.breakdown
        .sort((a, b) => questions.indexOf(b.name) - questions.indexOf(a.name))
        .map((q) => q.result)

    return (
        <div className="text-center">
          <div style={{paddingBottom: "10px", height: "34px"}}>
            { results.map((v, i) =>
              <span key={i} style={{width: (100 * (v / total)) + "%", display: "inline-block"}}
                    className={colors[i % colors.length] + " text-white"}>
                {v}
              </span>
            )}
          </div>
          <div style={{paddingBottom: "20px", fontSize: "1.2em"}}>
            <b>
              {total.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} kWh per day
            </b>
          </div>
        </div>
    )
  }

  nextButton(style="") {
    const totalNbQuestion = this.props.questionnaireReducer.questionnaire
      .questions.length;
    const currentQuestionIndex = this.props.questionnaireReducer
      .currentQuestion;
    let disabledButton = false;
    if (!this.canGoNext(currentQuestionIndex)) {
      disabledButton = true;
    }


    if (currentQuestionIndex < totalNbQuestion - 1) {
      return (
        <Button
          className={"btn btn-primary buttonBorder "+style}
          type="button"
          style={{ minWidth: "90px" }}
          disabled={disabledButton}
          onClick={this.onClickNextButton}
        >
          <Trans i18nKey="questionnaire.next" />
        </Button>
      );
    }
  }

  canGoNext = (questionId) => {
    let { answers } = this.props.answerReducer.session;
    let currentQuestionObject = this.props.questionnaireReducer.questionnaire
      .questions[questionId];
    //set of selected answers for this question
    let allPossibleAnswersInSelectedAnswers = answers.filter((item) =>
      currentQuestionObject.possibleAnswers
        .map((item) => item.id)
        .includes(item.possibleAnswer.id)
    );
    let hasAllVariablesFilled = true;
    if (allPossibleAnswersInSelectedAnswers.length > 0) {
      hasAllVariablesFilled =
        allPossibleAnswersInSelectedAnswers.filter((item) => {
          if (item.variableValues.length != 0) {
            if (
              item.variableValues.length ==
              currentQuestionObject.possibleAnswers.filter(
                (item2) => item2.id == item.possibleAnswer.id
              )[0].variables.length
            ) {
              return item;
            }
          } else if (item.variableValues.length == 0) {
            return item;
          }
        }).length == allPossibleAnswersInSelectedAnswers.length;
    }
    if (currentQuestionObject != undefined) {
      return (
        allPossibleAnswersInSelectedAnswers.length >=
        currentQuestionObject.minAnswersNumber && hasAllVariablesFilled
      );
    } else return false;
  };
  previousButton(style="") {
    const { currentQuestion } = this.props.questionnaireReducer;
    if (currentQuestion != 0) {
      return (
        <Button
          block
          className={"btn float-left btn-secondary buttonBorder "+style}
          type="button"
          style={{ minWidth: "90px" }}
          onClick={this.onClickPreviousButton}
        >
          <Trans i18nKey="questionnaire.previous" />
        </Button>
      );
    }
    return null;
  }


  submitButton(style="") {
    const totalNbQuestion = this.props.questionnaireReducer.questionnaire
      .questions.length;
    const currentQuestionIndex = this.props.questionnaireReducer
      .currentQuestion;
    let disabledButton = false;
    if (!this.canGoNext(currentQuestionIndex)) {
      disabledButton = true;
    }
    if (currentQuestionIndex == totalNbQuestion - 1) {
      return (
        <Button
          block
          className={"btn btn-primary  buttonBorder "+style}
          type="button"
          style={{ minWidth: "90px" }}
          disabled={disabledButton}
          onClick={this.onClickSubmitButton}
        >
          <Trans i18nKey="questionnaire.finish" />
        </Button>
      );
    }
  }
}
