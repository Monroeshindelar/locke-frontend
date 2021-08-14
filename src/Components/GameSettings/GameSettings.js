import React, { Component } from "react";
// import logo from "./logo.svg";
import "./GameSettings.css";
// import { createGame } from "../../Utilities/GameServiceAPIUtils";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.css";

class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      gen: null,
      difficulty: "EASY",
      accessibility: "INVITE",
      minPlayerCount: 2,
      maxPlayerCount: 10,
    };
  }

  changeDropDownTitle = (text, setting) => {
    if (setting === "gen") {
      this.setState({ gen: text });
    } else if (setting === "difficulty") {
      this.setState({ difficulty: text });
    }
  };

  async componentDidMount() {}

  render() {
    return (
      <div className="GameSettings">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>New Game Settings</h1>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Generation: {this.state.gen}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(e.target.textContent, "gen")
                  }
                >
                  8
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <div
                  onClick={(e) =>
                    this.changeDropDownTitle(e.target.textContent, "gen")
                  }
                >
                  6
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Diffuculty: {this.state.difficulty}
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
        </header>
      </div>
    );
  }
}

export default GameSettings;
