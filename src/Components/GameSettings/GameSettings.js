import React, { Component } from "react";
// import logo from "./logo.svg";
import "./GameSettings.css";
// import { createGame } from "../../Utilities/GameServiceAPIUtils";
import { Dropdown, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { createGame } from "../../Utilities/GameServiceAPIUtils";
import { Redirect } from "react-router-dom";

class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        name: null,
        generationId: null,
        difficultyMode: "EASY",
        accessibility: "INVITE",
        minPlayerCount: 2,
        maxPlayerCount: 10,
      },
      gameID: null,
    };
  }

  changeDropDownTitle = (text, setting) => {
    var prevSettings = this.state.settings;
    if (setting === "generationId") {
      prevSettings.generationId = text;
      this.setState({
        settings: prevSettings,
      });
    } else if (setting === "difficulty") {
      prevSettings.difficultyMode = text.toUpperCase();
      this.setState({
        settings: prevSettings,
      });
    } else if (setting === "accessibility") {
      prevSettings.accessibility = text.toUpperCase();
      this.setState({
        settings: prevSettings,
      });
    }
  };

  handleClick = () => {
    createGame(this.props.location.state.account, this.state.settings).then(
      (response) => {
        this.setState({
          gameID: response.id,
        });
      }
    );
  };

  async componentDidMount() {}

  render() {
    if (this.state.gameID) {
      return (
        <Redirect
          to={{
            pathname: "/GameDetail",
            state: { gameID: this.state.gameID },
          }}
        />
      );
    }

    return (
      <div className="GameSettings">
        <header className="App-header">
          <h1>New Game Settings</h1>

          <div>
            <Form.Control size="lg" type="text" placeholder="Title" />
          </div>

          <Dropdown id="generationIdDropDown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Generation: {this.state.settings.generationId}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(
                      e.target.textContent,
                      "generationId"
                    )
                  }
                >
                  8
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(
                      e.target.textContent,
                      "generationId"
                    )
                  }
                >
                  6
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown id="difficultyDropDown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Diffuculty:{" "}
              {this.state.settings.difficultyMode.charAt(0) +
                this.state.settings.difficultyMode.toLowerCase().slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(e.target.textContent, "difficulty")
                  }
                >
                  Easy
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(e.target.textContent, "difficulty")
                  }
                >
                  Medium
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(e.target.textContent, "difficulty")
                  }
                >
                  Hard
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown id="accessibilityDropDown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Accessibility:{" "}
              {this.state.settings.accessibility.charAt(0) +
                this.state.settings.accessibility.toLowerCase().slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(
                      e.target.textContent,
                      "accessibility"
                    )
                  }
                >
                  Invite
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(
                      e.target.textContent,
                      "accessibility"
                    )
                  }
                >
                  Open
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div>
            <Button
              className="btn btn-success"
              onClick={() => this.handleClick()}
            >
              Create Game
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default GameSettings;
