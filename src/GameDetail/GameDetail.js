import React, { Component } from "react";
import logo from "./logo.svg";
import "./GameDetail.css";
import { Link } from "react-router-dom";
import { getGameInfo } from "../GameServiceAPIUtils";

class GameDetail extends Component {
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
          this.setState(
            {
              gameData: await getGameInfo("61132d11d8ccfb5238c2c25a"),
            },
            function () {
              console.log("setState Completed:", this.state.gameData);
            }
          );
        } catch (e) {
          console.log("Could not set State: gameData,", e);
        }
      })();
    }
  }

  render() {
    if (this.state.gameData === null) {
      var loading = true;
    } else {
      loading = false;
      var gameInfo = this.state.gameData;
    }

    return (
      <div className="GameDetailPage">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
              : `Difficulty: ${gameInfo["settings"]["difficultyMode"]}`}
          </p>
          <p>{loading ? "" : `Players: ${gameInfo["participants"].length}`}</p>
          <p>
            {loading
              ? ""
              : `Generation: ${gameInfo["settings"]["generationId"]}`}
          </p>

          <Link to="/">Go Back to Home Page</Link>
        </header>
      </div>
    );
  }
}

export default GameDetail;
