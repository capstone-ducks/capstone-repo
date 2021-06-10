import React, { Component } from "react";
import { Form, Image, Message, Icon } from "semantic-ui-react";
import ethereumLogo from "../../../../../public/images/ethereum-logo.svg";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import PaymentSplitter from '../../../../../build/contracts/PaymentSplitter.json';

// TODO
// donor should input ethereum amount into form, that amount is sent to
// a recipient in the paymentsplitter contract: i.e. PaymentSplitter(["recipient ethereum address"], [1])

class DonateNowPaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metaMaskInstalled: false,
            clientWalletAddress: "",
            amount:''
        };

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.installMetaMask = this.installMetaMask.bind(this);
        this.getClientWalletAddress = this.getClientWalletAddress.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.deploy = this.deploy.bind(this);
        this.deployWithContract =this.deployWithContract.bind(this)
    }

    // On mount, see if MetaMask is installed. If it is, get wallet balance/information
    async componentDidMount() {
        const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
        if (metaMaskInstalled) {
            const clientWalletAddress = await this.getClientWalletAddress();
            //console.log(clientWalletAddress);

            // Gives Web3 Blockchain provider (MetaMask)
            window.web3 = new Web3(window.ethereum);
            const web3 = window.web3;
            // console.log(window, "WINDOW")
            // console.log(web3, 'WEB3')
            // making dynamic network
            const networkId = await web3.eth.net.getId();
            const networkData = PaymentSplitter.networks[networkId];
            if (networkData) {
                // const paymentContract = new web3.eth.Contract(PaymentSplitter.abi, networkData.address);
                // // console.log('PAYMENT CONTRACT', paymentContract)
                // const accounts= await web3.eth.getAccounts();
                // // console.log(accounts, 'Acounts!!')
                
                this.setState({
                    metaMaskInstalled,
                    clientWalletAddress,
                    web3,
                    //paymentContract
                });
            }
            else {
                window.alert('PaymentSplitter contract not deployed to detect network');
            }
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

    //handle the amount
    handleChange (e){
        // console.log(this.state, ' handleChange')
        // web3.eth.getBalance('0x6Af05d983CA88e36C4104ad1393370Ee5f747474').then( 
        //     console.log)
        //const value = e.target.value;
        this.setState({
            [e.target.name]: e.target.value,
        });

    }

    async deploy () {
        console.log( "DEPLOY");
        // private key and public address are defined for signing the transaction 
        const account_from ={
            privateKey: '9c87afba274275b24c1fb01a07e2f0323bb62a7e5aff7855d093e0e98de331db',
            address: '0x6Af05d983CA88e36C4104ad1393370Ee5f747474'
        }
        const addressTo = '0x8ff02E79132FE6290245411029326346f8275D12'

        /* 
           -- CREATE AND DEPLOY TRANSACTION --
        */
        console.log(`Attempting to send transaction from  ${account_from.address} to ${addressTo}`);

        //Sign Tx with PK
        //transaction needs to be sign with the private key. It returns a promise that needs to be resolved
        const createTransaction = await this.state.web3.eth.accounts.signTransaction(
            {
                gas:21000,
                to: addressTo,
                value: web3.utils.toHex(web3.utils.toWei(this.state.amount, 'ether'))
            },
            account_from.privateKey
        )
        //createTransaction contains v-r-s values
        console.log(createTransaction)

        //Send Tx and wait for the receipt
        // the transaction is signed and now you can send it providing the signed transaction located in createTransaction.rawTransaction
        const createReceipt = await this.state.web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        )
        console.log(createReceipt, 'RECEIPT')
        console.log(
            `Transaction successful with hash  : ${createTransaction.transactionHash}`
        )
    }

    async deployWithContract(){
        console.log( "DEPLOY WITH CONTRACT");
        console.log(this.state, 'state in deploy with contract')
        // private key and public address are defined for signing the transaction 
        const account_from ={
            privateKey: '9c87afba274275b24c1fb01a07e2f0323bb62a7e5aff7855d093e0e98de331db',
            address: this.state.clientWalletAddress
            //'0x6Af05d983CA88e36C4104ad1393370Ee5f747474'
        }
        //const addressTo = '0x8ff02E79132FE6290245411029326346f8275D12'

        /* 
           -- CREATE AND DEPLOY TRANSACTION --
        */
        console.log(`Attempting to deploy from  ${account_from.address} `);

        // create contract instance
        const paymentContract = new web3.eth.Contract(PaymentSplitter.abi);
        // console.log(PaymentSplitter.bytecode)
        
        //create constructor Tx
        const paymentTx = paymentContract.deploy({
            data: PaymentSplitter.bytecode,
            arguments:[['0x8ff02E79132FE6290245411029326346f8275D12', '0x13Cc87cFac54845F6116DAE2977735DB257784fF',
            '0x4ca80D32eCCd405D93a22093A7a528091Fe000Be'],['1', '1', '2']],
        })
        console.log(paymentTx , "HOHOHOHOHOO")

           // Sign Transaction and Send
        const createTransaction = await this.state.web3.eth.accounts.signTransaction(
            {
            data: paymentTx.encodeABI(),
            gas: await paymentTx.estimateGas()
            },
            account_from.privateKey
        );
        console.log(createTransaction, "CREATE TRANSACTION")
        // const sendTransaction = await this.state.web3.eth.sendTransaction({
        //     from: '0x6Af05d983CA88e36C4104ad1393370Ee5f747474',
        //     to: "0x8ff02E79132FE6290245411029326346f8275D12",
        //     value: web3.utils.toHex(web3.utils.toWei(this.state.amount, 'ether')),
        //     gas: await paymentTx.estimateGas()
        // }).then(function(receipt){
        //     console.log(receipt)
        // })
        // Send Tx and Wait for Receipt
        const createReceipt = await this.state.web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
        );
        console.log(createReceipt, 'RECEIPT')
        console.log(
            `Contract deployed at address: ${createReceipt.contractAddress}`
        );
            // Variables
        const contractAddress = createReceipt.contractAddress;

        /*
        -- Call Function --
        */
        // Create Contract Instance
        const payment = new this.state.web3.eth.Contract(PaymentSplitter.abi, contractAddress);

        const get = async () => {
        console.log(`Making a call to contract at address: ${contractAddress}`);

        // Call Contract
        const data = await payment.methods.totalReleased().call();
        const share = await payment.methods.shares("0x4ca80D32eCCd405D93a22093A7a528091Fe000Be").call();
        const payee = await payment.methods.payee(1).call()
        // const release = await payment.methods.release("0x4ca80D32eCCd405D93a22093A7a528091Fe000Be").call();
        // console.log(`The release is ${release}`)

        console.log(`the amount of shares held by the account is: ${share}`);
        console.log(`the address of the payee number is: ${payee}`);

        console.log(`the total amount of Ether already released is: ${data}`);
        };
        
        get();
    }

    // Handles the donation submission
    async handleSubmit() {
        console.log(this.state , "SUBMIT DONATION!");
        // const transactionParameters = {
        //     nonce: "0x00", // ignored by MetaMask
        //     gasPrice: "0x5208", // customizable by user during MetaMask confirmation.
        //     gas: "0x5208", // customizable by user during MetaMask confirmation.
        //     to: "0x4717cF101876c2c19c2520E9F138385edC18493e", // Required except during contract publications.
        //     from: ethereum.selectedAddress, // must match user's active address.
        //     value: "0x0004", // Only required to send ether to the recipient from the initiating external account.
        //     //data:
        //     //'0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
        //     chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        // };

        // // txHash is a hex string
        // // As with any RPC call, it may throw an error
        // const txHash = await ethereum.request({
        //     method: "eth_sendTransaction",
        //     params: [transactionParameters],
        // });
        // const recipient = '0x6Af05d983CA88e36C4104ad1393370Ee5f747474';
        //  const accounts = await web3.eth.getAccounts();
        // //Convert eth to wei since we are using web3 v 1.3.x
        // const amountEthToWei = web3.utils.toHex(web3.utils.toWei(this.state.amount, 'ether'));

        // this.state.web3.eth.sendTransaction ({to:recipient, from: accounts[0], value: amountEthToWei});
       //this.deploy() // createTransaction manually
        this.deployWithContract()
    }

    render() {
        const { metaMaskInstalled, selectedCurrency } = this.state;
       // console.log(this.state, ' in return ')

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
                        name="amount"
                        size="huge"
                        style={{ width: 100 }}
                        onChange = {this.handleChange}
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
