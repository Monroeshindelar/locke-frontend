import React, { Component } from "react";
import logo from "./logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Home Page</p>
          <button onClick={createGame()}>Create Game</button>
          <Link to="/GameDetail">Go to Game Detail Page</Link>
          <Link to="/AccountDetail">Go to Account Detail Page</Link>
          <Link to="/GameParticipant">Go to Game Participant Page</Link>
        </header>
      </div>
    );
  }
}

export default Home;

function createGame() {}
