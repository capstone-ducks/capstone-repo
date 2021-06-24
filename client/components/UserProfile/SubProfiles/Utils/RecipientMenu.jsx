import React, { Component } from "react";
import { Input, Menu, Segment, Label, Icon } from "semantic-ui-react";
import {
    Bio,
    MyWallet,
    UnclaimedDonations,
    RecipientHistory,
} from "./MenuItems";
import { connect } from "react-redux";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";

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
        //const exchangeRate = await getExchangeRate();

        if (this._isMounted) {
            this.setState({
                numberOfDonations: this.countNumberOfDonations(),
                loading: false,
            },
            async () => {
                const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
                if (metaMaskInstalled) {
                    const clientAddress = await this.getClientAddress();

                    // Gives Web3 Blockchain provider (MetaMask)
                    window.web3 = new Web3(window.ethereum);
                    const web3 = window.web3;

                    // making dynamic network
                    const networkId = await web3.eth.net.getId();
                    let balance = await web3.eth.getBalance(clientAddress) / 1000000000000000000;
                    //if (networkData) {

                        if (this._isMounted) {
                            console.log(clientAddress);
                            this.setState({
                                metaMaskInstalled,
                                clientWalletAddress: clientAddress,
                                walletBalance: balance,
                            });
                        }
                   // }
                }
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.numberOfDonations !== this.countNumberOfDonations()) {
            this.setState({
                numberOfDonations: this.countNumberOfDonations(),
            });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isMetaMaskInstalled() {
        // Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        const metaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);
        return metaMaskInstalled;
    }

    // Sends user to MetaMask to install it
    installMetaMask() {
        // We create a new MetaMask onboarding object to use in our app
        const forwarderOrigin = "http://localhost:4500";
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        onboarding.startOnboarding();
    }

    async getClientAddress() {
        const { ethereum } = window;
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });
       
        return accounts[0];
    }

    countNumberOfDonations() {
        const { user, donations } = this.props;

        // Count number of donations that this user hasn't claimed
        const numberOfDonations = donations.reduce((acc, donation) => {
            for (const recipient of donation.users) {
                if (recipient.id === user.id) {
                    if (!recipient.donationsRecipients.isClaimed) acc += 1;
                    break;
                }
            }
            return acc;
        }, 0);

        return numberOfDonations;
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem, numberOfDonations, loading, walletBalance, clientWalletAddress } = this.state;

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
                        <MyWallet walletBalance={walletBalance} clientWalletAddress={clientWalletAddress} />
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
