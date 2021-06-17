import React, { Component } from "react";
import "../../../../../public/assets/userProfile.css";
import DonorMenu from "./DonorMenu.jsx";
import RecipientMenu from "./RecipientMenu.jsx";
import { connect } from "react-redux";
import { fetchAllUsersDonations } from "../../../../store/thunk/donations";

import { Segment, Grid, Header, Icon, Message } from "semantic-ui-react";

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const userId = this.props.user.id
        this.props.fetchAllUsersDonations(userId);
    }

    render() {
        const { firstName, lastName, city, state, isDonor } = this.props.user;
        console.log(this.props, 'MainPanel MENU')
        // return (
        //     <Segment id="user-main-panel" vertical>
        //         <Grid padded>
        //             <Grid.Row>
        //                 <Grid.Column>
        //                     <div className="row-extension">
        //                         <Header as="h1" id="name-header">
        //                             {firstName} {lastName}
        //                         </Header>
        //                         <Icon
        //                             id="profile-location-icon"
        //                             name="map marker alternate"
        //                             size="large"
        //                             color="grey"
        //                         />
        //                         {city ? (
        //                             <small id="profile-location-text">
        //                                 {city}, {state}
        //                             </small>
        //                         ) : (
        //                             <small id="profile-location-text">
        //                                 Unknown Location
        //                             </small>
        //                         )}
        //                     </div>
        //                     <Header as="h2" id="profile-type">
        //                         {isDonor ? "Donor" : "Recipient"}
        //                     </Header>
        //                 </Grid.Column>
        //             </Grid.Row>
        //             <Grid.Row>
        //                 <Grid.Column>
        //                     {isDonor ? <DonorMenu /> : <RecipientMenu />}
        //                 </Grid.Column>
        //             </Grid.Row>
        //         </Grid>
        //     </Segment>
        // );
        if(this.props.donations.length && !isDonor){
        return (
            <Segment id="user-main-panel" vertical>
                <Message icon color='teal'>
                    <Icon name='info circle' />
                    <Message.Content>
                    <Message.Header> Welcome back {firstName} {lastName} !</Message.Header>
                    You have ({this.props.donations.length}) unclaimed donation(s)
                    </Message.Content>
                </Message>
                {/* <Message 
                    icon='info circle' 
                    info
                    header='Welcome back' {firstName}
                    content='You may now log-in with the username you have chosen'
                /> */}
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column>
                            <div className="row-extension">
                                <Header as="h1" id="name-header">
                                    {firstName} {lastName}
                                </Header>
                                <Icon
                                    id="profile-location-icon"
                                    name="map marker alternate"
                                    size="large"
                                    color="grey"
                                />
                                {city ? (
                                    <small id="profile-location-text">
                                        {city}, {state}
                                    </small>
                                ) : (
                                    <small id="profile-location-text">
                                        Unknown Location
                                    </small>
                                )}
                            </div>
                            <Header as="h2" id="profile-type">
                                {isDonor ? "Donor" : "Recipient"}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {isDonor ? <DonorMenu /> : <RecipientMenu />}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
        }
        else{
            return (
                <Segment id="user-main-panel" vertical>
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column>
                                <div className="row-extension">
                                    <Header as="h1" id="name-header">
                                        {firstName} {lastName}
                                    </Header>
                                    <Icon
                                        id="profile-location-icon"
                                        name="map marker alternate"
                                        size="large"
                                        color="grey"
                                    />
                                    {city ? (
                                        <small id="profile-location-text">
                                            {city}, {state}
                                        </small>
                                    ) : (
                                        <small id="profile-location-text">
                                            Unknown Location
                                        </small>
                                    )}
                                </div>
                                <Header as="h2" id="profile-type">
                                    {isDonor ? "Donor" : "Recipient"}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {isDonor ? <DonorMenu /> : <RecipientMenu />}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            );
        }
    }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);
