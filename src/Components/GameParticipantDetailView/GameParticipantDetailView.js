import React, { Component } from "react";
import "./GameParticipantDetailView.css";
import {
  getGameInfo,
  getGenerationInfo,
  getParticipantInfo,
  readyParticipant,
} from "../../Utilities/GameServiceApiUtils";
import { Link } from "react-router-dom";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import Box from "./Box";
import { prettyEnum } from '../../Utilities/Utils'; 
import MiniTeamView from "./MiniTeamView";

class GameParticipantDetailView extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      participant: null,
      generationInfo: null
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    if (!this.state.participant) {
      (async () => {
        let game = await getGameInfo(this.props.location.state.gameId);
        let p = await getParticipantInfo(this.props.location.state.gameId, this.props.location.state.participantId);
        let gen = await getGenerationInfo(game.settings.generationId);

        try {
          if (this._isMounted) {
            this.setState({
                participant: p,
                generationInfo: gen.games[p.gameId]
              }
            );
          }
        } catch (err) {
          console.log("Could not set State: participantData", err);
        }
      })();
    }
  }

  isReady() {
    if (!this.state.participant) return false;

    return this.state.participant.playerState === "READY";
  }

  render() {
    // Load participant data with state
    if (this.state.participant === null) {
      var loading = true;
    } else {
      loading = false;
      var participantInfo = this.state.participant;
    }

    console.log("participantInfo", participantInfo);


    return (
      <div className="gameParticipantDetailView">
        <Container className="mainContent">
          <Row>
            {/* Participant info */}
            <Col xl={5} className="leftPanel">
              <Row>
                <Col sm={6} className="playerStatePanel">
                  <Card className="playerStateCard">
                    <Card.Header>Player Status</Card.Header>
                    <Card.Body>
                      <Card.Title>State</Card.Title>
                      <Card.Text 
                        className={
                          this.isReady()
                            ?
                              "readyText"
                            :
                              "notReadyText"
                        }
                      >
                        {
                          participantInfo
                            ?
                              prettyEnum(participantInfo.playerState)
                            :
                              ""
                        }
                      </Card.Text>
                      <Card.Title>Seed</Card.Title>
                      <Card.Text>
                        {
                          participantInfo
                            ?
                              participantInfo.seed
                            :
                              ""
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={6} xl={6} className="gameInfoPanel">
                  <Image 
                    src={
                      this.state.generationInfo
                        ?
                          `${process.env.PUBLIC_URL}/assets/${this.state.generationInfo.imageUrl}`
                        :
                          ""
                    }
                    alt=""
                    height="200px"
                  />
                </Col>
              </Row>
              <Row>
                <Container>
                  <Row>
                    <Col className="boxLabel"><h3>My Team</h3></Col>
                  </Row>
                  <Row>
                    {
                      participantInfo
                        ?
                          <MiniTeamView team={participantInfo.team.mainTeam}/>
                        :
                          ""
                    }
                  </Row>
                </Container>
              </Row>
            </Col>
            {/* Box */}
            <Col xl={7} xs={12} className="boxPanel">
              {
                participantInfo
                  ? 
                    <Row>
                      <Col>
                        <Box

                          contents=
                          {
                            participantInfo
                              ?
                                participantInfo.box.contents
                              :
                                null
                          }
                          gameId={this.props.location.state.gameId}
                          participantId={this.props.location.state.participantId}
                          participant={this.state.participant}
                        />
                      </Col>
                    </Row>
                  :
                    null
            }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default GameParticipantDetailView;
