import React, { Component } from "react";

class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
        };

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
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

    render() {
        const { metaMaskInstalled } = this.state;
        return "";
    }
}

export default DonateNowPaymentForm;
