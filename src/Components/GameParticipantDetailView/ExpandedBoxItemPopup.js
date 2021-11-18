import { Component } from "react";
import { Container, Modal, Row, Image, Col, Button, Form, CloseButton } from "react-bootstrap";
import { getPokemonSpecies } from "../../Utilities/PokeApiUtils";
import { capitalizeWord, getPaddedDexNumber } from "../../Utilities/Utils";
import "./ExpandedBoxItemPopup.css";
import "../../css/generic.css";
import "../../css/types.css";
import BaseStatsPanel from "./BaseStatsPanel";
import { addPokemonToTeam, evolvePokemon, removePokemonFromTeam } from '../../Utilities/GameServiceApiUtils';

class ExpandedBoxItemPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: this.props.pokemon,
            speciesInfo: null,
        };
    }

    async componentDidMount() {
        if (this.props.pokemon) {
            let speciesInfo = await getPokemonSpecies(this.props.pokemon.model.id);

            this.setState({
                speciesInfo: speciesInfo
            });
        }
    }

    async addToTeam() {
        if(this.props.gameId && this.props.participant && this.props.pokemon) {
            addPokemonToTeam(this.props.gameId, this.props.participant.id, this.props.pokemon.locationId);
        }
    }

    async removeFromTeam() {
        if(this.props.gameId && this.props.participant && this.props.pokemon) {
            removePokemonFromTeam(this.props.gameId, this.props.participant.id, this.props.pokemon.locationId)
        }
    }

    async evolvePokemon() {
        if (this.props.gameId && this.props.participant && this.state.pokemon) {
            let evolution = await evolvePokemon(this.props.gameId, this.props.participant.id, this.state.pokemon.locationId);

            if (evolution) {
                this.setState({
                    pokemon: evolution,
                    speciesInfo: await getPokemonSpecies(evolution.model.id)
                })
            }
        }
    }

    handleEvolveClick() {
        this.evolvePokemon();
    }

    getImageUrl() {
        let image = "";

        if (this.state.pokemon && this.state.speciesInfo) {
            image = `${process.env.PUBLIC_URL}/assets/${getPaddedDexNumber(this.state.pokemon.model.id)}-${this.state.pokemon.model.name}`

            if (this.state.speciesInfo.has_gender_differences) {
                if (this.state.pokemon.gender === "MALE") {
                    image = `${image}-m`
                } else {
                    image = `${image}-f`
                }
            }

            image = `${image}.gif`;
        }

        return image;
    }

    render() {
        let image = this.getImageUrl();

        let genderImage = "";

        if (this.state.pokemon && this.state.pokemon.gender) {
            genderImage = `${process.env.PUBLIC_URL}/assets/gender-symbols`
            if (this.state.pokemon.gender === "MALE") {
                genderImage = `${genderImage}/male`;
            } else if (this.state.pokemon.gender === "FEMALE") {
                genderImage = `${genderImage}/female`;
            }
            genderImage = `${genderImage}.png`;
        }

        let typeDivs = [];

        if (this.state.pokemon) {
            for(var t in this.state.pokemon.model.types) {
                let typeName = this.state.pokemon.model.types[t].name;
                let classes = `centerContent typeBackground popupTypeBackground ${typeName}`;
                typeDivs.push(
                    <div className={classes}>
                        <Image src={`${process.env.PUBLIC_URL}/assets/pokemon-type-svg-icons/icons/${typeName}.svg`} height="18"/>
                    </div>
                )
            }
        }

        return(
            <Modal
                id={`${this.props.itemNumber}-ebip`}
                show={this.props.show}
                size="xl"
                centered
            >
                <Modal.Body 
                    closeButton
                    className="expandedBoxItem">
                    <Container>
                        <Row>
                            <Col 
                                xl={4}
                                className="centerContent">
                                <Image
                                    className="expandedImage"
                                    src={image}
                                />
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col className="popupHeader">
                                            <Modal.Title as="h2">
                                                {
                                                    this.state.pokemon
                                                        ?
                                                            this.state.pokemon.nickname
                                                                ?
                                                                    this.state.pokemon.nickname
                                                                :
                                                                    capitalizeWord(this.state.pokemon.model.name)
                                                        :
                                                            ""
                                                }
                                            </Modal.Title>
                                            <div className="centerContent popupTypeBackground">
                                                <Image
                                                    src={genderImage}
                                                    height="20"
                                                />
                                            </div>
                                            {typeDivs}
                                        </Col>
                                        <Col>
                                            <Button 
                                                variant="danger" 
                                                className="closeButton"
                                                onClick={() => this.props.close()}
                                            >
                                                X
                                            </Button>
                                            {/* <CloseButton className="closeButton" onClick={() => this.props.close} /> */}
                                        </Col>
                                    </Row>
                                    <Row className="contentRow">
                                        <Col className="text-muted">
                                            {
                                                this.state.pokemon
                                                    ?
                                                        this.state.pokemon.locationId
                                                    :
                                                        ""
                                            }
                                        </Col>
                                    </Row>
                                    <Row className="contentRow">
                                        <Col>
                                            <Form>
                                                <Form.Label>Nickname</Form.Label>
                                                <Form.Control />
                                            </Form>
                                        </Col>
                                        <Col>
                                            <Form>
                                                <Form.Label>Ability</Form.Label>
                                                <Form.Select>
                                                    <option>--</option>
                                                </Form.Select>
                                            </Form>
                                        </Col>
                                        <Col>
                                            <Form>
                                                <Form.Label>Nature</Form.Label>
                                                <Form.Select>
                                                    <option>--</option>
                                                </Form.Select>
                                            </Form>
                                        </Col>                                 
                                    </Row>
                                    {/* Stats */}
                                    <Row className="contentRow">
                                        <BaseStatsPanel 
                                            stats={
                                                this.state.pokemon
                                                    ?
                                                        this.state.pokemon.model.baseStats
                                                    :
                                                        null
                                            }
                                            nature={
                                                this.state.pokemon
                                                    ?
                                                        this.state.pokemon.nature
                                                    :
                                                        null
                                            }
                                        />
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col 
                                className="buttonCol"
                                xl={4}>
                                    {
                                        !this.props.isOnTeam && !this.props.isTeamFull && (this.props.pokemon && this.props.pokemon.alive)
                                            ?
                                                <Button
                                                    onClick={ () => this.addToTeam() }
                                                >
                                                    Add to Team
                                                </Button>
                                            :
                                                null
                                    }
                                    {
                                        this.props.isOnTeam
                                            ?
                                                <Button
                                                    variant="danger"
                                                    onClick={ () => this.removeFromTeam() }
                                                >
                                                    Remove from Team
                                                </Button>
                                            :
                                                ""
                                    }
                                    {
                                        this.state.pokemon
                                            ?
                                                this.state.pokemon.alive
                                                    ?
                                                        <Button
                                                            onClick={ () => this.handleEvolveClick() }
                                                        >
                                                            Evolve
                                                        </Button>
                                                    :
                                                        ""
                                            :
                                                ""  
                                    }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ExpandedBoxItemPopup;