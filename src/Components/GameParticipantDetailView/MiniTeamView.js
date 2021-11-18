import { chunk } from "lodash";
import { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import MiniTeamViewItem from "./MiniTeamViewItem";

class MiniTeamView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let items = [];

        for(var i = 0; i < 6; i++) {
           let pokemon = null;
           
           try {
               pokemon = this.props.team[i];
           } catch (err) {}

           items.push(
               <MiniTeamViewItem key={pokemon} pokemon={pokemon} />
           )
        }

        const rows = chunk(items, 3);


        return(
            <Container>
                {rows.map((cols) => (
                    <Row className="boxRow flex-nowrap">
                        {cols.map((col) => (
                            <Col className="boxCol">
                                {col}
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        )
    }
}

export default MiniTeamView;