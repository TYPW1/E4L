import React from "react";
import Container from "react-bootstrap/Container";

import {Trans} from "react-i18next";
import {Card, Image} from "react-bootstrap";

export class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iFrameHeight: '0px'
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Card>
                        <Card.Header>
                            <h4 style={{width: "100%", textAlign: "center"}}>
                                <Trans i18nKey="news.news" />
                            </h4>
                        </Card.Header>
                        <Card.Body style={{padding: "0"}}>
                            <iframe
                                style={{width: "100%", height: this.state.iFrameHeight, border: "none", overflow: "hidden"}}
                                onLoad={(o) => {
                                    const obj = ReactDOM.findDOMNode(o.target);
                                    this.setState({
                                        "iFrameHeight":  (obj.contentWindow.document.body.scrollHeight + 100) + 'px'
                                    });
                                }}
                                scrolling="no"
                                src="staticnews/index.html" />
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}
