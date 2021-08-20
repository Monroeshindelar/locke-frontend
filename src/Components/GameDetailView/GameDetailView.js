import React, { Component } from "react";
import "./GameDetailView.css";
import { Link } from "react-router-dom";
import { getGameInfo } from "../../Utilities/GameServiceApiUtils";
import { Button } from "reactstrap";
import { joinGame } from "../../Utilities/GameServiceApiUtils";

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

  handleJoinGameClick = () => {
    joinGame(this.state.gameData.id, "297855751026769922")
    .then((response) => {
      console.log(response);
    })
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
            this.state.gameData && this.state.gameData.gameState.gameStateType === "REGISTRATION" 
            ?
            <Button onClick={() => this.handleJoinGameClick()}>Join Game</Button>
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
