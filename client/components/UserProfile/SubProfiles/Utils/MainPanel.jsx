import React, { Component } from "react";
import "../../../../../public/assets/userProfile.css";
import DonorMenu from "./DonorMenu.jsx";

import {
    Segment,
    Grid,
    Divider,
    Card,
    Header,
    Image,
    Icon,
} from "semantic-ui-react";

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { firstName, lastName, city, state, isDonor } = this.props.user;
        return (
            <Segment id="user-main-panel" vertical>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="row-extension">
                                <Header as="h1" id="name-header">
                                    {firstName} {lastName}
                                </Header>
                                <Icon
                                    id="profile-location-icon"
                                    name="map marker alternate"
                                    size="large"
                                    color="grey"
                                />
                                {city ? (
                                    <small id="profile-location-text">
                                        {city}, {state}
                                    </small>
                                ) : (
                                    <small id="profile-location-text">
                                        Unknown Location
                                    </small>
                                )}
                            </div>
                            <Header as="h2" id="profile-type">
                                {isDonor ? "Donor" : "Recipient"}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <DonorMenu />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default MainPanel;
