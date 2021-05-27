import React, { Component } from "react";
import {
    Form,
    Input,
    TextArea,
    Button,
    Select,
    Checkbox,
    Image,
    Message,
    Icon,
} from "semantic-ui-react";
import ethereumLogo from "../../../../../public/images/ethereum-logo.svg";

class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
        };

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.installMetaMask = this.installMetaMask.bind(this);
    }

    async componentDidMount() {
        this.isMetaMaskInstalled();
    }

    //Created check function to see if the MetaMask extension is installed
    isMetaMaskInstalled() {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        const metaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);

        this.setState({
            metaMaskInstalled,
        });
    }

    installMetaMask() {
        console.log("INSTALL META MASK");
    }

    handleSubmit() {
        console.log("SUBMIT DONATION!");
    }

    render() {
        const { metaMaskInstalled, selectedCurrency } = this.state;
        console.log(metaMaskInstalled);

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
                        Submit Donation
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
