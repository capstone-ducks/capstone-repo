import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";

class ClaimedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claimedDonations: [],
            loading: true,
        };
        this.findClaimedDonations = this.findClaimedDonations.bind(this);
    }

    componentDidMount() {
        this.setState({
            claimedDonations: this.findClaimedDonations(),
            loading: false,
        });
    }

    findClaimedDonations() {
        const { user, donations } = this.props;

        // Count number of donations that this user hasn't claimed
        const claimedDonations = donations.reduce((acc, donation) => {
            for (const recipient of donation.users) {
                if (recipient.id === user.id) {
                    if (recipient.donationsRecipients.isClaimed) {
                        acc.push({
                            ...recipient.donationsRecipients,
                            donor: donation.donor,
                        });
                        return acc;
                    }
                }
            }

            return acc;
        }, []);

        return claimedDonations;
    }

    render() {
        const { claimedDonations, loading } = this.state;

        return (
            <React.Fragment>
                {!claimedDonations.length ? (
                    <div>No claimed donations.</div>
                ) : (
                    claimedDonations.map((donation, idx) => {
                        const updatedAt = new Date(donation.updatedAt);
                        return (
                            <Card key={idx}>
                                <Card.Content>
                                    <Image
                                        floated="right"
                                        size="mini"
                                        src="/images/ethereum-logo.svg"
                                    />
                                    <Card.Header>
                                        You claimed a donation of{" "}
                                        {donation.amountOwed} ETH
                                    </Card.Header>
                                    <Card.Meta>
                                        {updatedAt.toDateString()}
                                    </Card.Meta>{" "}
                                    {/*  reformat updatedAt data */}
                                    <Card.Description>
                                        User {donation.donor.firstName}{" "}
                                        {donation.donor.lastName[0]}.{" "}
                                        {donation.donor.city
                                            ? `from ${donation.donor.city} `
                                            : ""}
                                        sent this donation.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        );
                    })
                )}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        donations: state.donations,
    };
}

export default connect(mapStateToProps)(ClaimedCard);
