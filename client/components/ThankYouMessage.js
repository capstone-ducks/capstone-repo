import React, { Component } from "react";
import { connect } from "react-redux";
import{Message, Icon} from 'semantic-ui-react'

class ThankYouMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Message success icon color='green'>
                    <Icon name='thumbs up outline' />
                    <Message.Content>
                    <Message.Header> Thank you {this.props.user.firstName} {this.props.user.lastName}  for your generous donation!</Message.Header>
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