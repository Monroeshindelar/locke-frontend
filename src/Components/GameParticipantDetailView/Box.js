import { chunk, isLength } from "lodash";
import { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
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
            let maxPages = this.props.contents / 30;

            let nextPage = this.state.pageNumber - 1 < 0 ? maxPages : this.state.pageNumber - 1;

            this.setState({
                pageNumber: nextPage
            });
        }
    }

    handlePageForwardClick() {
        if (this.props.contents) {
            let maxPages = this.props.contents / 30;

            let nextPage = this.state.pageNumber + 1 >= maxPages ? 0 : this.state.pageNumber + 1;

            this.setState({
                pageNumber: nextPage
            });
        }
    }

    render() {
        var items = [];

        for (var i = this.state.pageNumber * 30; i < (this.state.pageNumber * 30) + 30; i++) {
            let pokemon = null;

            try {
                pokemon = this.props.contents[i];
            } catch (err) { }

            console.log(pokemon, i);
            items.push(
                <BoxItem key={pokemon} pokemon={pokemon} />
            )
        }

        const rows = chunk(items, 5);

        return (
            <Container id="box" className="box">
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