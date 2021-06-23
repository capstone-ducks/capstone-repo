import React, { Component } from "react";
import { Input, Menu, Segment, Label, Icon } from "semantic-ui-react";
import {
    Bio,
    MyWallet,
    UnclaimedDonations,
    RecipientHistory,
} from "./MenuItems";
import { connect } from "react-redux";

class DonorMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "My Wallet",
            numberOfDonations: 0,
            loading: true,
        };
        this._isMounted = false;
        this.handleItemClick = this.handleItemClick.bind(this);
        this.countNumberOfDonations = this.countNumberOfDonations.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({
                numberOfDonations: this.countNumberOfDonations(),
                loading: false,
            });
        }
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.donations.length !== this.props.donations.length) {
            this.setState({
                numberOfDonations: this.countNumberOfDonations(),
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    countNumberOfDonations() {
        const { user, donations } = this.props;

        // Count number of donations that this user hasn't claimed
        const numberOfDonations = donations.reduce((acc, donation) => {
            for (const recipient of donation.users) {
                if (recipient.id === user.id) {
                    if (recipient.donationsRecipients.isClaimed) acc += 1;
                }
                return acc;
            }
        }, 0);

        return numberOfDonations;
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem, numberOfDonations, loading } = this.state;

        if (loading) {
            return "loading";
        }

        return (
            <div>
                <Menu attached="top" tabular>
                    <Menu.Item
                        name="My Wallet"
                        active={activeItem === "My Wallet"}
                        onClick={this.handleItemClick}
                    >
                        <Icon name="ethereum" /> My Wallet
                    </Menu.Item>
                    <Menu.Item
                        name="Unclaimed"
                        active={activeItem === "Unclaimed"}
                        onClick={this.handleItemClick}
                    >
                        <Icon name="mail" /> Unclaimed
                        {numberOfDonations > 0 ? (
                            <Label color="red" floating size="tiny">
                                {numberOfDonations}
                            </Label>
                        ) : (
                            ""
                        )}
                    </Menu.Item>
                    <Menu.Item
                        name="History"
                        active={activeItem === "History"}
                        onClick={this.handleItemClick}
                    >
                        <Icon name="history" />
                        History
                    </Menu.Item>
                    <Menu.Item
                        name="Bio"
                        active={activeItem === "Bio"}
                        onClick={this.handleItemClick}
                    >
                        <Icon name="user" />
                        Bio
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{ name: "search", link: true }}
                                placeholder="Search transactions..."
                                onChange={() =>
                                    this.handleItemClick(event, {
                                        name: "History",
                                    })
                                }
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached="bottom">
                    {activeItem === "My Wallet" ? (
                        <MyWallet />
                    ) : activeItem === "Unclaimed" ? (
                        <UnclaimedDonations />
                    ) : activeItem === "History" ? (
                        <RecipientHistory />
                    ) : activeItem === "Bio" ? (
                        <Bio />
                    ) : (
                        ""
                    )}
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        donations: state.donations,
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(DonorMenu);
