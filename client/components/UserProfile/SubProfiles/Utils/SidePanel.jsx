import React, { Component } from "react";
// import unnamedPic from "../../../../../public/images/utils/user.svg";
import nanPic from "../../../../../public/images/profile-pictures/nan.png";
import "../../../../../public/assets/userProfile.css";
import { Segment, Grid, Divider, Card, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isDonor } = this.props.user;
        return (
            <Segment id="user-side-panel" vertical>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Card centered>
                                <Image src={nanPic} wrapped ui={false} />
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <p className="greyed-text">Stats</p>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {isDonor ? (
                                <div className="stats-container"></div>
                            ) : (
                                <div className="stats-container"></div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(SidePanel);