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
        return (
            <Card.Group>
                <UnclaimedCard donations={donations} />
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
