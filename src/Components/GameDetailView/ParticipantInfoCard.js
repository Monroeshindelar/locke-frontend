import { Component } from "react";
import { Card, Container, Col, Row, Image } from "react-bootstrap";
import { getUser } from "../../Utilities/AuthServiceApiUtils";
import { getAvatarUrl, getUsernameWithDiscriminator } from "../../Utilities/UserUtils";
import "./ParticipantInfoCard.css";
import "../../css/generic.css"
import { prettyEnum } from "../../Utilities/Utils";
import { GAME_PARTICIPANT_DETAIL_VIEW_PATH } from "../../constants";
import { Link } from "react-router-dom";

class ParticipantInfoCard extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            profile: null
        };
    }

    async componentDidMount() {
        let profile = await getUser(this.props.participant.id);
        profile.principalId = this.props.participant.id;

        this.setState({
            profile: profile
        });
    }

    render() {
        return(
            <Card className="userInfoCard">
                 <Card.Body>
                    <Container>
                        <Row>
                            <Col xl={7}>
                                <Card.Title>
                                    {
                                        this.state.profile
                                            ?
                                                this.state.profile.principalId === this.props.user.principalId
                                                    ?
                                                        <Link
                                                            className="link"
                                                            to={{
                                                                pathname: GAME_PARTICIPANT_DETAIL_VIEW_PATH,
                                                                state: {
                                                                    gameId: this.props.gameId,
                                                                    participantId: this.props.user.principalId
                                                                }
                                                            }}
                                                        >
                                                            {getUsernameWithDiscriminator(this.state.profile)}
                                                        </Link>
                                                    :
                                                        getUsernameWithDiscriminator(this.state.profile)
                                                :
                                                    ""
                                    }
                                </Card.Title>
                                <Card.Subtitle
                                    className={
                                        this.props.participant.state === "READY"
                                            ?
                                                "ready"
                                            :
                                                "notReady"
                                    }    
                                >
                                    {
                                        prettyEnum(this.props.participant.playerState)
                                    }
                                </Card.Subtitle>
                            </Col>
                            <Col>
                                <Image
                                    className="participantAvi centeredContent"
                                    src=
                                        {
                                            this.state.profile
                                                ?
                                                    getAvatarUrl(this.state.profile)
                                                :
                                                    ""
                                        }
                                    alt=""
                                />
                            </Col>
                        </Row>
                    </Container>
                 </Card.Body>
            </Card>
        )
    }
}

export default ParticipantInfoCard;