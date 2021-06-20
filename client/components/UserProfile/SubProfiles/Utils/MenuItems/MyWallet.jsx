import React, { Component } from "react";

class MyWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {walletBalance, clientWalletAddress} = this.props;
        console.log(walletBalance, 'wallet balance');
        return (
            <div>
                <p>
                    Wallet Address: {clientWalletAddress}
                </p>
                <p>
                    Ethereum Balance: {walletBalance}
                </p>
            </div>
        
        );
    }
}

export default MyWallet;
