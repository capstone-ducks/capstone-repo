import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Accordion } from "semantic-ui-react";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import axios from "axios";
import DonationContract from "../../../../../../build/contracts/DonationContract.json";
import generateDonationId from "../../../../../utils/generateDonationId";
import { createDonationThunk } from "../../../../../store/thunk/donations";

import {
    DonorInformation,
    DonationDetails,
    TargetPopulation,
} from "./DonateFormItems";

import getExchangeRate from "./getExchangeRate";

class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndices: [],
            donorFirstName: props.user.firstName,
            donorLastName: props.user.lastName,
            donorGender: props.user.gender || "",
            donorEmail: props.user.email || "",
            donorPhone: props.user.phone || "",
            donorRace: props.user.race || "",
            donorFirstNameError: false,
            donorLastNameError: false,
            donorEmailError: false,
            donorPhoneError: false,
            detailEthTotal: 0,
            detailUSDTotal: 0,
            detailNumRecipients: "",
            message: "",
            exchangeRate: "",
            agreeToTerms: false,
            metaMaskInstalled: false,
            clientWalletAddress: "",
            donationContract: "",
        };
        this._isMounted = false;
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.donate = this.donate.bind(this);
    }

    async componentDidMount() {
        try {
            this._isMounted = true;
            const exchangeRate = await getExchangeRate();
            if (this._isMounted) {
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

                                if (this._isMounted) {
                                    this.setState({
                                        metaMaskInstalled,
                                        donationContract,
                                        clientWalletAddress: clientAddress,
                                        exchangeRate: parseFloat(
                                            await getExchangeRate(),
                                        ),
                                    });
                                }
                            }
                        }
                    },
                );
            }
        } catch (err) {
            console.log(err);
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.metaMaskInstalled !== this.state.metaMaskInstalled) {
            console.log("USER CONNECTED TO METAMASK");
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    // detailEthTotal, detailNumRecipients
    async donate() {
        const amountEthToWei = await web3.utils.toHex(
            web3.utils.toWei(this.state.detailEthTotal.toString(), "ether"),
        );
        const { data } = await axios.post("api/users/recipients", {
            numRecipients: this.state.detailNumRecipients,
            gender: "Female",
        });

        const { recipientIds, cryptoAddresses } = data;

        const donationId = await generateDonationId();
        await this.state.donationContract.methods
            .createDonation(
                donationId,
                cryptoAddresses,
                Number(this.state.detailNumRecipients),
            )
            .send({
                from: this.state.clientWalletAddress,
                value: amountEthToWei.toString(),
                gas: 6721975, // should match given gas limit from ganache
            })
            .then(async (receipt) => {
                const donation = {
                    id: donationId,
                    donorId: this.props.user.id,
                    amount: this.state.detailEthTotal, // NOTE this is not in Wei like when its sent to the contract
                    numRecipients: Number(this.state.detailNumRecipients),
                    transactionHash: receipt.transactionHash,
                    contractAddress: receipt.to,
                    recipientIds,
                };
                await this.props.createDonationThunk(donation);
                console.log("Successful Donation", receipt);
            })
            .catch((err) => {
                console.log("Donate function error ", err);
            });
    }

    // Handles Form Field Edits
    handleEdit(e, { name, value }) {
        // Remove commas to store number
        if (name === "detailUSDTotal") {
            value = parseFloat(value.replace(/,/g, "")) || 0;
        }

        // If the user checked agree to terms, change
        if (name === "agreeToTerms") {
            this.setState({
                agreeToTerms: !this.state.agreeToTerms,
            });
            // Else, update the value
        } else {
            this.setState(
                {
                    [name]: value,
                },
                () => {
                    const { exchangeRate } = this.state;
                    const convertToEth = parseFloat(value) * exchangeRate || 0;

                    // Update the Ethereum conversion if we updated donation amount
                    if (name === "detailUSDTotal") {
                        this.setState({
                            detailEthTotal: convertToEth,
                        });
                    }
                },
            );
        }
    }

    // Handles Accordion Clicks
    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndices } = this.state;

        let newIndices = activeIndices.includes(index)
            ? activeIndices.filter((el) => el !== index)
            : [...activeIndices, index];

        this.setState({ activeIndices: newIndices });
    };

    async handleSubmit(e) {
        e.preventDefault();
        await this.donate();
        // console.table(this.state);
        // console.log("SUBMITTED!");
    }

    render() {
        const {
            activeIndices,
            donorFirstName,
            donorLastName,
            donorGender,
            donorEmail,
            donorPhone,
            donorRace,
            detailUSDTotal,
            detailEthTotal,
            detailNumRecipients,
            message,
            agreeToTerms,
            metaMaskInstalled,
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                {metaMaskInstalled ? (
                    <Accordion>
                        <DonorInformation
                            active={activeIndices.includes(0)}
                            handleClick={this.handleClick}
                            handleEdit={this.handleEdit}
                            firstName={donorFirstName}
                            lastName={donorLastName}
                            gender={donorGender}
                            email={donorEmail}
                            phone={donorPhone}
                            race={donorRace}
                        />
                        <DonationDetails
                            active={activeIndices.includes(1)}
                            handleClick={this.handleClick}
                            handleEdit={this.handleEdit}
                            usd={detailUSDTotal}
                            eth={detailEthTotal}
                            numRecipients={detailNumRecipients}
                        />
                        <TargetPopulation
                            active={activeIndices.includes(2)}
                            handleClick={this.handleClick}
                            handleEdit={this.handleEdit}
                            message={message}
                            agreeToTerms={agreeToTerms}
                        />
                    </Accordion>
                ) : (
                    <Form.Button
                        style={{
                            backgroundColor: "#d76f63",
                            color: "white",
                            fontFamily: "lato",
                            fontWeight: 400,
                            fontSize: 14,
                            width: 125,
                            height: 60,
                            position: "relative",
                            right: -3,
                            textAlign: "center",
                        }}
                        size="medium"
                        onClick={(e) => {
                            e.preventDefault();
                            this.installMetaMask();
                        }}
                    >
                        Connect MetaMask
                    </Form.Button>
                )}
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createDonationThunk: (donation) =>
            dispatch(createDonationThunk(donation)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate);
