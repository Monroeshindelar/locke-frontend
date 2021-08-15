import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { createGame } from "../GameServiceAPIUtils";
import { Button } from "reactstrap";
import { DISCORD_AUTH_URL } from "../constants/index"
import { getUsernameWithDiscriminator } from "../Utilities/AuthServiceApiUtils";

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Home Page <br /> 
            {this.props.user ? `Logged in as ${getUsernameWithDiscriminator(this.props.user)}` : "Not Logged in"}
          </p>
          {this.props.user ? null : <a href={DISCORD_AUTH_URL}>Log in with Discord</a>}
          <Button onClick={() => createGame()}>
            {" "}
            Create Game
            {" "}
          </Button>
          <Link to="/game">Go to Game Detail Page</Link>
          {this.props.user ? <Link to="/account">Go to Account Detail Page</Link> : null}
          <Link to="/game/participant">Go to Game Participant Page</Link>
        </header>
      </div>
    );
  }
}
export default Home;
