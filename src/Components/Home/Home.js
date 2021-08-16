import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { getUsernameWithDiscriminator } from "../../Utilities/AuthServiceApiUtils";
import { DISCORD_AUTH_URL, GAME_CREATION_CONFIGURATION_PATH, ACCOUNT_DETAIL_VIEW_PATH } from "../../constants";

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
          {this.props.user ? null : <a href={DISCORD_AUTH_URL} className="btn btn-primary">Log in with Discord</a>}
          <p>
            {" "}
            {
              this.props.user ?
              <Link
                to={{
                  pathname: GAME_CREATION_CONFIGURATION_PATH,
                  state: { account: this.props.user.principalId },
                }}
                className="btn btn-primary"
              >
                Create New Game
              </Link>
              : null
            }
          </p>
          <p>
          {this.props.user ? <Link to={ACCOUNT_DETAIL_VIEW_PATH} className="btn btn-primary">Go to Account Detail Page</Link> : null}
          </p>
        </header>
      </div>
    );
  }
}
export default Home;
