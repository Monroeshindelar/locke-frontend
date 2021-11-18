import { Component } from "react";
import { Container, ProgressBar, Row, Col } from "react-bootstrap";
import "../../css/generic.css";
import { getNature } from "../../Utilities/PokeApiUtils";
import "./BaseStatsPanel.css";



class BaseStatsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            natureInfo: null
        };
    }

    async componentDidMount() {
        try {
            if (this.props.nature) {
                this.setState({
                    natureInfo: await getNature(this.props.nature.toLowerCase())
                });
            }
        } catch (err) {}
    }

    getProgressVariant(stat) {
        if (stat < 60) {
            return "danger";
        } else if (stat < 100) {
            return "warning";
        } else {
            return "success";
        }
    }

    getStatVariant(statName) {
        if (this.state.natureInfo && this.state.natureInfo.decreased_stat && this.state.natureInfo.increased_stat) {
            if (statName === this.state.natureInfo.decreased_stat.name) {
                return "reducedStat";
            } else if (statName === this.state.natureInfo.increased_stat.name) {
                return "boostedStat";
            } else{
                return "";
            }
        }
    }

    render() {
        return(
            <Container>
                <Row>
                    <h3>Stats</h3>
                </Row> 
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("hp") }
                        >
                            HP
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.hp)
                                        :
                                            "danger"

                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.hp / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.hp
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("attack") }
                        >
                            Attack
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.attack)
                                        :
                                            "danger"

                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.attack / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.attack
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("defense") }
                        >
                            Defense
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.defense)
                                        :
                                            "danger"
                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.defense / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.defense
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("special-attack") }
                        >
                            Sp. Atk
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.specialAttack)
                                        :
                                            "danger"
                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.specialAttack / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.specialAttack
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("special-defense") }
                        >
                            Sp. Def
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.specialDefense)
                                        :
                                            "danger"
                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.specialDefense / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.specialDefense
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xl={2}>
                        <h5
                            className={ this.getStatVariant("speed") }
                        >
                            Speed
                        </h5>
                    </Col>
                    <Col>
                        <div className="statBar">
                            <ProgressBar
                                variant={
                                    this.props.stats 
                                        ?
                                            this.getProgressVariant(this.props.stats.speed)
                                        :
                                            "danger"
                                }
                                now={ 
                                    this.props.stats
                                        ?
                                            (this.props.stats.speed / 250) * 100
                                        :
                                            ""
                                    } 
                            />
                        </div> 
                    </Col>
                    <Col xl={3}>
                        <h5>
                            {
                                this.props.stats
                                    ?
                                        this.props.stats.speed
                                    :
                                        0
                            }
                        </h5>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default BaseStatsPanel;