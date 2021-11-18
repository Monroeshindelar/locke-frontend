import "./AdminPanel.css"
import { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { startGame } from "../../Utilities/GameServiceApiUtils";

class AdminPanel extends Component {
    constructor(props) {
        super(props);
    }

    async handleClick() {
        await startGame(this.props.gameId);
    }

    render() {
        return(
            <Container>
                <Row>
                    <Col>
                        <h3>Admin Controls</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={ () => this.handleClick() }>Start Game</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AdminPanel;