import React, { Component } from "react";
import { connect } from "react-redux";
import { DonorProfile, RecipientProfile } from "./SubProfiles";
import { fetchAllUsersDonations } from "../../store/thunk";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { user, fetchAllUsersDonations } = this.props;

        if (user) {
            await fetchAllUsersDonations(user.id);
        }
    }

    async componentDidUpdate(prevState, prevProps) {
        const { user, donations, fetchAllUsersDonations, history } = this.props;
        if (!user) {
            history.push("/");
        } else if (prevProps.user !== user || prevProps.donations !== donations) {
            await fetchAllUsersDonations(user.id);
        }
    }
    // async componentDidUpdate(prevProps) {
    //     const { user, fetchAllUsersDonations, history } = this.props;
    //     if (!user) {
    //         history.push("/");
    //     } else if (!prevProps.user && user ) {
    //         await fetchAllUsersDonations(user.id);
    //     }
    // }

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

function mapDispatchToProps(dispatch) {
    return {
        fetchAllUsersDonations: (id) => dispatch(fetchAllUsersDonations(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
