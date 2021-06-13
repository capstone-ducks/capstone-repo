import React, { Component } from "react";
import UnclaimedCard from "./Cards/UnclaimedCard.jsx";
import { Card } from 'semantic-ui-react'


class UnclaimedDonations extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Card.Group>
                <UnclaimedCard/>
            </Card.Group>
        )
    }
};

export default UnclaimedDonations;
