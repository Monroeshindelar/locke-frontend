import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { getUsernameWithDiscriminator } from "../../Utilities/AuthServiceApiUtils";
import { DISCORD_AUTH_URL, GAME_CREATION_CONFIGURATION_PATH, ACCOUNT_DETAIL_VIEW_PATH } from "../../constants";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }
}
export default Home;
