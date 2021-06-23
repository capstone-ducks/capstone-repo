import React, { Component } from "react";
import { connect } from "react-redux";
import{Message} from 'semantic-ui-react'

class ThankYouMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props, 'Thank you message')
        const { firstName, lastName } = this.props.user;
        return (
            <Message success icon color='green'>
            <Icon name='thumbs up outline' />
            <Message.Content>
            <Message.Header> Thank you {firstName} {lastName}  for your generous donation!</Message.Header>
            You truly make the difference for us, and we are extremely grateful!
            </Message.Content>
        </Message>
        );
    }
}

function mapStateToProps(state) {
    return {
        donations: state.donations,
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(ThankYouMessage);