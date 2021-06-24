import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import DonationCard from "./Cards/DonationCard.jsx";

class DonateHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="card-container">
                <DonationCard />
            </div>
        );
    }
}

export default DonateHistory;
