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
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { getUsernameWithDiscriminator } from "./Utilities/AuthServiceApiUtils";
import { DISCORD_AUTH_URL } from "./constants";
import { getAvatarUrl } from "./Utilities/UserUtils" 
import { ACCESS_TOKEN_NAME } from "./constants";
import "./App.css"


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

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    this.setState({
      user: null
    });
  }

  render() {
    if(this.state.loading) {
      return <h1>Loading</h1>
    }

    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand class="brandHeader">Locke Webapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav class="me-auto">
                {
                  this.state.user
                  ?
                    <Nav.Link href={GAME_CREATION_CONFIGURATION_PATH}>Create Game</Nav.Link>
                  :
                    ""
                }
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                {
                  this.state.user 
                  ? 
                    <div className="userCard">
                      {/* <Navbar.Text>{getUsernameWithDiscriminator(this.state.user)}</Navbar.Text> */}
                      <NavDropdown title={getUsernameWithDiscriminator(this.state.user)}>
                        <NavDropdown.Item href="/accounts/me">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => this.logout()}>Logout</NavDropdown.Item>
                      </NavDropdown>
                      <img className="userAvatar" src={getAvatarUrl(this.state.user)} alt="#" width="50" height="50"/>
                    </div>
                  : 
                    <a href={DISCORD_AUTH_URL} className="btn btn-primary">Log in with Discord</a>
                }
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
      </div>
    );
  }
}

export default App;
