import React, { Component } from "react";
import { Button, Icon, Popup, Grid, Header } from 'semantic-ui-react';
import Web3 from "web3";

class MyWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletBalance: 0
        };
    }

    async componentDidMount() {
        window.web3 = new Web3(window.ethereum);
        const web3 = window.web3;
        let balance = await web3.eth.getBalance(this.props.cryptoAddress) / 1000000000000000000;

        this.setState({
            walletBalance: balance
        });
    }

    async componentDidUpdate(prevProps) {
        window.web3 = new Web3(window.ethereum);
        const web3 = window.web3;
        let balance = await web3.eth.getBalance(this.props.cryptoAddress) / 1000000000000000000;

        if (prevProps.walletBalance !== this.props.walletBalance) {
            this.setState({
                walletBalance: balance
            });
        }
    }

    render() {
        const {cryptoAddress} = this.props;
        const {walletBalance} = this.state;
        console.log(walletBalance, 'wallet balance');
        return (
            <div>
                <p>
                    Wallet Address: {cryptoAddress}
                </p>
                <p>
                    Wallet Balance: <Icon name='ethereum' /> {walletBalance}
                </p>
                <h3> 
                    Cash out your Ether through some of the below online retailers:
                </h3>
                <Popup position='bottom left' trigger={
                    <Button animated='vertical' size = 'massive' className="ui blue button">
                        <Button.Content hidden>Shop</Button.Content>
                        <Button.Content visible>
                            <Icon name='shopping basket' />
                        </Button.Content>
                    </Button>} flowing hoverable>
                    <Grid centered divided columns={3}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>OverStock.com</Header>
                            <p>
                            Shop for home goods using Eth
                            </p>
                            <Button className="ui pink button" href='https://www.overstock.com'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Autonomous.com</Header>
                            <p>
                            Shop for home and office decor
                            </p>
                            <Button className="ui pink button" href='https://www.autonomous.ai/'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Galaxus.com</Header>
                            <p>
                            Shop for your home and garden
                            </p>
                            <Button className="ui pink button" href='https://www.galaxus.ch/en'>Visit Site</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
                <Popup position='bottom left' trigger={
                    <Button animated='vertical' size = 'massive' className="ui blue button">
                        <Button.Content hidden>Tech</Button.Content>
                        <Button.Content visible>
                            <Icon name='laptop' />
                        </Button.Content>
                    </Button>} flowing hoverable>
                    <Grid centered divided columns={3}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>GipsyBee.com</Header>
                            <p>
                            Shop for electronics using Eth
                            </p>
                            <Button className="ui pink button" href='https://www.gipsybee.com/'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Direct Voltage.com</Header>
                            <p>
                            Shop for home engineering and DIY
                            </p>
                            <Button className="ui pink button" href='https://directvoltage.com/'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Purism.com</Header>
                            <p>
                            Securely shop for laptops and computers
                            </p>
                            <Button className="ui pink button" href='https://puri.sm/'>Visit Site</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
                <Popup position='bottom center' trigger={
                    <Button animated='vertical' size = 'massive' className="ui blue button">
                        <Button.Content hidden>Travel</Button.Content>
                        <Button.Content visible>
                            <Icon name='plane' />
                        </Button.Content>
                    </Button>} flowing hoverable>
                    <Grid centered divided columns={2}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Destinia.com</Header>
                            <p>
                            Shop for flights using Eth
                            </p>
                            <Button className="ui pink button" href='https://destinia.com/en/'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>CheapAir.com</Header>
                            <p>
                            Shop for flights and hotels using Eth
                            </p>
                            <Button className="ui pink button" href='https://www.cheapair.com/'>Visit Site</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
                <Popup position='bottom center' trigger={
                    <Button animated='vertical' size = 'massive' className="ui blue button">
                        <Button.Content hidden>Gift Card</Button.Content>
                        <Button.Content visible>
                            <Icon name='gift' />
                        </Button.Content>
                    </Button>} flowing hoverable>
                    <Grid centered divided columns={3}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>EGifter.com</Header>
                            <p>
                            Shop gift cards from Amazon, App Store, and Home Depot
                            </p>
                            <Button className="ui pink button" href='https://www.egifter.com/buy-gift-cards-with-ethereum'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Bidali.com</Header>
                            <p>
                            Use your metamask wallet to shop now for giftcards
                            </p>
                            <Button className="ui pink button" href='https://giftcards.bidali.com/'>Visit Site</Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'>Prepaidify.com</Header>
                            <p>
                            Shop from over 400 kinds of email-delivered gift cards using Eth
                            </p>
                            <Button className="ui pink button" href='https://prepaidify.com/'>Visit Site</Button>
                        </Grid.Column>
                    </Grid>
                </Popup>
            </div>
        );
    }
}

export default MyWallet;
