import { chunk } from "lodash";
import { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ParticipantInfoCard from "./ParticipantInfoCard";
import "./GameParticipantPanel.css"


class GameParticipantPanel extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        let participantCards = [];

        if (this.props.participants) {
            for (var p in this.props.participants) { 
                let participant = this.props.participants[p];

                participantCards.push(
                    <ParticipantInfoCard 
                        key={participant} 
                        participant={participant}
                        user={this.props.user}
                        gameId={this.props.gameId}
                    />
                )
            }
        }

        const rows = chunk(participantCards, 2);

        return(
            <Container>
                <Row>
                    <Col className="boxLabel"><h3>Participants</h3></Col>
                </Row>
                <Row className="participantList centerContent">
                    {rows.map((cols) => (
                        <Row>
                            {cols.map((col) => (
                                <Col>
                                    {col}
                                </Col>
                            ))}
                        </Row>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default GameParticipantPanel;