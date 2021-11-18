import './MiniTeamViewItem.css'
import { Container, Col, Row, Image } from "react-bootstrap";
import { Component } from 'react';
import { getPokemonSpecies } from '../../Utilities/PokeApiUtils';
import { capitalizeWord, getPaddedDexNumber } from "../../Utilities/Utils";

class MiniTeamViewItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speciesInfo: null
        };
    }

    async componentDidMount() {
        if (this.props.pokemon) {
            try {
                this.setState({
                    speciesInfo: await getPokemonSpecies(this.props.pokemon.model.id)
                })
            } catch (err) { }
        }
    }

    getImageUrl() {
        let image = "";

        if (this.props.pokemon && this.state.speciesInfo) {
            image = `${process.env.PUBLIC_URL}/assets/${getPaddedDexNumber(this.props.pokemon.model.id)}-${this.props.pokemon.model.name}`

            if (this.state.speciesInfo.has_gender_differences) {
                if (this.props.pokemon.gender === "MALE") {
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

        return(
            <div className="miniTeamViewItemBackground">
                <Image
                    className="teamImage"
                    src={image}
                    alt=""
                />
            </div>
        )
    }
}

export default MiniTeamViewItem;