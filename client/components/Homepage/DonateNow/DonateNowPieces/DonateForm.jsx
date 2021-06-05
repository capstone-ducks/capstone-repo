import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import * as Email from "email-validator";

class DonateNowForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            nameError: false,
            emailError: false,
            nameErrorMsg: "",
            emailErrorMsg: "",
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEdit(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email } = this.state;
        const { setStep } = this.props;

        const nameError = !name;

        const nameErrorMsg = nameError
            ? "Please type 'Anonymous' for anonymous donations."
            : "";

        const emailError = email === "" ? false : !Email.validate(email);
        const emailErrorMsg = emailError
            ? "Email invalid. Leave empty for anonymous donation."
            : "";

        if (!nameError && !emailError) {
            setStep(2);
        }

        this.setState({
            ...this.state,
            nameError,
            emailError,
            nameErrorMsg,
            emailErrorMsg,
        });
    }

    render() {
        const {
            name,
            email,
            nameError,
            emailError,
            nameErrorMsg,
            emailErrorMsg,
        } = this.state;

        return (
            <Form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "left",
                }}
            >
                {
                    // If error in name field
                    nameError ? (
                        <Form.Input
                            error={
                                nameError
                                    ? {
                                          content: nameErrorMsg,
                                          pointing: "above",
                                      }
                                    : ""
                            }
                            fluid
                            name="name"
                            label="Name"
                            placeholder="Name"
                            id="form-input-first-name"
                            onChange={this.handleEdit}
                            size="large"
                            style={{ width: 350 }}
                        />
                    ) : (
                        // If no error in name field
                        <Form.Input
                            fluid
                            name="name"
                            label="Name"
                            placeholder="Name"
                            id="form-input-first-name"
                            onChange={this.handleEdit}
                            size="large"
                            style={{ width: 350 }}
                        />
                    )
                }
                {
                    // If error in email field
                    emailError ? (
                        <Form.Input
                            error={
                                emailError
                                    ? {
                                          content: emailErrorMsg,
                                          pointing: "above",
                                      }
                                    : ""
                            }
                            fluid
                            name="email"
                            label="Email"
                            placeholder="Email"
                            id="form-input-email"
                            onChange={this.handleEdit}
                            size="large"
                            style={{ width: 350 }}
                        />
                    ) : (
                        // If no error in email field
                        <Form.Input
                            fluid
                            name="email"
                            label="Email"
                            placeholder="Email"
                            id="form-input-email"
                            onChange={this.handleEdit}
                            size="large"
                            style={{ width: 350 }}
                        />
                    )
                }

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
                    Continue to payment
                </Form.Button>
            </Form>
        );
    }
}

export default DonateNowForm;
