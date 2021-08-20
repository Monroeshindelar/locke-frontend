import React, { Component } from "react";
import "./AccountDetailView.css";
import { Link } from "react-router-dom";
import { DISCORD_AVATAR_BASE_URL } from "../../constants";

class AccountDetailView extends Component {
  // constructor(props) {
  //   super(props);
  // }

  getAvatarUrl() {
    return `${DISCORD_AVATAR_BASE_URL}/${this.props.account.principalId.toString()}/${this.props.account.avatar.toString()}.png`;
  }

  render() {
    return (
      <div className="AccountDetailView">
        <header className="App-header">
          <p>Account Detail</p>
          <p>
            Username: {this.props.account.username}#
            {this.props.account.discriminator}
          </p>
          <p>
            <img src={this.getAvatarUrl()} alt=""></img>
          </p>
          <p>
            <Link to="/" className="btn btn-primary">
              Go Back to Home Page
            </Link>
          </p>
        </header>
      </div>
    );
  }
}

export default AccountDetailView;
