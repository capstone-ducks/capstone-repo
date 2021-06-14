import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
    Select,
    Checkbox,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { addUser, signIn } from "../../store/thunk";
import authenticate from "./authenticate";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            checked: "isDonor",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        // console.log(this.props, "submit handle");
        // console.log(this.state, "submit handle");
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

    render() {
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center"></Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="FirstName"
                                name="firstName"
                                onChange={this.handleChange}
                                value={this.state.firstName}
                            />
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="LastName"
                                name="lastName"
                                onChange={this.handleChange}
                                value={this.state.lastName}
                            />
                            <Form.Input
                                required
                                fluid
                                icon="mail"
                                iconPosition="left"
                                placeholder="E-mail address"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
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
                            />
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
                            <Button color="teal" fluid size="large">
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
