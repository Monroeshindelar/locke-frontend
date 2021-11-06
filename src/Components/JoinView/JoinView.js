import { times } from "lodash";
import { getGenerationInfo, joinGame } from "../../Utilities/GameServiceApiUtils";
import { getPokemonSpecies } from "../../Utilities/PokeApiUtils";
import { getPaddedDexNumber } from "../../Utilities/Utils";
import "./JoinView.css"
import "../../css/generic.css"
import { GAME_DETAIL_VIEW_PATH } from "../../constants";
import { Link } from "react-router-dom";

const { Component } = require("react");
const { Container, Row, Image, Button } = require("react-bootstrap");


class JoinView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            generationInfo: null,
            starterInfo: null,
            gameId: null,
            starterId: null
        }
    }

    async componentDidMount() {
        let game = this.props.location.state.game;

        let generationInfo = await getGenerationInfo(game.settings.generationId);

        let starterInfo = [];

        for (var s in generationInfo.starterIds) {
            let starter = await getPokemonSpecies(generationInfo.starterIds[s]);
            starterInfo.push(starter);
        }

        this.setState({
            generationInfo: generationInfo,
            starterInfo: starterInfo
        });
    }

    handleStarterSelect(starterId) {
        this.setState({
            starterId: starterId
        });
    }

    handleGameSelect(gameId) {
        this.setState({
            gameId: gameId
        });
    }

    hasAllRequiredInfo() {
        return this.state.gameInfo !== null && this.state.starterId != null;
    }

    render() {
        
        let gameImages = [];

        if (this.state.generationInfo) {
            for (var g in this.state.generationInfo.games) {
                let game = this.state.generationInfo.games[g];
                console.log(game);

                gameImages.push(
                    <div 
                        className=
                        {
                            this.state.gameId == game.gameId
                                ?
                                    "gameBackground centerContent selectedComponent"
                                :
                                    "gameBackground centerContent"
                        }
                        onClick={ () => this.handleGameSelect(game.gameId) }
                    >
                        <Image
                            className="gameImage"
                            src={`${process.env.PUBLIC_URL}/assets/${game.imageUrl}`}
                            alt=""
                        />
                    </div>
                );
            }
        }

        let starterImages = [];

        if (this.state.starterInfo) {
            for (var s in this.state.starterInfo) {
                let starter = this.state.starterInfo[s];

                starterImages.push(
                    <div 
                        className={
                            this.state.starterId === starter.id 
                                ?
                                    "starterBackground centerContent selectedComponent"
                                :
                                    "starterBackground centerContent"
                        }
                        onClick={ () => this.handleStarterSelect(starter.id) }
                    >
                        <Image
                            className="starterImage"
                            src={`${process.env.PUBLIC_URL}/assets/${getPaddedDexNumber(starter.id)}-${starter.name}.gif`}
                            alt=""
                        />
                    </div>
                )
            }
        }

        return(
            <div className="joinView">
                <Container>
                    <Row className="selectionRow">
                        <Container>
                            <Row className="header">
                                <h2>Pick a Game</h2>
                            </Row>
                            <Row className="centerContent">
                                {gameImages}        
                            </Row>
                        </Container>
                    </Row>
                    <Row className="selectionRow">
                        <Container>
                            <Row className="header">
                                <h2>Pick a Starter</h2>
                            </Row>
                            <Row className="centerContent">
                                {starterImages}
                            </Row>
                        </Container>
                    </Row>
                    <Row className="centerContent">
                        {/* <Button
                            className="joinButton"
                            disabled={!this.hasAllRequiredInfo()}
                            onClick={ () => joinGame(this.props.location.state.game.id, this.props.location.state.userId, this.state.gameId, this.state.starterId) }
                        >
                            Join
                        </Button> */}
                        <Link
                            className={
                                this.hasAllRequiredInfo()
                                    ?
                                        "joinButton btn btn-primary"
                                    :
                                        "joinButton btn btn-primary disabled"
                            }
                            to={{
                                pathname: GAME_DETAIL_VIEW_PATH,
                                state: {
                                    gameId: this.props.gameId,
                                }
                            }}
                            style={
                                this.hasAllRequiredInfo()
                                    ?
                                        null
                                    :
                                        {pointerEvents: "none"}
                            }
                            onClick={ () => joinGame(this.props.location.state.game.id, this.props.location.state.userId, this.state.gameId, this.state.starterId) }
                        >
                            Join
                        </Link>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default JoinView;