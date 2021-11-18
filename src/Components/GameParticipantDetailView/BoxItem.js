import './BoxItem.css'
import { Component } from "react";

import { Image } from 'react-bootstrap';
import { getPaddedDexNumber } from '../../Utilities/Utils';
import { getPokemonSpecies } from "../../Utilities/PokeApiUtils";
import { times } from 'lodash';
import ExpandedBoxItemPopup from './ExpandedBoxItemPopup';

class BoxItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speciesInfo: null,
            showExpandedInfo: false
        }
    }

    async componentDidMount() {
        if (this.props.pokemon !== null) {
            try {
                this.setState({
                    speciesInfo: await getPokemonSpecies(this.props.pokemon.model.id)
                })
            } catch (err) { }
        }
    }

    handleBoxClick() {
        if (this.props.pokemon && this.state.speciesInfo) {
            this.setState({
                showExpandedInfo: true
            });
        }
    }

    handleExpandedModalClose = () => {
        this.setState({
            showExpandedInfo: false
        });
    }

    getImageUrl() {
        let path = "";
        if (this.props.pokemon && this.state.speciesInfo) {
            path = `${process.env.PUBLIC_URL}/assets/home-icons/${getPaddedDexNumber(this.props.pokemon.model.id)}`
            if (this.state.speciesInfo.has_gender_differences) {
                if (this.props.pokemon.gender) {
                    if (this.props.pokemon.gender === "MALE") {
                        path = `${path}-m`;
                    } else if (this.props.pokemon.gender === "FEMALE") {
                        path = `${path}-f`;
                    }
                } else {
                    if (this.state.speciesInfo.gender_rate == 0 || this.state.speciesInfo.gender_rate < 4) {
                        path = `${path}-m`
                    } else if (this.state.speciesInfo.gender_rate == 8 || this.state.speciesInfo.gender_rate <= 4) {
                        path = `${path}-f`
                    }
                }
            }
            path = `${path}.png`;

        }
        return path;
    }

    isOnTeam() {
        if (this.props.participant && this.props.pokemon) {
            for(var t in this.props.participant.team.mainTeam) {
                let teamMember = this.props.participant.team.mainTeam[t];

                if (this.props.pokemon.locationId === teamMember.locationId) {
                    return true;
                }
            }
        }

        return false;
    }

    isTeamFull() {
        if (this.props.participant) {
            return this.props.participant.team.mainTeam.length == 6;
        }

        return false;
    }

    render() {
        let path = this.getImageUrl();

        return(
            <>
                <div 
                    className="boxItemBackground"
                    onClick={ () => this.handleBoxClick() }
                >
                    {
                        this.props.pokemon
                            ?
                                <Image 
                                    className={
                                        !this.props.pokemon.alive
                                        ?
                                            "boxItemImage dead"
                                        :
                                            "boxItemImage"
                                    } 
                                    src={path}
                                    alt="" 
                                />
                            :
                                ""
                                
                    }
                </div>
                <ExpandedBoxItemPopup 
                    show={this.state.showExpandedInfo} 
                    pokemon={this.props.pokemon}
                    gameId={this.props.gameId}
                    participant={this.props.participant}
                    isOnTeam={this.isOnTeam()}
                    isTeamFull={this.isTeamFull()}
                    itemNumber={this.props.itemNumber}
                    close={this.handleExpandedModalClose}
                />
            </>
        );
    }
}

export default BoxItem;