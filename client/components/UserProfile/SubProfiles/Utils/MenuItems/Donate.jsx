import React, { Component } from "react";

import axios from "axios";
import { connect } from "react-redux";
import {
    Button,
    Checkbox,
    Form,
    Icon,
    TextArea,
    Header,
    Accordion,
} from "semantic-ui-react";

import {
    DonorInformation,
    DonationDetails,
    TargetPopulation,
} from "./DonateFormItems";

import getExchangeRate from "./getExchangeRate";

class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndices: [],
            donorFirstName: props.user.firstName,
            donorLastName: props.user.lastName,
            donorGender: "",
            donorEmail: props.user.email,
            donorPhone: "",
            donorRace: "",
            donorFirstNameError: false,
            donorLastNameError: false,
            donorEmailError: false,
            donorPhoneError: false,
            detailEthTotal: 0,
            detailUSDTotal: 0,
            detailNumRecipients: "",
            message: "",
            exchangeRate: "",
            agreeToTerms: false,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        try {
            const price = await getExchangeRate();

            this.setState({
                exchangeRate: parseFloat(price),
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Handles Form Field Edits
    handleEdit(e, { name, value }) {
        // Remove commas to store number
        if (name === "detailUSDTotal") {
            value = parseFloat(value.replace(/,/g, "")) || 0;
        }

        // If the user checked agree to terms, change
        if (name === "agreeToTerms") {
            this.setState({
                agreeToTerms: !this.state.agreeToTerms,
            });
            // Else, update the value
        } else {
            this.setState(
                {
                    [name]: value,
                },
                () => {
                    const { exchangeRate } = this.state;
                    const convertToEth = parseFloat(value) * exchangeRate || 0;
                    // Update the Ethereum conversion if we updated donation amount
                    if (name === "detailUSDTotal") {
                        this.setState({
                            detailEthTotal: convertToEth,
                        });
                    }
                },
            );
        }
    }

    // Handles Accordion Clicks
    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndices } = this.state;

        let newIndices = activeIndices.includes(index)
            ? activeIndices.filter((el) => el !== index)
            : [...activeIndices, index];

        this.setState({ activeIndices: newIndices });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.table(this.state);
        console.log("SUBMITTED!");
    }

    render() {
        const {
            activeIndices,
            donorFirstName,
            donorLastName,
            donorGender,
            donorEmail,
            donorPhone,
            donorRace,
            detailUSDTotal,
            detailEthTotal,
            detailNumRecipients,
            message,
            agreeToTerms,
        } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Accordion>
                    <DonorInformation
                        active={activeIndices.includes(0)}
                        handleClick={this.handleClick}
                        handleEdit={this.handleEdit}
                        firstName={donorFirstName}
                        lastName={donorLastName}
                        gender={donorGender}
                        email={donorEmail}
                        phone={donorPhone}
                        race={donorRace}
                    />
                    <DonationDetails
                        active={activeIndices.includes(1)}
                        handleClick={this.handleClick}
                        handleEdit={this.handleEdit}
                        usd={detailUSDTotal}
                        eth={detailEthTotal}
                        numRecipients={detailNumRecipients}
                    />
                    <TargetPopulation
                        active={activeIndices.includes(2)}
                        handleClick={this.handleClick}
                        handleEdit={this.handleEdit}
                        message={message}
                        agreeToTerms={agreeToTerms}
                    />
                </Accordion>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(Donate);
