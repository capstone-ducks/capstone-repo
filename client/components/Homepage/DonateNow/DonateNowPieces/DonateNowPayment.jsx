import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import {
    Form,
    Image,
    Message,
    Icon,
    Input,
    Label,
    Header,
} from "semantic-ui-react";
import ethereumLogo from "../../../../../public/images/ethereum-logo.svg";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import DonationContract from "../../../../../build/contracts/DonationContract.json";

import getExchangeRate from "../../../UserProfile/SubProfiles/Utils/MenuItems/getExchangeRate";
import generateDonationId from "../../../../utils/generateDonationId";
import { createDonationThunk } from "../../../../store/thunk/donations";

import axios from "axios";
import ThankYouMessage from "../../../ThankYouMessage";
import { addUser } from "../../../../store/thunk";


class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
            clientWalletAddress: "",
            donationContract: "",
            receipt: {},
            loading: true,
            ethTotal: 0,
            usdTotal: 0,
        };

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.installMetaMask = this.installMetaMask.bind(this);
        this.getClientWalletAddress = this.getClientWalletAddress.bind(this);
        this.donate = this.donate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // On mount, see if MetaMask is installed. If it is, get wallet balance/information
    async componentDidMount() {
        try {
            const exchangeRate = await getExchangeRate();
            this.setState(
                {
                    exchangeRate: parseFloat(exchangeRate),
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
                        const networkData =
                            DonationContract.networks[networkId];

                        if (networkData) {
                            const donationContract = new web3.eth.Contract(
                                DonationContract.abi,
                                networkData.address,
                            );

                            this.setState({
                                metaMaskInstalled,
                                loading: false,
                                donationContract,
                                clientWalletAddress: clientAddress,
                                exchangeRate: parseFloat(
                                    await getExchangeRate(),
                                ),
                            });
                        }
                    } else {
                        this.setState({
                            loading: false,
                            metaMaskInstalled,
                        });
                    }
                },
            );
        } catch (err) {
            console.log(err);
        }
    }

    // Used to detect if a user installs MetaMask now. Not working yet.
    async componentDidUpdate(prevProps, prevState) {
        const metaMaskInstalled = this.isMetaMaskInstalled();

        // If metamask installation status changes
        if (!prevState.metaMaskInstalled && metaMaskInstalled) {
            // Gives Web3 Blockchain provider (MetaMask)
            window.web3 = new Web3(window.ethereum);
            const web3 = window.web3;

            // making dynamic network
            const networkId = await web3.eth.net.getId();
            const networkData = DonationContract.networks[networkId];

            if (networkData) {
                const donationContract = new web3.eth.Contract(
                    DonationContract.abi,
                    networkData.address,
                );

                if (this._isMounted) {
                    this.setState(
                        {
                            metaMaskInstalled,
                            donationContract,
                            clientWalletAddress,
                        },
                        async () => {
                            const clientWalletAddress =
                                await this.getClientWalletAddress();
                            this.setState({
                                clientWalletAddress,
                            });
                        },
                    );
                }
            } else {
                this.setState({
                    metaMaskInstalled,
                });
            }
        }
    }

    async getClientAddress() {
        const { ethereum } = window;
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });

        return accounts[0];
    }

    //Created check function to see if the MetaMask extension is installed
    isMetaMaskInstalled() {
        // Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        const metaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);

        return metaMaskInstalled;
    }

    // Sends user to MetaMask to install it
    installMetaMask() {
        // If metamask is installed, just connect
        if (this.isMetaMaskInstalled()) {
            this.setState(
                {
                    metaMaskInstalled: true,
                },
                async () => {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                },
            );
        } else {
            // We create a new MetaMask onboarding object to use in our app
            const forwarderOrigin = "http://localhost:4500";
            const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
            onboarding.startOnboarding();
        }
    }

    async getClientWalletAddress() {
        const { ethereum } = window;
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });

        return accounts[0];
    }

    // Handles the donation submission
    async handleSubmit() {
        await this.donate();
        window.setTimeout(function () {
            window.location.href = "/";
        }, 3000);
    }

    async handleChange(ev) {
        let value = ev.target.value;

        // Remove commas to store number
        if (ev.target.name === "usdTotal") {
            value = parseFloat(value.replace(/,/g, "")) || 0;
        }

        this.setState(
            {
                [ev.target.name]: value,
            },
            () => {
                const { exchangeRate } = this.state;

                // Update the Ethereum conversion if we updated donation amount
                if (ev.target.name === "usdTotal") {
                    this.setState({
                        ethTotal:
                            (parseFloat(value) * exchangeRate).toFixed(8) || 0,
                    });
                } else if (ev.target.name === "ethTotal") {
                    this.setState({
                        usdTotal: parseFloat(value) / exchangeRate || 0,
                    });
                }
            },
        );
    }

    async donate() {
        const amountEthToWei = await web3.utils.toHex(
            web3.utils.toWei(this.state.ethTotal.toString(), "ether"),
        );

        const { data } = await axios.post("api/users/recipients", {
            numRecipients: 10,
            races: [],
            genders: [],
            cities: [],
            states: [],
        });

        const { recipientIds, cryptoAddresses } = data;
        const donationId = await generateDonationId();

      await this.state.donationContract.methods
            .createDonation(
                donationId,
                cryptoAddresses,
                recipientIds.length, //numRecipient
            )
            .send({
                from: this.state.clientWalletAddress,
                value: amountEthToWei.toString(),
                gas: 6721975, // should match given gas limit from ganache
            })
            .then(async (receipt) => {
                const randomNumber = Math.floor(Math.random() * 9999999999) + 1;

                // Create anonymous user first
                await this.props.createUser({
                    firstName: "anonymous",
                    lastName: randomNumber.toString(),
                    email: `anonymous${randomNumber}@gmail.com`,
                    password: randomNumber.toString(),
                    city: "anonymous",
                    state: "anonymous",
                    checked: "isDonor",
                    clientWalletAddress: this.state.clientWalletAddress,
                });

                // Create donation object
                const donation = {
                    id: donationId,
                    donorId: this.props.lastCreatedUser.id,
                    amount: this.state.ethTotal, // NOTE this is not in Wei like when its sent to the contract
                    numRecipients: recipientIds.length,
                    transactionHash: receipt.transactionHash,
                    contractAddress: receipt.to,
                    recipientIds,
                };

                await this.props.createDonationThunk(donation);
                this.setState({
                    receipt: receipt,
                });
            })
            .catch((err) => {
                console.log("Donate function error ", err);
            });
    }

    render() {
        const {
            metaMaskInstalled,
            selectedCurrency,
            loading,
            receipt,
            usdTotal,
            ethTotal,
        } = this.state;

        if (loading) {
            return (
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon name="circle notched" loading size="huge" />
                </Form>
            );
        }

        // If meta mask is not installed, show this
        if (!metaMaskInstalled)
            return (
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Form.Button
                        style={{
                            backgroundColor: "#d76f63",
                            color: "white",
                            fontFamily: "lato",
                            fontWeight: 400,
                            fontSize: 14,
                            width: 350,
                            height: 60,
                            position: "relative",
                            right: -3,
                        }}
                        size="large"
                        onClick={this.installMetaMask}
                    >
                        Install MetaMask
                    </Form.Button>
                    <Message>
                        <Message.Header>
                            <Icon name="x" color="red" />
                            MetaMask Not Detected!
                        </Message.Header>
                        <p>
                            We rely on MetaMask to manage your wallet security.
                            We will never ask you for your private keys. Please
                            install MetaMask so we can access your ETH balance.
                        </p>
                    </Message>
                </Form>
            );

        // Otherwise, return this!
        return !receipt.status ? (
            <Form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Header as="h3">Payment</Header>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Input
                            labelPosition="left"
                            type="text"
                            placeholder="Amount"
                            value={parseFloat(usdTotal).toLocaleString("en-US")}
                            name="usdTotal"
                            onChange={this.handleChange}
                        >
                            <Label basic>$</Label>
                            <input />
                        </Input>
                    </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field readOnly>
                        <Input
                            labelPosition="left"
                            type="text"
                            placeholder="Amount"
                            value={
                                ethTotal === 0
                                    ? 0
                                    : ethTotal.toLocaleString("en-US")
                            }
                            name="ethTotal"
                            onChange={this.handleChange}
                        >
                            <Label basic>Ξ</Label>
                            <input />
                        </Input>
                    </Form.Field>
                </Form.Group>
                {/* <Form.Field
                        value={parseFloat(usdTotal).toLocaleString("en-US")}
                        name="usdTotal"
                        control={Input}
                        label="$USD"
                    /> */}
                {/* <Form.Field>
                        ΞETH (estimate)
                        <Input
                            readOnly
                            id="ethTotal"
                            name="ethTotal"
                            value={
                                ethTotal === 0
                                    ? 0
                                    : parseFloat(
                                          parseFloat(ethTotal).toFixed(4),
                                      ).toLocaleString("en-US")
                            }
                        />
                    </Form.Field> */}

                {/* <Image src={ethereumLogo} size="mini" />
                <Form.Group grouped>
                    <Form.Input
                        label="Amount"
                        placeholder="0.000"
                        size="huge"
                        name="detailEthTotal"
                        style={{ width: 100 }}
                        value={this.state.detailEthTotal}
                        onChange={this.handleChange}
                    />
                </Form.Group> */}
                <Form.Button
                    style={{
                        backgroundColor: "#2654ba",
                        color: "white",
                        fontFamily: "lato",
                        fontWeight: 400,
                        fontSize: 14,
                        width: 350,
                        height: 60,
                        position: "relative",
                        right: -3,
                    }}
                    size="large"
                    onClick={this.handleSubmit}
                >
                    Submit Donation
                </Form.Button>
                <Message>
                    <Message.Header>
                        <Icon name="checkmark" color="green" />
                        MetaMask Detected!
                    </Message.Header>
                    <p>
                        We rely on MetaMask to manage your wallet security. We
                        will never ask you for your private keys.
                    </p>
                </Message>
            </Form>
        ) : (
            <ThankYouMessage />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        lastCreatedUser: state.auth.lastCreatedUser,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createDonationThunk: (donation) =>
            dispatch(createDonationThunk(donation)),
        createUser: (newUser) => dispatch(addUser(newUser)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DonateNowPaymentForm);
