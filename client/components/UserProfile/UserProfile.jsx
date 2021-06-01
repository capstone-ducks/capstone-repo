import React, { Component } from "react";
import { connect } from "react-redux";
import { DonorProfile, RecipientProfile } from "./SubProfiles";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.user) {
            return `BAD! You didn't sign in.`;
        }

        const { isDonor } = this.props.user;

        return isDonor ? (
            <DonorProfile user={this.props.user} />
        ) : (
            <RecipientProfile user={this.props.user} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(UserProfile);
