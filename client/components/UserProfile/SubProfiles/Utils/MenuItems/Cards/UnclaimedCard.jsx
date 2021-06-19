import React, { Component } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import MetaMaskOnboarding from "@metamask/onboarding";
import Web3 from "web3";
import DonationContract from "../../../../../../../build/contracts/DonationContract.json";
import { updateDonationThunk } from '../../../../../../store/thunk/donations';
import axios from 'axios';

class UnclaimedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.isMetaMaskInstalled = this.isMetaMaskInstalled.bind(this);
        this.installMetaMask = this.installMetaMask.bind(this);
        this.getClientAddress = this.getClientAddress.bind(this);
        //this.handleApprove = this.handleApprove.bind(this)
        this.clickApprove = this.clickApprove.bind(this);
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

    // async handleApprove(ev){
    //     console.log(this.props, 'handleApprove')
    //     ev.target.disabled = true;
    //     ev.target.innerHTML = 'Donation already claimed!';
    //     console.log(ev, 'ev in handleApprove')
    //    // await this.clickApprove( donationId)
    // }

    async clickApprove(ev, donationId) {
         console.log(donationId)
        // console.log(ev)
        const { data } = await axios.get(`api/donations/${donationId}`);
        console.log(data, 'Donation to update');

        const metaMaskInstalled = this.isMetaMaskInstalled(); // Confirms MetaMask Installation
        if (metaMaskInstalled) {
            const clientAddress = await this.getClientAddress();

            // Gives Web3 Blockchain provider (MetaMask)
            window.web3 = new Web3(window.ethereum);
            const web3 = window.web3;
            let accounts = await web3.eth.getAccounts();
            // making dynamic network
            const networkId = await web3.eth.net.getId();
            const networkData = DonationContract.networks[networkId];

            if (networkData) {
                const donationContract = new web3.eth.Contract(
                    DonationContract.abi,
                    networkData.address,
                );

                await donationContract.methods
                    .claimDonation(donationId, clientAddress)
                    .send({
                        from: clientAddress,
                    })
                    .on('confirmation', function(confirmationNumber, receipt){
                        console.log(confirmationNumber);
                    })
                    .on('receipt', function(receipt){
                    console.log(receipt);
                })
                .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                    console.log(error);
                });
                await this.props.updateDonationThunk(donationToUpdate)
                ev.target.disabled = true;
                ev.target.innerHTML = 'Donation already claimed!';
            }
        } else {
            this.installMetaMask();
        }
    }

    render() {
        const { donations } = this.props;
        //console.log(this.props, 'UnclaimedCard')
        return (
            <div>
                {!donations.length ? (
                    <div>No donations to claim at this time</div>
                ) : (
                    donations.map((donation) => {
                        if (!donation.users[0].donationsRecipients.isClaimed) {
                            const { donationId, amountOwed } =
                                donation.users[0].donationsRecipients;
                                const {contractAddress} = donation;
                            return (
                                <Card key={donation.id}>
                                    <Card.Content>
                                        <Image
                                            floated="right"
                                            size="mini"
                                            src="/images/ethereum-logo.svg"
                                        />
                                        <Card.Header>
                                            You have an unclaimed donation of{" "}
                                            {
                                                donation.users[0]
                                                    .donationsRecipients
                                                    .amountOwed
                                            }{" "}
                                            ETH
                                        </Card.Header>
                                        <Card.Meta>
                                            {donation.createdAt}
                                        </Card.Meta>{" "}
                                        {/*  reformat createdAt data */}
                                        <Card.Description>
                                            User {donation.donor.firstName}{" "}
                                            {donation.donor.lastName[0]}.{" "}
                                            {donation.donor.city
                                                ? `from ${donation.donor.city}` : ''}
                                            has sent you a donation. Click
                                            approve to{" "}
                                            <strong>
                                                claim your donation funds
                                            </strong>
                                            .
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <div>
                                            <Button
                                                basic
                                                color="green"
                                                onClick={(ev) =>{
                                                    this.clickApprove(ev, donationId)
                                                }}
                                            >
                                                Approve
                                            </Button>
                                        </div>
                                    </Card.Content>
                                </Card>
                            );
                        }
                    })
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateDonationThunk: (donation) => dispatch(updateDonationThunk(donation))
    }
}

export default connect(null, mapDispatchToProps)(UnclaimedCard);
