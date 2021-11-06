import React, { Component } from "react";
import "./GameDetailView.css";
import { Link } from "react-router-dom";
import { getGameInfo } from "../../Utilities/GameServiceApiUtils";
import { Button } from "reactstrap";
import { joinGame, startGame } from "../../Utilities/GameServiceApiUtils";
import { GAME_PARTICIPANT_DETAIL_VIEW_PATH, JOIN_GAME_VIEW_PATH } from "../../constants/index.js";
import { getAvatarUrl } from "../../Utilities/UserUtils.js";
import { getUser } from "../../Utilities/AuthServiceApiUtils.js";

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

          for (var i in gameData["participants"]) {
            var userData = await getUser(gameData["participants"][i]["id"]);
            gameData["participants"][i]["username"] = userData["username"];
            gameData["participants"][i]["discriminator"] =
              userData["discriminator"];
            gameData["participants"][i]["avatar"] = userData["avatar"];
          }
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

  handleJoinGameClick = () => {
    if (
      !this.props.user ||
      !this.state.gameData ||
      !this.gameInRegistrationPhase()
    )
      return;

    joinGame(this.state.gameData.id, this.props.user.principalId).then(
      (response) => {
        if (this._isMounted) {
          this.setState({
            gameData: response,
          });
        }
      }
    );
  };

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

    var headerStyle = {
      color: "white",
    };

    const participants = [];
    participants.push(<p>Participants</p>);
    if (gameInfo) {
      for (var p in gameInfo["participants"]) {
        var participant = gameInfo["participants"][p];
        var user = {
          principalId: participant["id"],
          avatar: participant["avatar"],
        };
        var avi = getAvatarUrl(user);
        participants.push(
          <div>
            <img alt="" src={avi} className="participantAvis"></img>
            <Link
              style={headerStyle}
              to={{
                pathname: GAME_PARTICIPANT_DETAIL_VIEW_PATH,
                state: {
                  gameId: this.state.gameData["id"],
                  participantId: this.props.user.principalId,
                },
              }}
            >
              {participant["username"]}
              <p>{participant["playerState"]}</p>
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="GameDetailPage">
        <div className="Participants">{participants}</div>
        <div className="GameInfo">
          <p>Game Details</p>
          <p>{loading ? "" : `Name: ${gameInfo["settings"]["name"]}`}</p>
          <p>{loading ? "" : `Admin: ${gameInfo["creator"]["username"]}`}</p>
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
          {!loading &&
          gameInfo &&
          this.gameInRegistrationPhase() &&
          !this.userInGame() ? (
            // <Button onClick={() => this.handleJoinGameClick()}>
            //   Join Game
            // </Button>
            <Link
              className="btn btn-primary"
              to={{
                pathname: JOIN_GAME_VIEW_PATH,
                state: {
                  game: this.state.gameData,
                  userId: this.props.user.principalId
                }
              }}>
                Join
              </Link>
          ) : null}
          {!loading &&
          gameInfo &&
          this.userIsAdmin() &&
          this.gameInRegistrationPhase() ? (
            <Button onClick={() => this.handleStartGameClick()}>
              Start Game
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default GameDetailView;
