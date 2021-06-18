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
        this.state = {};
    }

    render() {
        const { isDonor } = this.props.user;

        const totalFundsDonated = isDonor
            ? this.props.donations.reduce((acc, cur) => {
                  acc += parseFloat(cur.amount);
                  return acc;
              }, 0)
            : 0;

        const totalPeopleReached = isDonor
            ? this.props.donations.reduce((acc, cur) => {
                  acc += cur.users.length;
                  return acc;
              }, 0)
            : 0;

        const totalFundsClaimed = !isDonor
            ? this.props.donations.reduce((acc, cur) => {
                  let userRecInst;
                  for (const user of cur.users) {
                      if (user.id === this.props.user.id) {
                          userRecInst = user.donationsRecipients;
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
                  for (const user of cur.users) {
                      if (user.id === this.props.user.id) {
                          userRecInst = user.donationsRecipients;
                      }
                  }

                  if (!userRecInst.isClaimed) {
                      acc += userRecInst.amountOwed;
                  }

                  return acc;
              }, 0)
            : 0;

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
