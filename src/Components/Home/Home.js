import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      userID: "285699164879192065",
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1>Home Page</h1>
          <p>Participant ID: {this.state.userID}</p>
          <p>
            {" "}
            <Link
              to={{
                pathname: "/GameSettings",
                state: { account: this.state.userID },
              }}
              className="btn btn-primary"
            >
              Create New Game
            </Link>
          </p>
          <p>
            <Link to="/AccountDetail" className="btn btn-primary">
              Account Detail Page
            </Link>
          </p>
        </header>
      </div>
    );
  }
}
export default Home;
