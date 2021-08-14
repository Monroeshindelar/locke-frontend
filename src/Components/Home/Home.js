import React, { Component } from "react";
// import logo from "./logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";
// import { createGame } from "../../Utilities/GameServiceAPIUtils";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      ID: "285699164879192065",
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Home Page</h1>
          <p>Participant ID: {this.state.ID}</p>
          {/* <button onClick={() => createGame(this.state.ID)}>
            {" "}
            Create Game{" "}
          </button> */}
          <Link to="/GameSettings" className="btn btn-primary">Create New Game</Link>
          <p>
            {" "}
            <Link to="/GameDetail" className="link">
              Game Detail Page
            </Link>
          </p>
          <p>
            {" "}
            <Link to="/GameParticipant" className="link">
              Game Participant Page
            </Link>
          </p>
          <p>
            <Link to="/AccountDetail" className="link">
              Account Detail Page
            </Link>
          </p>
        </header>
      </div>
    );
  }
}
export default Home;
