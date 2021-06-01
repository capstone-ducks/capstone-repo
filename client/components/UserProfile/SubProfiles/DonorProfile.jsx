import React, { Component } from "react";

class DonorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user } = this.props;
        return `Donor Profile for ${user.firstName} ${user.lastName}`;
    }
}

export default DonorProfile;
