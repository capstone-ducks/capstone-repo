import React, { Component } from "react";
import { SidePanel, MainPanel } from "./Utils";
import "../../../../public/assets/userProfile.css";

class DonorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        return (
            <div id="profile-screen">
                <SidePanel user={user}/>
                <MainPanel user={user} />
            </div>
        );
    }
}

export default DonorProfile;
