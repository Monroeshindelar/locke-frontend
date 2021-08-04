import React, { Component } from "react";
import logo from "./logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";
import { createGame } from "../GameServiceAPIUtils";
//import { createGame } from "../GameServiceAPIUtils"

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
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Home Page <br /> Participant ID: {this.state.ID}
          </p>
          <button onClick={() => createGame(this.state.ID)}> Create Game </button>
          <Link to="/GameDetail">Go to Game Detail Page</Link>
          <Link to="/AccountDetail">Go to Account Detail Page</Link>
          <Link to="/GameParticipant">Go to Game Participant Page</Link>
        </header>
      </div>
    );
  }
}
export default Home;
