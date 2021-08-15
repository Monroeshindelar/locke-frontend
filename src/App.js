import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from "./Components/Home/Home"
import GameDetail from "./Components/GameDetail/GameDetail"
import AccountDetail from "./Components/AccountDetail/AccountDetail"
import GameParticipantDetail from "./Components/GameParticipantDetail/GameParticipantDetail";
import OAuth2RedirectHandler from "./Components/OAuth2RedirectHandler";
import PrivateRoute from "./Common/PrivateRoute";
import { isAuthenticated, getAuthenticatedUser } from "./Utilities/AuthServiceApiUtils";
import { withProps } from "./Utilities/Utils"
import { Component } from "react";
import GameSettings from "./Components/GameSettings/GameSettings";

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
          <Route path='/' exact component={withProps(Home, { user: this.state.user })}/>
          <Route path='/game' exact component={GameDetail} />
          <PrivateRoute path='/account' authenticated={isAuthenticated() && this.state.user} account={this.state.user} exact component={AccountDetail} />
          {/* <Route path='/game/participant' exact component={GameParticipant} /> */}
          <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler} />
          <Route path="/GameSettings" exact component={GameSettings} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
