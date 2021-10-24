import React, { Component } from "react";
import "./GameParticipantDetailView.css";
import { Link } from "react-router-dom";
import {
  getParticipantInfo,
  readyParticipant,
} from "../../Utilities/GameServiceApiUtils";
import { Button } from "reactstrap";

class GameParticipantDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: null,
    };
  }

  async componentDidMount() {
    if (!this.state.participant) {
      (async () => {
        try {
          this.setState(
            {
              participant: await getParticipantInfo(
                this.props.location.state.gameId,
                this.props.location.state.participantId
              ),
            },
            function () {
              console.log(
                "Participant setState Completed:",
                this.state.participant
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
    if (this.state.participant === null) {
      var loading = true;
    } else {
      loading = false;
      var participantInfo = this.state.participant;
    }

    return (
      <div className="GameParticipantView">
        <div className="App-header">
          <p>
            {loading
              ? ""
              : `Status: ${
                  participantInfo["playerState"] === "NOT_READY"
                    ? "Not Ready"
                    : "Ready"
                }`}
          </p>
          <Button
            onClick={() =>
              readyParticipant(
                this.props.location.state.gameId,
                this.props.location.state.participantId
              )
            }
          >
            Ready Up
          </Button>
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
        </div>
      </div>
    );
  }
}

export default GameParticipantDetailView;
