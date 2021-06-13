import React, { Component } from "react";
import UnclaimedCard from "./Cards/UnclaimedCard.jsx";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";
import { fetchAllUsersDonations } from "../../../../../store/thunk/donations";


class UnclaimedDonations extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const userId = this.props.user.id
        this.props.fetchAllUsersDonations(userId);
    }

    render() {
        const { donations } = this.props;
        return (
            <Card.Group>
                <UnclaimedCard donations={donations}/>
            </Card.Group>
        )
    }
};

function mapStateToProps(state) {
    return {
        donations: state.donations,
        user: state.auth.user,
    };
};

function mapDispatchToProps (dispatch) {
    return {
        fetchAllUsersDonations: (id) => dispatch(fetchAllUsersDonations(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnclaimedDonations);
