import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Grid } from "semantic-ui-react";
import { EditBio } from "./Popups";

class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { email, publicKey, cryptoAddress, firstName, lastName, phone, gender, race, city, state } =
            this.props.user;

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
                            {phone != null ? 
                                (<p>
                                    {phone}
                                </p>) :
                                (
                                <p>
                                    N/A
                                </p>)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Address:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                {city != null ? 
                                (<p>
                                    {city}, {state}
                                </p>) :
                                (
                                <p>
                                    N/A
                                </p>)}
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
                                <p className="row-title">Name:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <p>
                                    {firstName} {lastName}
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Gender:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                            {gender != null ? 
                                (<p>
                                    {gender}
                                </p>) :
                                (
                                <p>
                                    N/A
                                </p>)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <p className="row-title">Race:</p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                            {race != null ? 
                                (<p>
                                    {race}
                                </p>) :
                                (
                                <p>
                                    N/A
                                </p>)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <EditBio
                        trigger={
                            <Button primary id="change-bio-info">
                                Edit Information
                            </Button>
                        }
                    />
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
