import React, { Component } from "react";
import logo from "./logo.svg";
import "./GameDetail.css";
import { Link } from "react-router-dom";

class GameDetail extends Component {
  render() {
    return (
      <div className="GameDetailPage">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Game Detail Page</p>
          <Link to="/">Go Back to Home Page</Link>
        </header>
      </div>
    );
  }
}

export default GameDetail;
