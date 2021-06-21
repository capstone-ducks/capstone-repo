import React, { Component } from "react";
import "../../../../../public/assets/userProfile.css";
import {
    Segment,
    Grid,
    Divider,
    Card,
    Header,
    Image,
    Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";

import nanPic from "../../../../../public/images/profile-pictures/nan.png";
import matthewPic from "../../../../../public/images/profile-pictures/matthew.png";
// import unnamedPic from "../../../../../public/images/utils/user.svg";

class SidePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            totalDonations: "",
            totalFundsClaimed: 0,
            totalPeopleReached: 0,
            totalFundsToClaim: 0,
        };
        this.calculateSidePanelStats = this.calculateSidePanelStats.bind(this);
    }

    componentDidMount() {
        const { user, donations } = this.props;
        this.calculateSidePanelStats(user, donations);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.donations !== this.props.donations) {
            const { user, donations } = this.props;
            calculateSidePanelStats(user, donations);
        }
    }

    calculateSidePanelState(user, donations) {
        const { isDonor } = user;

        const totalDonations = isDonor ? donations.length : "";

        const totalFundsDonated = isDonor
            ? donations.reduce((acc, cur) => {
                  acc += parseFloat(cur.amount);
                  return acc;
              }, 0)
            : 0;

        const totalPeopleReached = isDonor
            ? donations.reduce((acc, cur) => {
                  acc += cur.users.length;
                  return acc;
              }, 0)
            : 0;

        const totalFundsClaimed = !isDonor
            ? donations.reduce((acc, cur) => {
                  let userRecInst;
                  for (const curUser of cur.users) {
                      if (curUser.id === user.id) {
                          userRecInst = curUser.donationsRecipients;
                      }
                  }

                  if (userRecInst.isClaimed) {
                      acc += userRecInst.amountOwed;
                  }

                  return acc;
              }, 0)
            : 0;

        const totalFundsToClaim = !isDonor
            ? this.props.donations.reduce((acc, cur) => {
                  let userRecInst;
                  for (const curUser of cur.users) {
                      if (curUser.id === user.id) {
                          userRecInst = curUser.donationsRecipients;
                      }
                  }

                  if (!userRecInst.isClaimed) {
                      acc += userRecInst.amountOwed;
                  }

                  return acc;
              }, 0)
            : 0;

        this.setState({
            loading: false,
            totalDonations,
            totalFundsDonated,
            totalPeopleReached,
            totalFundsClaimed,
            totalFundsToClaim,
        });
    }

    render() {
        const {
            loading,
            totalDonations,
            totalFundsDonated,
            totalPeopleReached,
            totalFundsClaimed,
            totalFundsToClaim,
        } = this.state;

        if (loading) return "loading";

        return (
            <Segment id="user-side-panel" vertical>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Card centered>
                                <Image
                                    src={isDonor ? nanPic : matthewPic}
                                    wrapped
                                    ui={false}
                                />
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <p className="greyed-text">Stats</p>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            {isDonor ? (
                                <div className="stats-container">
                                    <Grid columns="2">
                                        <Grid.Row>
                                            <Grid.Column>
                                                Total People Reached:
                                            </Grid.Column>
                                            <Grid.Column>
                                                {totalPeopleReached}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                Total Donations:
                                            </Grid.Column>
                                            <Grid.Column>
                                                {totalDonations}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                Total Funds Sent:
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Icon name="ethereum" />{" "}
                                                {totalFundsDonated}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            ) : (
                                <div className="stats-container">
                                    <Grid columns="2">
                                        <Grid.Row>
                                            <Grid.Column>
                                                Funds Available
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Icon name="ethereum" />{" "}
                                                {totalFundsToClaim}
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                Total Funds Claimed
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Icon name="ethereum" />{" "}
                                                {totalFundsClaimed}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        donations: state.donations,
    };
}

export default connect(mapStateToProps)(SidePanel);
