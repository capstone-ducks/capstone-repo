import React, { Component } from "react";
import { Form, Image, Message, Icon } from "semantic-ui-react";
import ethereumLogo from "../../../../../public/images/ethereum-logo.svg";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
// import PaymentSplitter from '../../../../../build/contracts/PaymentSplitter.json';

// TODO
// donor should input ethereum amount into form, that amount is sent to
// a recipient in the paymentsplitter contract: i.e. PaymentSplitter(["recipient ethereum address"], [1])

class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
            clientWalletAddress: "",
        };

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.installMetaMask = this.installMetaMask.bind(this);
        this.getClientWalletAddress = this.getClientWalletAddress.bind(this);
    }

    // On mount, see if MetaMask is installed. If it is, get wallet balance/information
    async componentDidMount() {
        const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
        if (metaMaskInstalled) {
            const clientWalletAddress = await this.getClientWalletAddress();
            console.log(clientWalletAddress);

            // Gives Web3 Blockchain provider (MetaMask)
            window.web3 = new Web3(window.ethereum);
            const web3 = window.web3;
            // making dynamic network
            const networkId = await web3.eth.net.getId();
            // const networkData = PaymentSplitter.networks[networkId];
            // if (networkData) {
            //     const paymentContract = new web3.eth.Contract(PaymentSplitter.abi, networkData.address);
            //     console.log('PAYMENT CONTRACT', paymentContract)
            //     this.setState({
            //         metaMaskInstalled,
            //         clientWalletAddress,
            //     });
            // }
            // else {
            //     window.alert('PaymentSplitter contract not deployed to detect network');
            // }
        }
    }

    // Used to detect if a user installs MetaMask now. Not working yet.
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

    // Handles the donation submission
    async handleSubmit() {
        console.log("SUBMIT DONATION!");
        const transactionParameters = {
            nonce: "0x00", // ignored by MetaMask
            gasPrice: "0x5208", // customizable by user during MetaMask confirmation.
            gas: "0x5208", // customizable by user during MetaMask confirmation.
            to: "0x4717cF101876c2c19c2520E9F138385edC18493e", // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: "0x0004", // Only required to send ether to the recipient from the initiating external account.
            //data:
            //'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
            chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
    }

    render() {
        const { metaMaskInstalled, selectedCurrency } = this.state;

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
                        style={{ width: 100 }}
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

export default DonateNowPaymentForm;
