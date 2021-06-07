import React, { Component } from "react";
import { SetUpWalletModal } from "./Utils";
import { NavLink } from "react-router-dom";
import { SidePanel, MainPanel } from "./Utils";

class RecipientProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        return (
            <div id="profile-screen">
                <SidePanel />
                <MainPanel user={user} />
            </div>
            // <SetUpWalletModal
            //     trigger={
            //         <NavLink to="#" id="donate-button">
            //             Setup Wallet
            //         </NavLink>
            //     }
            // />
        );
    }
}

export default RecipientProfile;
