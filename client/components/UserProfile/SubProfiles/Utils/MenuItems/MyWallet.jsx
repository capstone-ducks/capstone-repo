import React, { Component } from "react";
import { Button, Icon } from 'semantic-ui-react';
class MyWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu = () => {
        console.log('clicked');
        //const linkdoc = document.getElementById('links');
        //console.log(linkdoc);

            document.getElementById('links').style.display = "block";
    };

    render() {
        const {walletBalance, clientWalletAddress} = this.props;
        console.log(walletBalance, 'wallet balance');
        return (
            <div>
                <p>
                    Wallet Address: {clientWalletAddress}
                </p>
                <p>
                    Wallet Balance: {walletBalance} <Icon name='ethereum' />
                </p>
                <h4>
                    Cash out your Ether through one of the below services:
                </h4>
                <Button animated='vertical' size = 'massive' className="ui blue button" 
                        href='https://www.gipsybee.com/'>
                    <Button.Content hidden>Tech</Button.Content>
                    <Button.Content visible>
                        <Icon name='laptop' />
                    </Button.Content>
                </Button>
                <Button animated='vertical' size = 'massive' className="ui blue button" href='https://www.travala.com/'>
                    <Button.Content hidden>Travel</Button.Content>
                    <Button.Content visible>
                        <Icon name='plane' />
                    </Button.Content>
                </Button>
                <Button animated='vertical' size = 'massive' className="ui blue button" href='https://www.egifter.com/buy-gift-cards-with-bitcoin'>
                    <Button.Content hidden>Gift Card</Button.Content>
                    <Button.Content visible>
                        <Icon name='gift' />
                    </Button.Content>
                </Button>
                <Button animated='vertical' size = 'massive' className="ui blue button" href='https://www.overstock.com/'>
                    <Button.Content hidden>Shop</Button.Content>
                    <Button.Content visible>
                        <Icon name='shopping basket' />
                    </Button.Content>
                </Button>
                <Button animated='vertical' size = 'massive' className="ui green button" onClick={this.showMenu}>
                    <Button.Content hidden>Shop</Button.Content>
                    <Button.Content visible>
                        <Icon name='drupal' />
                    </Button.Content>
                </Button>
                <div id='links' style="display:none;">
                    <ul >
                        <li><a href="#">cdn.sc.rockstargames.com</a></li>
                        <li><a href="#">lifeinvader.com</a></li>
                        <li><a href="#">rockstargames.com</a></li>
                        <li><a href="#">socialclub.rockstargames.com</a></li>
                    </ul>
                </div>
            </div>
        
        );
    }
}

export default MyWallet;
