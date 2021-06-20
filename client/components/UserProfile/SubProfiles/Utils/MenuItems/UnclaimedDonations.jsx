import React, { Component } from "react";
import UnclaimedCard from "./Cards/UnclaimedCard.jsx";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

class UnclaimedDonations extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { donations } = this.props;
        const unClaimed = donations.filter((donation) => !donation.users[0].donationsRecipients.isClaimed);
        console.log(unClaimed)
        return (
            <Card.Group>
                <UnclaimedCard donations={unClaimed} />
            </Card.Group>
        );
    }
}

function mapStateToProps(state) {
    return {
        donations: state.donations,
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(UnclaimedDonations);

