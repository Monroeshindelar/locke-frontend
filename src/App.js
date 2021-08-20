import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Components/Home/Home"
import GameDetailView from "./Components/GameDetailView/GameDetailView"
import AccountDetailView from "./Components/AccountDetailView/AccountDetailView"
import GameParticipantDetailView from "./Components/GameParticipantDetailView/GameParticipantDetailView";
import OAuth2RedirectHandler from "./Components/OAuth2RedirectHandler";
import PrivateRoute from "./Common/PrivateRoute";
import { isAuthenticated, getAuthenticatedUser } from "./Utilities/AuthServiceApiUtils";
import { withProps } from "./Utilities/Utils"
import { Component } from "react";
import GameCreationView from "./Components/GameCreationView/GameCreationView";
import { ACCOUNT_DETAIL_VIEW_PATH, GAME_DETAIL_VIEW_PATH, GAME_CREATION_CONFIGURATION_PATH, GAME_PARTICIPANT_DETAIL_VIEW_PATH } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: false
    }
  }

  async componentDidMount() {
    if (isAuthenticated()) {
      this.setState({
        loading: true
      });
      (async () => {
        try {
          this.setState({
            user: await getAuthenticatedUser(),
            loading: false
          });
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if(this.state.loading) {
      return <h1>Loading</h1>
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={withProps(Home, { user: this.state.user })}/>
          <Route path={GAME_DETAIL_VIEW_PATH} exact component={withProps(GameDetailView, { user: this.state.user })} />
          <PrivateRoute path={ACCOUNT_DETAIL_VIEW_PATH} authenticated={isAuthenticated() && this.state.user} account={this.state.user} exact component={AccountDetailView} />
          <Route path={GAME_PARTICIPANT_DETAIL_VIEW_PATH} exact component={GameParticipantDetailView} />
          <Route path={GAME_CREATION_CONFIGURATION_PATH} exact component={GameCreationView} />
          <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
