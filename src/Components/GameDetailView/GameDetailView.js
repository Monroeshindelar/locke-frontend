import React, { Component } from "react";
import "./GameDetailView.css";
import { Link } from "react-router-dom";
import { getGameInfo } from "../../Utilities/GameServiceApiUtils";
import { Button } from "reactstrap";
import { joinGame, startGame } from "../../Utilities/GameServiceApiUtils";

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
          this.setState({
            gameData: await getGameInfo(this.props.location.state.gameId),
          });
        } catch (err) {
          console.log("Could not set State: gameData", err);
        }
      })();
    }
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

  handleJoinGameClick = () => {
    if (!this.props.user || !this.gameData || !this.gameInRegistrationPhase())
      return;

    joinGame(this.state.gameData.id, this.props.user.principalId)
    .then((response) => {
      this.setState({
        gameData: response
      });
    })
  }

  handleStartGameClick() {
    if (!this.props.user || !this.userIsAdmin() || !this.state.gameData || !this.gameInRegistrationPhase()) {
      return;
    }

    startGame(this.state.gameData.id)
    .then((response) => {
      this.setState({
        gameData: response
      });
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
      <div className="GameDetailPage">
        <header className="App-header">
          <h1>Game Detail Page</h1>
          <p>{loading ? "" : `Game ID: ${gameInfo["id"]}`}</p>
          <p>{loading ? "" : `Admin: ${gameInfo["creatorId"]}`}</p>
          <p>
            {loading
              ? ""
              : `Current State: ${gameInfo["gameState"]["gameStateType"]}`}
          </p>
          <p>
            {loading
              ? ""
              : `Accessibility: ${gameInfo["settings"]["accessibility"]}`}
          </p>
          <p>
            {loading
              ? ""
              : `Difficulty: ${gameInfo["settings"]["difficultyMode"]}`}
          </p>
          <p>{loading ? "" : `Players: ${gameInfo["participants"].length}`}</p>
          <p>
            {loading
              ? ""
              : `Generation: ${gameInfo["settings"]["generationId"]}`}
          </p>
          {
            !loading &&
            gameInfo && 
            this.gameInRegistrationPhase() && 
            !this.userInGame()
              ?
            <Button onClick={() => this.handleJoinGameClick()}>Join Game</Button>
              :
            null
          }
          {
            !loading &&
            gameInfo &&
            this.userIsAdmin() &&
            this.gameInRegistrationPhase()
              ?
            <Button onClick={() => this.handleStartGameClick()} >Start Game</Button>
              :
            null
          }
          <Link to="/" className="link">
            Go Back to Home Page
          </Link>
        </header>
      </div>
    );
  }
}

export default GameDetailView;
