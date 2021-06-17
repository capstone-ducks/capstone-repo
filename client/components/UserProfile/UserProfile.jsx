import React, { Component } from "react";
import { connect } from "react-redux";
import { DonorProfile, RecipientProfile } from "./SubProfiles";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {
        if (!this.props.user) {
            this.props.history.push("/");
        }
    }

    render() {
        if (!this.props.user) {
            return "Redirecting...";
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
