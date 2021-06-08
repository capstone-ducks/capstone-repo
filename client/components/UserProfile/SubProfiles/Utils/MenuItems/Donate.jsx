import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Accordion } from "semantic-ui-react";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import PaymentSplitter from "../../../../../../build/contracts/PaymentSplitter.json";

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
            donorGender: "",
            donorEmail: props.user.email,
            donorPhone: "",
            donorRace: "",
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
            paymentContract: '',
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.donate = this.donate.bind(this);
    }

    async componentDidMount() {
        try {
            const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
            if (metaMaskInstalled) {
                const clientWalletAddress = await this.getClientWalletAddress();
                // console.log(clientWalletAddress);

                // Gives Web3 Blockchain provider (MetaMask)
                window.web3 = new Web3(window.ethereum);
                const web3 = window.web3;
                // making dynamic network
                const networkId = await web3.eth.net.getId();
                const networkData = PaymentSplitter.networks[networkId];
                if (networkData) {
                    const paymentContract = new web3.eth.Contract(PaymentSplitter.abi, networkData.address);
                    // console.log('PAYMENT CONTRACT', paymentContract)
                    this.setState({
                        metaMaskInstalled,
                        paymentContract,
                        clientWalletAddress,
                        exchangeRate: parseFloat(await getExchangeRate()),
                    });
                }
                else {
                    this.setState({
                        exchangeRate: parseFloat(await getExchangeRate()),
                    })
                    window.alert('PaymentSplitter contract not deployed to detect network');
                }
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

    async getClientWalletAddress() {
        const { ethereum } = window;
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });

        return accounts[0];
    }
// detailEthTotal, detailNumRecipients
    donate() {
        const amountEthToWei = web3.utils.toHex(web3.utils.toWei(this.state.detailEthTotal.toString(), 'ether'));
        // console.log(amountEthToWei)
        console.log('DONATE FUNC', this.state.paymentContract.methods.release('0xf74C90a70f6657e77d9Ef950ebF3449A8b3136C4')
        .send({
            from: '0x94870794165E1267727c45Bb17358463d876DE6E',
            value: amountEthToWei.toString(),
            gas: 21999
        }).then(function(receipt){
            // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            console.log(receipt)
        })
        )
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

    handleSubmit(e) {
        e.preventDefault();
        this.donate();
        console.table(this.state);
        console.log("SUBMITTED!");
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
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
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
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(Donate);
