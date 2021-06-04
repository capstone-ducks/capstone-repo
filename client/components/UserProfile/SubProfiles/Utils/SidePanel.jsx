import React, { Component } from "react";
import profilePic from "../../../../../public/images/utils/user.svg";
import "../../../../../public/assets/userProfile.css";

import { Segment, Grid, Divider, Card, Header, Image } from "semantic-ui-react";

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Segment id="user-side-panel" vertical>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Card centered>
                                <Image src={profilePic} wrapped ui={false} />
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <p className="greyed-text">Info</p>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">Hello</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default SidePanel;
