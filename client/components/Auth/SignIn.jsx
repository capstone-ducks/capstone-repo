import React, { Component } from "react";
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import authenticate from "./Authenticate";
import { signIn } from "../../store/thunk";
import { connect } from "react-redux";
// import sign in action creator

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        await authenticate({ email, password });
        await this.props.attemptLogIn();
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    redirect() {
        const { loggedInUser } = this.props;
        this.props.history.push(`/user/${loggedInUser.id}`);
    }

    render() {
        const { email, password } = this.state;
        const { loggedInUser } = this.props;

        return (
            <Grid
                textAlign="center"
                style={{ height: "65vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    {/* If a user is not signed in, present the sign-in page */}
                    {!loggedInUser ? (
                        <React.Fragment>
                            <Header as="h2" color="blue" textAlign="center">
                                Sign In
                            </Header>
                            <Form size="large" onSubmit={this.handleSubmit}>
                                <Segment>
                                    <Form.Input
                                        onChange={this.handleChange}
                                        // value={email}
                                        name="email"
                                        fluid
                                        icon="user"
                                        iconPosition="left"
                                        placeholder="E-mail address"
                                    />
                                    <Form.Input
                                        onChange={this.handleChange}
                                        // value={password}
                                        name="password"
                                        fluid
                                        icon="lock"
                                        iconPosition="left"
                                        placeholder="Password"
                                        type="password"
                                    />

                                    <Form.Button
                                        // onClick={this.handleSubmit}
                                        color="blue"
                                        fluid
                                        size="large"
                                    >
                                        Login
                                    </Form.Button>
                                </Segment>
                            </Form>
                            <Message>
                                New to us? <Link to={"/sign-up"}>Sign Up</Link>
                            </Message>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Header as="h2" color="blue" textAlign="center">
                                Welcome
                            </Header>
                            <Form size="large" onSubmit={this.redirect}>
                                <Segment padded>Sign in successful</Segment>
                                <Form.Button color="blue" fluid size="large">
                                    Go to Profile
                                </Form.Button>
                            </Form>
                        </React.Fragment>
                    )}
                </Grid.Column>
            </Grid>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogIn: () => dispatch(signIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
