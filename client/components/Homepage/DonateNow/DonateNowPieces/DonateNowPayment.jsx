import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Image, Message, Icon } from "semantic-ui-react";
import ethereumLogo from "../../../../../public/images/ethereum-logo.svg";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import DonationContract from "../../../../../build/contracts/DonationContract.json";
import getExchangeRate from "../../../UserProfile/SubProfiles/Utils/MenuItems/getExchangeRate";
import generateDonationId from "../../../../utils/generateDonationId";
import { createDonationThunk } from "../../../../store/thunk/donations";
import ThankYouMessage from "../../../ThankYouMessage";
import { addUser } from "../../../../store/thunk";
import axios from "axios";

// TODO
// donor should input ethereum amount into form, that amount is sent to
// a recipient in the paymentsplitter contract: i.e. PaymentSplitter(["recipient ethereum address"], [1])

class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
            clientWalletAddress: "",
            donationContract: "",
            detailEthTotal: "",
            receipt:{},
            loading: true,
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
        // If metamask installation status changes
        if (prevState.metaMaskInstalled !== this.isMetaMaskInstalled()) {
            const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
            if (metaMaskInstalled) {
                const clientAddress = await this.getClientAddress();

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
                        this.setState({
                            metaMaskInstalled,
                            donationContract,
                            clientWalletAddress: clientAddress,
                        });
                    }
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
        console.log("SUBMIT DONATION!");
        await this.donate();
        if(this.state.receipt.status === true){
            alert('Thank you Anonymous user  for your generous donation! You truly make the difference for us, and we are extremely grateful!');
            window.location.href = '/';
        }
    }

    async handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value,
        });
    }

    async donate() {
        const amountEthToWei = await web3.utils.toHex(
            web3.utils.toWei(this.state.detailEthTotal.toString(), "ether"),
        );

        const { data } = await axios.post("api/users/recipients", {
            numRecipients: 1,
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
                1, // number of recipients
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
                    amount: this.state.detailEthTotal, // NOTE this is not in Wei like when its sent to the contract
                    numRecipients: 1,
                    transactionHash: receipt.transactionHash,
                    contractAddress: receipt.to,
                    recipientIds,
                };

                await this.props.createDonationThunk(donation);
                this.setState({
                    receipt: receipt
                })
            })
            .catch((err) => {
                console.log("Donate function error ", err);
            });
    }

    render() {
        const { metaMaskInstalled, selectedCurrency, loading } = this.state;

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
        return (
            <Form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Image src={ethereumLogo} size="mini" />
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
                </Form.Group>
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
