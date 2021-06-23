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
        const claimedDonations = donations.map((donation) => {
            for (const recipient of donation.users) {
                if (recipient.id === user.id) {
                    if (recipient.donationsRecipients.isClaimed) {
                        return {
                            ...recipient.donationsRecipients,
                            donor: donation.donor,
                        };
                    }
                }
            }
        });

        return claimedDonations;
    }

    render() {
        const { claimedDonations, loading } = this.state;

        return (
            <div>
                {!donations ? (
                    <div>No donations to claim at this time</div>
                ) : (
                    claimedDonations.map((donation) => {
                        const { donationId } = donation;

                        return (
                            <Card key={donationId}>
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
                                    <Card.Meta>{donation.updatedAt}</Card.Meta>{" "}
                                    {/*  reformat updatedAt data */}
                                    <Card.Description>
                                        User {donation.donor.firstName}{" "}
                                        {donation.donor.lastName[0]}.{" "}
                                        {donation.donor.city
                                            ? `from ${donation.donor.city}`
                                            : ""}
                                        sent this donation.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        );
                    })
                )}
            </div>
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
