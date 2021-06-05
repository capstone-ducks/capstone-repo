import React, { Component } from "react";

import axios from "axios";
import { connect } from "react-redux";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Header,
} from "semantic-ui-react";

const genderOptions = [
    { key: "m", text: "Male", value: "male" },
    { key: "f", text: "Female", value: "female" },
    { key: "t", text: "Transgender", value: "transgender" },
    { key: "n", text: "Non-Binary", value: "nonbinary" },
    { key: "o", text: "Other", value: "other" },
    { key: "x", text: "Prefer Not to Answer", value: "x" },
];
const raceOptions = [
    { key: "w", text: "White", value: "white" },
    { key: "b", text: "Black / African American", value: "black" },
    { key: "h", text: "Hispanic or Latino", value: "hispanic" },
    { key: "a", text: "Asian", value: "asian" },
    { key: "i", text: "American Indian or Alaska Native", value: "indigenous" },
    {
        key: "p",
        text: "Native Hawaiian or Other Pacific Islander",
        value: "pacific",
    },
    { key: "m", text: "Multiracial", value: "multiracial" },
    { key: "x", text: "Prefer Not to Answer", value: "x" },
];

class Donate extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    async componentDidMount() {
        try {
            const {
                ticker: { price },
            } = (
                await axios.get(
                    "https://api.cryptonator.com/api/ticker/usd-eth",
                )
            ).data;

            this.setState({
                exchangeRate: parseFloat(price),
            });
        } catch (err) {
            console.log(err);
        }
    }

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
                    // Update the Ethereum conversion if we updated donation amount
                    if (name === "detailUSDTotal") {
                        const { exchangeRate } = this.state;
                        const convertToEth =
                            parseFloat(value) * exchangeRate || 0;

                        this.setState({
                            detailEthTotal: convertToEth,
                        });
                    }
                },
            );
        }
    }

    render() {
        const { state } = this;

        return (
            <Form>
                <Header as="h4" id="basic-information-header">
                    DONOR INFORMATION
                </Header>
                <Form.Group widths="equal">
                    <Form.Field
                        value={state.donorFirstName}
                        name="donorFirstName"
                        control={Input}
                        label="First name"
                        placeholder="First name"
                        onChange={this.handleEdit}
                    />
                    <Form.Field
                        value={state.donorLastName}
                        name="donorLastName"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                        onChange={this.handleEdit}
                    />
                    <Form.Field
                        value={state.donorGender}
                        name="donorGender"
                        control={Select}
                        label="Gender"
                        options={genderOptions}
                        placeholder="Gender"
                        onChange={this.handleEdit}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field
                        value={state.donorEmail}
                        name="donorEmail"
                        control={Input}
                        label="Email"
                        placeholder="Email"
                        onChange={this.handleEdit}
                    />
                    <Form.Field
                        value={state.donorPhone}
                        name="donorPhone"
                        control={Input}
                        label="Phone"
                        placeholder="Phone"
                        onChange={this.handleEdit}
                    />
                    <Form.Field
                        value={state.donorRace}
                        name="donorRace"
                        control={Select}
                        label="Race/Ethnicity"
                        options={raceOptions}
                        placeholder="Race/Ethnicity"
                        onChange={this.handleEdit}
                    />
                </Form.Group>
                <Header as="h4" id="donation-details-information-header">
                    DONATION DETAILS
                </Header>
                <Form.Group widths="equal">
                    <Form.Field
                        value={parseFloat(state.detailUSDTotal).toLocaleString(
                            "en-US",
                        )}
                        name="detailUSDTotal"
                        control={Input}
                        label="$USD"
                        placeholder=""
                        onChange={this.handleEdit}
                    />
                    <Form.Field
                        value={
                            state.detailEthTotal === 0
                                ? 0
                                : parseFloat(
                                      parseFloat(state.detailEthTotal).toFixed(
                                          4,
                                      ),
                                  ).toLocaleString("en-US")
                        }
                        name="detailEthTotal"
                        control={Input}
                        label="ΞETH (estimate)"
                        placeholder=""
                        readOnly
                    />
                    <Form.Field
                        value={state.detailNumRecipients}
                        name="detailNumRecipients"
                        control={Input}
                        label="Number of Recipients"
                        placeholder="Number of Recipients"
                        onChange={this.handleEdit}
                    />
                </Form.Group>
                <Header as="h4" id="donation-target-information-header">
                    TARGET POPULATION
                </Header>
                <Form.Field
                    value={state.message}
                    name="message"
                    control={TextArea}
                    label="Message for Recipients"
                    placeholder="Tell us more about you..."
                    onChange={this.handleEdit}
                />
                <Form.Field
                    checked={state.agreeToTerms}
                    control={Checkbox}
                    name="agreeToTerms"
                    label="I agree to the Terms and Conditions"
                    onChange={this.handleEdit}
                />
                <Form.Field control={Button}>Submit</Form.Field>
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
