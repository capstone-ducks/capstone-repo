import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Header, Grid } from "semantic-ui-react";

class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { email, publicKey, cryptoAddress } = this.props.user;

        return (
            <React.Fragment>
                <div id="bio-menu">
                    <Header as="h4" id="basic-information-header">
                        DONOR INFORMATION
                    </Header>
                    <Grid columns="equal" padded>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Wallet Address:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>{cryptoAddress}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Header as="h4" id="contact-information-header">
                        CONTACT INFORMATION
                    </Header>
                    <Grid columns="equal" padded>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Phone:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>No Number Found</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Address:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>No Address Found</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Email:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>{email}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Header as="h4" id="basic-information-header">
                        BASIC INFORMATION
                    </Header>
                    <Grid columns="equal" padded>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Gender:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>No Information</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(Bio);