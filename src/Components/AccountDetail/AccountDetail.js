import React, { Component } from "react";
import "./AccountDetail.css";
import { Link } from "react-router-dom";

class AccountDetail extends Component {
  render() {
    return (
      <div className="AccountDetailPage">
        <header className="App-header">
          <h1>Account Detail Page</h1>
          <Link to="/" className="link">
            Go Back to Home Page
          </Link>
        </header>
      </div>
    );
  }
}

export default AccountDetail;
