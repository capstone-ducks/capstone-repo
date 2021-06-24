import React, { Component } from "react";
import { Card } from "semantic-ui-react";

import ClaimedCard from "./Cards/ClaimedCard.jsx";

class RecipientHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="card-container">
                <ClaimedCard />
            </div>
        );
    }
}

export default RecipientHistory;
