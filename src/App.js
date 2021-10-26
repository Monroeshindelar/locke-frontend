import { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';  
import "./App.css"
import AccountDetailView from "./Components/AccountDetailView/AccountDetailView"
import GameDetailView from "./Components/GameDetailView/GameDetailView"
import GameParticipantDetailView from "./Components/GameParticipantDetailView/GameParticipantDetailView";
import GameCreationView from "./Components/GameCreationView/GameCreationView";
import GameBrowserView from "./Components/GameBrowserView/GameBrowserView";
import Home from "./Components/Home/Home"
import OAuth2RedirectHandler from "./Components/OAuth2RedirectHandler";
import PrivateRoute from "./Common/PrivateRoute";
import { isAuthenticated, getAuthenticatedUser } from "./Utilities/AuthServiceApiUtils";
import { withProps } from "./Utilities/Utils"
import { ACCESS_TOKEN_NAME, ACCOUNT_DETAIL_VIEW_PATH, DISCORD_AUTH_URL, GAME_DETAIL_VIEW_PATH, GAME_CREATION_CONFIGURATION_PATH, 
  GAME_PARTICIPANT_DETAIL_VIEW_PATH, GAME_BROWSER_VIEW_PATH, } from "./constants";
import { getUsernameWithDiscriminator } from "./Utilities/AuthServiceApiUtils";
import { getAvatarUrl } from "./Utilities/UserUtils"


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
    if (this.state.loading) {
      return <h1>Loading</h1>
    }

    return (
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="brandHeader">Locke Webapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {
              this.state.user
                ?
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    {/* <Nav.Link href={GAME_CREATION_CONFIGURATION_PATH}>Create Game</Nav.Link> */}
                      <Link className="nav-link"
                        to={{
                          pathname: GAME_CREATION_CONFIGURATION_PATH,
                          state: { account: this.state.user.principalId },
                        }}>
                        Create Game
                      </Link>
                    {/* <Nav.Link href={GAME_BROWSER_VIEW_PATH}>Browse Games</Nav.Link> */}
                    <Link className="nav-link"
                        to={{
                          pathname: GAME_BROWSER_VIEW_PATH,
                          state: { account: this.state.user.principalId },
                        }}>
                        Browse Games
                    </Link>
                  </Nav>
                </Navbar.Collapse>
                :
                ""
            }
            <Navbar.Collapse className="justify-content-end">
              {
                this.state.user
                  ?
                  <div className="userCard">
                    {/* <Navbar.Text>{getUsernameWithDiscriminator(this.state.user)}</Navbar.Text> */}
                    <NavDropdown title={getUsernameWithDiscriminator(this.state.user)}>
                      <NavDropdown.Item>  
                        <Link style={{ textDecoration: 'none', color: 'black' }}
                          to={{
                            pathname: ACCOUNT_DETAIL_VIEW_PATH
                          }}>
                          Profile
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" onClick={() => this.logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <img className="userAvatar" src={getAvatarUrl(this.state.user)} alt="#" width="50" height="50" />
                  </div>
                  :
                  <a href={DISCORD_AUTH_URL} className="btn btn-primary">Log in with Discord</a>
              }
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/" exact component={withProps(Home, { user: this.state.user })} />
          <Route path={GAME_DETAIL_VIEW_PATH} exact component={withProps(GameDetailView, { user: this.state.user })} />
          <PrivateRoute path={ACCOUNT_DETAIL_VIEW_PATH} authenticated={isAuthenticated() && this.state.user} account={this.state.user} exact component={AccountDetailView} />
          <Route path={GAME_PARTICIPANT_DETAIL_VIEW_PATH} exact component={GameParticipantDetailView} />
          <Route path={GAME_CREATION_CONFIGURATION_PATH} exact component={GameCreationView} />
          <Route path={GAME_BROWSER_VIEW_PATH} exact component={GameBrowserView} />
          <Route path="/oauth2/redirect" exact component={OAuth2RedirectHandler} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
