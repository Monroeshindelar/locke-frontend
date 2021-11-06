import './BoxItem.css'
import { Component } from "react";

import { Image } from 'react-bootstrap';
import { getPaddedDexNumber } from '../../Utilities/Utils';
import { getPokemonSpecies } from "../../Utilities/PokeApiUtils";
import { times } from 'lodash';

class BoxItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speciesInfo: null
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

    render() {
        let path = this.getImageUrl();

        return(
            <div className="boxItemBackground">
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
        );
    }
}

export default BoxItem;