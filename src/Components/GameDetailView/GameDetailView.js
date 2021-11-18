import React, { Component } from "react";
import "./GameDetailView.css";
import { Link } from "react-router-dom";
import { getGameInfo } from "../../Utilities/GameServiceApiUtils";
import { joinGame, startGame } from "../../Utilities/GameServiceApiUtils";
import { GAME_PARTICIPANT_DETAIL_VIEW_PATH, JOIN_GAME_VIEW_PATH } from "../../constants/index.js";
import { getUser } from "../../Utilities/AuthServiceApiUtils.js";
import { Container, Row, Col } from "react-bootstrap";
import GameParticipantPanel from "./GameParticipantPanel";
import AdminPanel from "./AdminPanel";
import { isLength } from "lodash";

class GameDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: null,
    };
  }

  async componentDidMount() {
    if (!this.state.gameData) {
      (async () => {
        try {
          const gameData = await getGameInfo(this.props.location.state.gameId);
          const admin = await getUser(gameData["creatorId"]);
          gameData["creator"] = admin;

          this.setState({
            gameData: gameData,
          });
        } catch (err) {
          console.log(
            "Could not set State: gameData and/or participantData",
            err
          );
        }
      })();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  userInGame() {
    if (!this.props.user || !this.state.gameData) return false;
    var retVal = false;

    for (var p in this.state.gameData.participants) {
      var participantId = this.state.gameData.participants[p].id;
      if (this.props.user.principalId === participantId) {
        retVal = true;
        break;
      }
    }

    return retVal;
  }

  userIsAdmin() {
    if (!this.props.user || !this.state.gameData) return false;

    return this.props.user.principalId === this.state.gameData.creatorId;
  }

  gameInRegistrationPhase() {
    if (!this.state.gameData) return false;

    return this.state.gameData.gameState.gameStateType === "REGISTRATION";
  }

  handleStartGameClick() {
    if (
      !this.props.user ||
      !this.userIsAdmin() ||
      !this.state.gameData ||
      !this.gameInRegistrationPhase()
    ) {
      return;
    }

    startGame(this.state.gameData.id).then((response) => {
      if (this._isMounted) {
        this.setState({
          gameData: response,
        });
      }
    });
  }

  render() {
    // Load game data with state
    if (this.state.gameData === null) {
      var loading = true;
    } else {
      loading = false;
      var gameInfo = this.state.gameData;
    }

    return (
      <div className="gameDetailView">
        <Container>
          <Row>
            <Col>
              <Container>
                <Row>
                  <h2>
                    {
                      gameInfo
                        ?
                          gameInfo.settings.name
                        :
                          ""
                    }
                  </h2>
                </Row>
                {
                  this.userIsAdmin() && gameInfo
                    ?
                      <Row>
                        <AdminPanel gameId={gameInfo.id} />
                      </Row>
                    :
                      null
                }
                {
                  !this.userInGame() && this.state.gameData
                    ?
                      <Row>
                        <Link
                          to={{
                            pathname=JOIN_GAME_VIEW_PATH,
                            state={
                              game: this.state.gameData,
                              userId: this.props.user.principalId
                            }
                          }}
                        >
                          Join
                        </Link>
                      </Row>
                }
              </Container>
            </Col>
            <Col xl={4}>
              {
                gameInfo
                  ?
                    <GameParticipantPanel participants={gameInfo.participants} user={this.props.user} gameId={gameInfo.id}/>
                  :
                    ""
              }
            </Col>
          </Row>
        </Container>
      </div>    
    );
  }
}

export default GameDetailView;
