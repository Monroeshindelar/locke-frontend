import React, { Component } from "react";
import "./GameParticipantDetailView.css";
import { Link } from "react-router-dom";
import { getParticipantInfo } from "../../Utilities/GameServiceApiUtils";

class GameParticipantDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participantData: null,
    };
  }

  async componentDidMount() {
    if (!this.state.participantData) {
      (async () => {
        try {
          this.setState(
            {
              participantData: await getParticipantInfo(
                "61132d11d8ccfb5238c2c25a",
                "285699164879192065"
              ),
            },
            function () {
              console.log(
                "Participant setState Completed:",
                this.state.participantData
              );
            }
          );
        } catch (err) {
          console.log("Could not set State: participantData", err);
        }
      })();
    }
  }

  render() {
    // Load participant data with state
    if (this.state.participantData === null) {
      var loading = true;
    } else {
      loading = false;
      var participantInfo = this.state.participantData;
    }

    return (
      <div className="GameParticipantView">
        <header className="App-header">
          <h1>Game Participant Page</h1>
          <p>
            {loading
              ? ""
              : `Status: ${
                  participantInfo["playerState"] === "NOT_READY"
                    ? "Not Ready"
                    : "Ready"
                }`}
          </p>
          <p>{loading ? "" : `Seed: ${participantInfo["seed"]}`}</p>
          <p>
            {loading
              ? ""
              : `Immunity Slot: ${
                  participantInfo["immunitySlot"] === null
                    ? "Not Selected"
                    : "_placholder"
                }`}
          </p>

          <Link to="/" className="link">
            Go Back to Home Page
          </Link>
        </header>
      </div>
    );
  }
}

export default GameParticipantDetailView;
