import * as React from "react"
import logo from './logo.svg';
import './GameParticipant.css';
import { Link } from "react-router-dom";

export const GameParticipant = () => {
    return (
    <div className="GameParticipantPage">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Game Participant Page
      </p>

        <Link to ='/' >Go Back to Home Page</Link>

    </header>
  </div>
    )
};