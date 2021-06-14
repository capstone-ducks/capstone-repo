import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment,
    Divider,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { addUser, signIn } from "../../store/thunk";
import authenticate from "./authenticate";
import {
    genderOptions,
    raceOptions,
} from "../UserProfile/SubProfiles/Utils/MenuItems/DonateFormItems";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            firstNameError: false,
            lastName: "",
            lastNameError: false,
            gender: "",
            email: "",
            emailError: false,
            password: "",
            city: "",
            state: "",
            passwordError: false,
            confirmPassword: "",
            confirmPasswordError: false,
            passwordMatchError: false,
            formError: false,
            checked: "isDonor",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    handleSelect(e, { value }) {
        // console.log(value);
        this.setState({
            gender: value,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        let error = false;
        if (this.state.firstName === "") {
            this.setState({ firstNameError: true });
            error = true;
        } else {
            this.setState({ firstNameError: false });
        }

        if (this.state.lastName === "") {
            this.setState({ lastNameError: true });
            error = true;
        } else {
            this.setState({ lastNameError: false });
        }

        if (this.state.email === "") {
            this.setState({ emailError: true });
            error = true;
        } else {
            this.setState({ emailError: false });
        }
        if (this.state.password === "") {
            this.setState({ passwordError: true });
            error = true;
        } else {
            this.setState({ passwordError: false });
        }

        if (this.state.confirmPassword === "") {
            this.setState({ confirmPasswordError: true });
            error = true;
        } else {
            this.setState({ confirmPasswordError: false });
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ passwordMatchError: true });
            error = true;
        } else {
            this.setState({ passwordMatchError: false });
        }

        if (error) {
            this.setState({ formError: true });
            return;
        }
        this.setState({ formError: false });
        await this.props.createUser(this.state);
        const { email, password } = this.state;
        await authenticate({ email, password });
        await this.props.attemptLogIn();
        this.redirect();
    }

    redirect() {
        const { loggedInUser } = this.props;
        this.props.history.push(`/user/${loggedInUser.id}`);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleRadioChange(e, { value }) {
        this.setState({
            checked: value,
        });
    }

    async getClientAddress() {
        const { ethereum } = window;
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethereum.request({ method: "eth_accounts" });

        return accounts[0];
    }

    //Created check function to see if the MetaMask extension is installed
    isMetaMaskInstalled() {
        // Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window;
        const metaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);

        return metaMaskInstalled;
    }

    installMetaMask() {
        // We create a new MetaMask onboarding object to use in our app
        const forwarderOrigin = "http://localhost:4500";
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        onboarding.startOnboarding();
    }

    render() {
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="blue" textAlign="center">
                        Sign Up
                    </Header>
                    <Form
                        size="large"
                        onSubmit={this.handleSubmit}
                        error={this.state.formError}
                    >
                        <Segment>
                            <Divider horizontal>Personal Information</Divider>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="FirstName"
                                name="firstName"
                                onChange={this.handleChange}
                                value={this.state.firstName}
                                error={this.state.firstNameError}
                            />
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="LastName"
                                name="lastName"
                                onChange={this.handleChange}
                                value={this.state.lastName}
                                error={this.state.lastNameError}
                            />
                            <Form.Select
                                fluid
                                options={genderOptions}
                                placeholder="Gender"
                                name="gender"
                                onChange={this.handleSelect}
                                value={this.state.gender}
                            />
                            <Form.Input
                                fluid
                                icon="map marker alternate"
                                iconPosition="left"
                                placeholder="City"
                                name="city"
                                onChange={this.handleChange}
                                value={this.state.city}
                            />
                            <Form.Input
                                fluid
                                icon="map marker alternate"
                                iconPosition="left"
                                placeholder="State"
                                name="state"
                                onChange={this.handleChange}
                                value={this.state.state}
                            />
                            <Divider horizontal>Sign In Information</Divider>
                            <Form.Input
                                required
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="E-mail address"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                error={this.state.emailError}
                            />
                            <Form.Input
                                required
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                error={
                                    this.state.passwordError ||
                                    this.state.passwordMatchError
                                }
                            />
                            <Form.Input
                                required
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                onChange={this.handleChange}
                                value={this.state.confirmPassword}
                                error={
                                    this.state.confirmPasswordError ||
                                    this.state.passwordMatchError
                                }
                            />
                            {this.state.passwordMatchError ? (
                                <Message
                                    error
                                    content="passwords do not match"
                                />
                            ) : null}
                            <Divider horizontal>Connect Wallet</Divider>
                            <Segment placeholder>
                                <Grid columns={2} stackable>
                                    <Grid.Column>
                                        <Form.Input
                                            icon="user"
                                            iconPosition="left"
                                            label="Username"
                                            placeholder="Username"
                                        />
                                    </Grid.Column>
                                    <Grid.Column verticalAlign="middle">
                                        <Form.Button
                                            style={{
                                                backgroundColor: "#d76f63",
                                                color: "white",
                                                fontFamily: "lato",
                                                fontWeight: 400,
                                                fontSize: 14,
                                                width: 125,
                                                height: 60,
                                                position: "relative",
                                                right: -3,
                                                textAlign: "center",
                                            }}
                                            size="medium"
                                            onClick={this.installMetaMask}
                                        >
                                            Connect MetaMask
                                        </Form.Button>
                                    </Grid.Column>
                                </Grid>
                                <Divider vertical>Or</Divider>
                            </Segment>
                            <Divider />
                            <Form.Group inline>
                                <label>Type of User</label>
                                <Form.Radio
                                    label="Donor"
                                    value="isDonor"
                                    name="checked"
                                    checked={this.state.checked === "isDonor"}
                                    onChange={this.handleRadioChange}
                                />
                                <Form.Radio
                                    label="Recipient"
                                    value="isRecipient"
                                    name="checked"
                                    checked={
                                        this.state.checked === "isRecipient"
                                    }
                                    onChange={this.handleRadioChange}
                                />
                            </Form.Group>
                            <Button color="blue" fluid size="large">
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createUser: (user) => dispatch(addUser(user, { history })),
        attemptLogIn: () => dispatch(signIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
