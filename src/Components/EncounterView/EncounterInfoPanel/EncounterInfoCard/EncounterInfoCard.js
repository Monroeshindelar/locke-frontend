import './EncounterInfoCard.css'
import '../../../../css/types.css';
import { Component } from "react";
import { Container, Card, Col, Row, Image, ListGroup } from 'react-bootstrap';
import { capitalizeWord, getPaddedDexNumber, prettyEnum } from '../../../../Utilities/Utils';

class EncounterCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let path = `${process.env.PUBLIC_URL}/assets/${getPaddedDexNumber(this.props.encounter.model.id)}-${this.props.encounter.model.name}.gif`;

        let types = [];

        if (this.props.encounter) {
            for(var type in this.props.encounter.model.types) {
                var divClass = `type ${this.props.encounter.model.types[type].name}`
                types.push(
                    <div className={divClass}>
                        <Image
                            className="typeImage"
                            src={`${process.env.PUBLIC_URL}/assets/pokemon-type-svg-icons/icons/${this.props.encounter.model.types[type].name}.svg`}
                            height="15px"
                            width="15px"
                        />
                    </div>
                );
            }
        }

        return(
            <Card className="encounterCard">
                <Card.Body>
                    <Row>
                        <Col className="encounterImageContainer">
                            <Image className="encounterImage" src={path} alt=""/>
                        </Col> 
                    </Row>
                    <Row>
                        <Col xs={8} xl={8}>
                            <Card.Title className="nameTitle" as="h4">{capitalizeWord(this.props.encounter.model.name)}</Card.Title>
                        </Col>
                        <Col className="typeCol" xs={4} xl={4}>
                            {types}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="encounterInfo">
                                {
                                    this.props.encounter
                                        ?
                                            prettyEnum(this.props.encounter.mode)
                                        :
                                            ""
                                }
                            </p>
                            <p className="encounterInfo">
                                {
                                    this.props.encounter
                                        ?
                                            `${(this.props.encounter.defaultEncounterRate * 100)}% encounter rate`
                                        :
                                            ""
                                }
                            </p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default EncounterCard;