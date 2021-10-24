import { Component } from "react";
import { getJoinableGames } from "../../Utilities/GameServiceApiUtils";
import { Table } from "react-bootstrap";
import { GAME_DETAIL_VIEW_PATH } from "../../constants";
import { Link } from "react-router-dom";
import "./GameBrowserView.css"

class GameBrowserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: null
        }
    }

    async componentDidMount() {
        if (!this.state.games) {
            (async () => {
                try {
                    this.setState({
                        games: await getJoinableGames(this.props.location.state.account),
                    });
                } catch (err) {
                    console.log("Could not set State: games", err);
                }
            })();
        }
    }

    render() {

        var headerStyle = {
            color: "white"
        };

        const games = [];

        if(this.state.games) {
            for(var g in this.state.games) {
                var game = this.state.games[g];
                console.log(game);
        
                games.push(
                <tr>
                    <th style={headerStyle}><Link to={{
                    pathname: GAME_DETAIL_VIEW_PATH,
                    state: { gameId: game.id }
                    }}>{game.id}</Link></th>
                    <td style={headerStyle}>{game.settings.name}</td>
                    <td style={headerStyle}>{game.settings.generationId}</td>
                    <td style={headerStyle}>{game.settings.difficultyMode}</td>
                </tr>
                )
            }
        }

        return (
            <div className="App">
                <header className="App-header">
                    <Table>
                        <thead>
                            <tr>
                                <th style={headerStyle}>Id</th>
                                <th style={headerStyle}>Name</th>
                                <th style={headerStyle}>Generation</th>
                                <th style={headerStyle}>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {games}
                        </tbody>
                    </Table>
                </header>
            </div>
        );
    }
}

export default GameBrowserView