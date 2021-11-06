import "./EncounterResultsPopup.css";
import "../../../css/generic.css";

import { Component } from "react";
import { Image, Modal, Container, Row, Col, Button, Form, ButtonGroup, ToggleButton, InputGroup } from "react-bootstrap";
import { GAME_PARTICIPANT_DETAIL_VIEW_PATH } from "../../../constants";
import { Link } from "react-router-dom";
import { updateEncounter } from "../../../Utilities/GameServiceApiUtils";
import { getPaddedDexNumber } from "../../../Utilities/Utils";
import { times } from "lodash";

class EncounterResultsPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            abilityIndex: -1,
            nature: null,
            gender: "FEMALE",
            isShiny: false
        }
    }

    async updateEncounterInformation() {
        updateEncounter(this.props.gameId, this.props.participantId, this.props.locationId, 
            this.state.name, this.state.abilityIndex, this.state.nature, this.state.gender, this.state.isShiny);
    }

    hasAllRequiredInfo() {
        return this.state.name && 
            this.state.abilityIndex > -1 && 
            this.state.nature && 
            this.state.gender;
    }

    handleNicknameChange(nickname) {
        this.setState({
            name: nickname
        });
    }

    handleAbilitySelect(abilityIndex) {
        this.setState({
            abilityIndex: abilityIndex
        });
    }

    handleNatureSelect(nature) {
        if (nature === "--") {
            nature = null;
        }

        this.setState({
            nature: nature.toUpperCase()
        });
    }

    handleCatchClick() {
        this.updateEncounterInformation();
    }

    handleGenderSelect(gender) {
        this.setState({
            gender: gender
        });
    }

    handleShinySelect(shiny) {
        this.setState({
            isShiny: shiny
        });
    }

    render() {
        let image = "";

        let abilityOptions = [];

        if (this.props.encounter) {
            image = `${process.env.PUBLIC_URL}/assets/${getPaddedDexNumber(this.props.encounter.nationalDexNumber)}-${this.props.encounter.model.name}.gif`;

            for (var a in this.props.encounter.model.abilities) {
                abilityOptions.push(
                    <option>{this.props.encounter.model.abilities[a].name}</option>
                )
            }
        }

        let natureOptions = [];

        let natures = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", "Docile", "Relaxed", "Impish", "Lax", "Timid", "Hasty", 
            "Serious", "Jolly", "Naive", "Modest", "Mild", "Quiet", "Bashful", "Rash", "Calm", "Gentle", "Sassy", "Careful", "Quirky"].sort();

        for (var n in natures) {
            natureOptions.push(
                <option>{natures[n]}</option>
            )
        }

        return(
            <Modal
                show={this.props.encounter}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="encounterPopupContent">
                    <Container>
                        <Row>
                            <Col className="popupImageContainer" xl={6}>
                                <Image src={image} />
                            </Col>
                            <Col xl={6}>
                                <Container className="infoContainer">
                                    <Row>
                                        <Col className="popupHeader">
                                            <Modal.Title as="h2">
                                                {
                                                    this.props.encounter
                                                        ?
                                                            this.props.encounter.model.name
                                                        :
                                                            ""
                                                }
                                            </Modal.Title>
                                            <div className="centerContent typeBackground popupTypeBackground grass">
                                                <Image src={`${process.env.PUBLIC_URL}/assets/pokemon-type-svg-icons/icons/grass.svg`} height="18"/>
                                            </div>
                                            <div className="centerContent typeBackground popupTypeBackground poison">
                                                <Image src={`${process.env.PUBLIC_URL}/assets/pokemon-type-svg-icons/icons/poison.svg`} height="18"/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Nickname</Form.Label>
                                                <Form.Control
                                                    onChange={ (e) => this.handleNicknameChange(e.target.value) }
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Ability</Form.Label>
                                                <Form.Select
                                                    onChange={ (e) => this.handleAbilitySelect(e.target.selectedIndex - 1) }
                                                >
                                                    <option>--</option>
                                                    {abilityOptions}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Nature</Form.Label>
                                                <Form.Select
                                                    onChange={ (e) => this.handleNatureSelect(e.target.value) }
                                                >
                                                    <option>--</option>
                                                    {natureOptions}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Row>
                                    <Row>
                                        <Form.Group>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Male"
                                                checked={this.state.gender === "MALE"}
                                                onChange={ (e) => this.handleGenderSelect("MALE") }
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Female"
                                                checked={this.state.gender === "FEMALE"}
                                                onChange={ (e) => this.handleGenderSelect("FEMALE") }
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form>
                                            <Form.Check
                                                type="checkbox"
                                                id="shiny-checkbox"
                                                label="Shiny"
                                                onChange={ (e) => this.handleShinySelect(e.target.checked) }
                                            />
                                        </Form>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="buttonContainer">
                                <Link
                                    className={
                                        this.hasAllRequiredInfo()
                                            ?
                                                "btn btn-primary"
                                            :
                                                "btn btn-primary disabled"
                                    }
                                    to={{
                                        pathname: GAME_PARTICIPANT_DETAIL_VIEW_PATH,
                                        state: {
                                            gameId: this.props.gameId,
                                            participantId: this.props.participantId
                                        }
                                    }}
                                    style={
                                        this.hasAllRequiredInfo()
                                            ?
                                                null
                                            :
                                                {pointerEvents: "none"}
                                    }
                                    onClick={ () => this.handleCatchClick() }
                                >
                                    Catch
                                </Link>
                                <Link
                                    className="btn btn-danger"
                                    to={{
                                        pathname: GAME_PARTICIPANT_DETAIL_VIEW_PATH,
                                        state: {
                                            gameId: this.props.gameId,
                                            participantId: this.props.participantId
                                        }
                                    }}
                                >
                                    Run
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default EncounterResultsPopup;