import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Container, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./App.css";
import AccountDetailView from "./Components/AccountDetailView/AccountDetailView";
import EncounterView from "./Components/EncounterView/EncounterView";
import GameDetailView from "./Components/GameDetailView/GameDetailView";
import GameParticipantDetailView from "./Components/GameParticipantDetailView/GameParticipantDetailView";
import GameCreationView from "./Components/GameCreationView/GameCreationView";
import GameBrowserView from "./Components/GameBrowserView/GameBrowserView";
import Home from "./Components/Home/Home";
import OAuth2RedirectHandler from "./Components/OAuth2RedirectHandler";
import PrivateRoute from "./Common/PrivateRoute";
import {
  isAuthenticated,
  getAuthenticatedUser,
} from "./Utilities/AuthServiceApiUtils";
import { withProps } from "./Utilities/Utils";
import {
  ACCESS_TOKEN_NAME,
  ACCOUNT_DETAIL_VIEW_PATH,
  DISCORD_AUTH_URL,
  GAME_DETAIL_VIEW_PATH,
  GAME_CREATION_CONFIGURATION_PATH,
  GAME_PARTICIPANT_DETAIL_VIEW_PATH,
  GAME_BROWSER_VIEW_PATH,
  ENCOUNTER_VIEW_PATH,
} from "./constants";
import { getUsernameWithDiscriminator } from "./Utilities/UserUtils";
import { getAvatarUrl } from "./Utilities/UserUtils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: false,
    };
  }

  async componentDidMount() {
    if (isAuthenticated()) {
      this.setState({
        loading: true,
      });
      (async () => {
        try {
          this.setState({
            user: await getAuthenticatedUser(),
            loading: false,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    this.setState({
      user: null,
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    return (
      <BrowserRouter>
        <header className="bg-dark ">
          <Container>
            <Navbar bg="dark" variant="dark" expand="md">
              <Navbar.Brand className="brandHeader">Locke Webapp</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              {this.state.user ? (
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav as="ul">
                    <Nav.Item as="li">
                      <Link
                        className="nav-link"
                        to={{
                          pathname: GAME_CREATION_CONFIGURATION_PATH,
                          state: { account: this.state.user.principalId }
                        }}>
                        Create Game
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link
                        className="nav-link"
                        to={{
                          pathname: GAME_BROWSER_VIEW_PATH,
                          state: { account: this.state.user.principalId }
                        }}>
                        Browse Games
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link
                        className="nav-link"
                        to={{
                          pathname: ENCOUNTER_VIEW_PATH,
                          state: { account: this.state.user.principalId }
                        }}>
                        Encounter
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              ) : (
                ""
              )}
              <Navbar.Collapse className="responsive-navbar-nav justify-content-end">
                {
                  this.state.user
                  ?
                    <div className="userCard">
                      <NavDropdown title={getUsernameWithDiscriminator(this.state.user)}>
                        <NavDropdown.Item as={Link} to={{
                          pathname: ACCOUNT_DETAIL_VIEW_PATH,
                          state: { account: this.state.user.principalId }
                        }}>
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={ () => this.logout() }>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                      <Image className="userAvatar" src={ getAvatarUrl(this.state.user) } alt="User Avatar" />
                    </div>
                  :
                    <Nav.Link href={DISCORD_AUTH_URL}>Login with Discord</Nav.Link>
                }
              </Navbar.Collapse>
          </Navbar>
          </Container>
        </header>
        <Switch>
          <Route
            path="/"
            exact
            component={withProps(Home, { user: this.state.user })}
          />
          <Route
            path={GAME_DETAIL_VIEW_PATH}
            exact
            component={withProps(GameDetailView, { user: this.state.user })}
          />
          <PrivateRoute
            path={ACCOUNT_DETAIL_VIEW_PATH}
            authenticated={isAuthenticated() && this.state.user}
            account={this.state.user}
            exact
            component={AccountDetailView}
          />
          <Route
            path={GAME_PARTICIPANT_DETAIL_VIEW_PATH}
            exact
            component={GameParticipantDetailView}
          />
          <Route
            path={GAME_CREATION_CONFIGURATION_PATH}
            exact
            component={GameCreationView}
          />
          <Route
            path={GAME_BROWSER_VIEW_PATH}
            exact
            component={GameBrowserView}
          />
          <Route
            path="/encounter"
            exact
            component={EncounterView}
          />
          <Route
            path="/oauth2/redirect"
            exact
            component={OAuth2RedirectHandler}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
