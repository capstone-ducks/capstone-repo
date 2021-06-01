import React, { Component } from "react";
import { SetUpWalletModal } from "./Utils";
import { NavLink } from "react-router-dom";

class RecipientProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SetUpWalletModal
                trigger={
                    <NavLink to="#" id="donate-button">
                        Setup Wallet
                    </NavLink>
                }
            />
        );
    }
}

export default RecipientProfile;
