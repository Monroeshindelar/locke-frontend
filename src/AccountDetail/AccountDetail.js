import * as React from "react"
import logo from './logo.svg';
import './AccountDetail.css';
import { Link } from "react-router-dom";

export const AccountDetail = () => {
    return (
    <div className="AccountDetailPage">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Account Detail Page
      </p>

        <Link to ='/' >Go Back to Home Page</Link>

    </header>
  </div>
    )
};