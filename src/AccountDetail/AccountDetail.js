import React, { Component } from "react";
import logo from "./logo.svg";
import "./AccountDetail.css";
import { Link } from "react-router-dom";

class AccountDetail extends Component {
  render() {
    return (
      <div className="AccountDetailPage">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Account Detail Page</p>

          <Link to="/">Go Back to Home Page</Link>
        </header>
      </div>
    );
  }
}

export default AccountDetail