import { chunk } from "lodash";
import { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import BoxItem from "./BoxItem";

import './Box.css'

class Box extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 0
        }
    }

    handlePageBackwardClick() {
        if (this.props.contents) {
            let maxPages = Math.floor(this.props.contents.length / 30);

            let nextPage = this.state.pageNumber - 1 < 0 ? maxPages : this.state.pageNumber - 1;

            this.setState({
                pageNumber: nextPage
            });
        }
    }

    handlePageForwardClick() {
        if (this.props.contents) {
            let maxPages = this.props.contents.length / 30;

            let nextPage = this.state.pageNumber + 1 >= maxPages ? 0 : this.state.pageNumber + 1;

            this.setState({
                pageNumber: nextPage
            });
        }
    }

    render() {
        var items = [];
        console.log(this.props.contents);

        for (var i = this.state.pageNumber * 30; i < (this.state.pageNumber * 30) + 30; i++) {
            console.log(i)
            let pokemon = null;

            try {
                pokemon = this.props.contents[i];
            } catch (err) { }

            console.log(pokemon);

            items.push(
                <BoxItem 
                    key={i} 
                    itemNumber={i}
                    pokemon={pokemon} 
                    gameId={this.props.gameId}
                    participant={this.props.participant}
                />
            )
        }

        const rows = chunk(items, 5);

        return (
            <Container id="box" className="box">
                <Row className="titleRow">
                    <Col>
                        <Button
                            onClick={() => this.handlePageBackwardClick()}
                        >
                            Back
                        </Button>
                    </Col>
                    <Col className="boxLabel"><h3>Box {this.state.pageNumber + 1}</h3></Col>
                    <Col className="forwardButtonCol">
                        <Button
                            onClick={() => this.handlePageForwardClick()}
                        >
                            Forward
                        </Button>
                    </Col>
                </Row>
                {rows.map((cols, rowIndex) => (
                    <Row className="boxRow flex-nowrap" key={rowIndex}>
                        {cols.map((col, colIndex) => (
                            <Col className="boxCol" key={colIndex}>
                                {col}
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        );
    }
}

export default Box;