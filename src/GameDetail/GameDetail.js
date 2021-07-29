import * as React from "react"
import logo from './logo.svg';
import './GameDetail.css';
import { Link } from "react-router-dom";

export const GameDetail = () => {
    return (
    <div className="GameDetailPage">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Game Detail Page
      </p>

        <Link to ='/' >Go Back to Home Page</Link>

    </header>
  </div>
    )
};