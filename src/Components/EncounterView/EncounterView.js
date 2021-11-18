import { Component } from "react";
import { Button, Container, Col, Form, Image, Row, FormLabel, Modal} from "react-bootstrap";
import { chunk, times } from 'lodash';
import { Link } from "react-router-dom";

import './EncounterView.css';
import { getEncounter, getGenerationInfo, getAllEncountersForLocation, getEncounterModesForLocation, updateEncounter, getGamesByUserId, getGameInfo, getParticipantInfo, getEncounterLocationsForGame } from '../../Utilities/GameServiceApiUtils';
import { capitalizeWord, getPaddedDexNumber } from  '../../Utilities/Utils'
import EncounterCard from './EncounterInfoPanel/EncounterInfoCard/EncounterInfoCard';
import { ACCOUNT_DETAIL_VIEW_PATH, GAME_PARTICIPANT_DETAIL_VIEW_PATH } from "../../constants";
import EncounterResultsPopup from "./EncounterResultsPopup/EncounterResultsPopup";

class EncounterView extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            games: null,
            gameId: null,
            participantInfo: null,
            generationInfo: null,
            modes: {},
            encounter: null,
            locationId: null,
            availableEncounters: null,
            filterSpeciesClause: false,
            locations: null
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        (async () => {
            let games = this.state.games;

            if (!games) {
                games = await getGamesByUserId(this.props.location.state.account);
            }

            try {
                if (this._isMounted) {
                    this.setState({
                        games: games
                    });
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

    async populateModes(locationId) {
        (async () => {
            try {
            let modes = await getEncounterModesForLocation(this.state.generationInfo.generationId, locationId, this.state.participantInfo.gameId);

            let am = {};

            for(var m in modes) {
                am[modes[m]] = true;
            }

            this.setState({
                modes: am,
            });
            } catch (err) {
                console.log(err);
            }
        })();
    }

    async updateAvailableEncounters(locationId) {
        (async () => {
            try {
                this.setState({
                    availableEncounters: await getAllEncountersForLocation(this.state.generationInfo.generationId, locationId, 0)
                });
            } catch (err) {
                console.log(err);
            }
        })();
    }

    async roll() {
        (async () => {
            let modes = [];

            for(var m in this.state.modes) {
                if (this.state.modes[m]) {
                    modes.push(m);
                }
            }

            try {
                this.setState({
                    encounter: await getEncounter(this.state.gameId, this.state.participantInfo.id, this.state.locationId, modes.join(","), 
                        this.state.filterSpeciesClause)
                })
            } catch (err) {
                console.log(err);
            }
        })();
    }

    filterEncounterLocations(encounterLocations) {
        let filtered = encounterLocations;
        if (this.state.participantInfo) {
            let consumedLocations = this.state.participantInfo.box.encounterLocations;
            filtered = encounterLocations.filter(function(obj) { return consumedLocations.indexOf(obj) == -1; });
        }

        return filtered;
    }

    handleLocationChange(locationId) {
        this.setState({
            locationId: locationId
        });

        this.populateModes(locationId);
        this.updateAvailableEncounters(locationId);
    }

    handleModeCheckboxChange(checked, mode) {
        let m = this.state.modes;

        m[mode] = checked;

        this.setState({
            modes: m
        });
    }

    handleGetEncounterClick() {
        this.roll();
    }

    handleSpeciesClauseCheck(checked) {
        this.setState({
            filterSpeciesClause: checked
        });
    }

    async handleGameChange(gameId) {
        let gameInfo = await getGameInfo(gameId);
        let participantInfo = await getParticipantInfo(gameId, this.props.location.state.account);
        let generationInfo = await getGenerationInfo(gameInfo.settings.generationId);
        let locations = await getEncounterLocationsForGame(gameInfo.settings.generationId, participantInfo.gameId);

        this.setState({
            participantInfo: participantInfo,
            generationInfo: generationInfo,
            gameId: gameInfo.id,
            locations: locations
        });
    }

    render() {
        var gameOptions = [];

        if (this.state.games) {
            for (var g in this.state.games) {
                gameOptions.push(
                    <option id={this.state.games[g].id}>{this.state.games[g].settings.name}</option>
                )
            }
        }

        var locationOptions = [];

        if(this.state.generationInfo) {
            let locations = this.filterEncounterLocations(this.state.locations).sort();
            for(var l in locations) {
                locationOptions.push(
                    <option id={locations[l]}>{locations[l]}</option>
                );
            }
        }

        var modeCheckBoxes = [];

        var modes = Object.keys(this.state.modes);

        for(var m in modes) {
            let modeName = modes[m];
            modeCheckBoxes.push(
                <Form.Check
                    key={`${modeName}-mode-checkbox`}
                    type="checkbox"
                    checked={this.state.modes[modeName]}
                    id={`${modeName}-mode-checkbox`}
                    label={capitalizeWord(modeName)}
                    onChange={(e) => this.handleModeCheckboxChange(e.target.checked, modeName)}
                />
            );
        }

        var encounters = [];

        if(this.state.availableEncounters) {
            var sorted = this.state.availableEncounters.sort(); 
            for(var e in this.state.availableEncounters) {
                var encounter = this.state.availableEncounters[e];

                if(this.state.modes[encounter.encounterMode]) {
                    encounters.push(
                        <EncounterCard key={e} encounter={this.state.availableEncounters[e]} />
                    )
                }
            }
        }

        const rows = chunk(encounters, 4);

        return (
            <div className="EncounterView">
                <Container>
                    {/* Outer row containing the entire page*/}
                    <Row>
                        {/* Left hand encounter configuration */}
                        <Col xl={3} className="leftPanel">
                            <Row className="sidebarRow">
                                <Form> 
                                    <Form.Label className="configLabel">Game</Form.Label>
                                    <Form.Select
                                        onChange={ (e) => this.handleGameChange(e.target.selectedOptions[0].id) }
                                    >
                                        <option>--</option>
                                        {gameOptions}
                                    </Form.Select>
                                </Form>
                            </Row>
                            <Row className="sidebarRow">
                                <Form> 
                                    <Form.Label className="configLabel">Encounter Location</Form.Label>
                                    <Form.Select
                                      onChange={(e) => this.handleLocationChange(e.target.value)}>
                                        <option>--</option>
                                        {locationOptions}
                                    </Form.Select>
                                </Form>
                            </Row>
                            <Row className="sidebarRow">
                                <Form>
                                    <Form.Label className="configLabel">Encounter Mode</Form.Label>
                                    {modeCheckBoxes}
                                </Form>
                            </Row>
                            <Row className="sidebarRow">
                                <Form>
                                    <Form.Label className="configLabel">Additional Options</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        id="filter-sc-checkbox"
                                        checked={this.state.filterSpeciesClause}
                                        onClick={(e) => this.handleSpeciesClauseCheck(e.target.checked)}
                                        label="Filter Species Clause"/>
                                </Form>
                            </Row>
                            <Row>
                                <Button variant="primary" disabled={!this.state.locationId} onClick={() => this.handleGetEncounterClick()}>
                                    Get Encounter
                                </Button>
                            </Row>
                        </Col>
                        {/* Main righthand content */}
                        <Col className="rightPanel">
                            <Container>
                                {rows.map((cols) => (
                                    <Row className="encounterRow">
                                        {cols.map((col) => (
                                            <Col xs={12} sm={6} md={4} lg={3}>
                                                {col}
                                            </Col>
                                        ))}
                                    </Row>
                                ))}
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <EncounterResultsPopup 
                    encounter={this.state.encounter}
                    gameId={this.state.gameId} 
                    participantId={
                        this.state.participantInfo
                            ?
                                this.state.participantInfo.id
                            :
                                null
                    }
                    locationId={this.state.locationId}
                />
            </div>
        )
    }
}

export default EncounterView;