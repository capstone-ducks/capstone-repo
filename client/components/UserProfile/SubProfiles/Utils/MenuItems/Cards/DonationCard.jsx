import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Image } from "semantic-ui-react";

class DonationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentDonations: [],
            loading: true,
        };
        this.requestRefund = this.requestRefund.bind(this);
    }

    requestRefund(id) {
        console.log(`requested refund for donation ${id}`);
    }

    render() {
        const { donations } = this.props;

        return (
            <div>
                {!donations ? (
                    <div>Send a donation to see history.</div>
                ) : (
                    donations.map((donation) => {
                        const { id } = donation;

                        return (
                            <Card key={id}>
                                <Card.Content>
                                    <Image
                                        floated="right"
                                        size="mini"
                                        src="/images/ethereum-logo.svg"
                                    />
                                    <Card.Header>
                                        You sent a donation of {donation.amount}{" "}
                                        ETH to {donation.numRecipients}{" "}
                                        recipients.
                                    </Card.Header>
                                    <Card.Meta>{donation.createdAt}</Card.Meta>{" "}
                                    {/*  reformat updatedAt data */}
                                    <Card.Description>
                                        Some description maybe...
                                    </Card.Description>
                                    <Button
                                        basic
                                        color="green"
                                        onClick={() =>
                                            this.requestRefund(donation.id)
                                        }
                                    >
                                        Request Refund
                                    </Button>
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

export default connect(mapStateToProps)(DonationCard);
