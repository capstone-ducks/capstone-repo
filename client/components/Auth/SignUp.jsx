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

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            firstNameError:false,
            lastName: "",
            lastNameError: false,
            gender:"",
            email: "",
            emailError: false,
            password: "",
            passwordError:false,
            confirmPassword: "",
            confirmPasswordError:false,
            passwordMatchError:false,
            formError:false,
            checked: "isDonor",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    handleSelect (e, {value}){
       // console.log(value);
        this.setState({
            gender: value,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        // console.log(this.props, "submit handle");
        // console.log(this.state, "submit handle");
        let error = false;
        if(this.state.firstName === ''){
            this.setState({firstNameError: true});
            error = true;
        } else{
            this.setState({firstNameError: false})
        }

        if(this.state.lastName === ''){
            this.setState({lastNameError: true});
            error = true;
        } else{
            this.setState({lastNameError: false})
        }

        if(this.state.email === ''){
            this.setState({emailError: true});
            error = true;
        } else{
            this.setState({emailError: false})
        }
        if(this.state.password=== ''){
            this.setState({passwordError: true});
            error = true;
        } else{
            this.setState({passwordError: false})
        }

        if(this.state.confirmPassword=== ''){
            this.setState({confirmPasswordError: true});
            error = true;
        } else{
            this.setState({confirmPasswordError: false})
        }
        if(this.state.password !== this.state.confirmPassword ){
            this.setState({passwordMatchError: true});
            error = true;
        } else{
            this.setState({passwordMatchError: false})
        }

        if(error){
            this.setState({formError:true})
            return
        }
        this.setState({formError : false});

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
        console.log(this.state, 'STATE')
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
                    <Form size="large" onSubmit={this.handleSubmit} error={this.state.formError}>
                        <Segment stacked>
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
                                options={options}
                                placeholder='Gender'
                                name="gender"
                                onChange={this.handleSelect}
                                value={this.state.gender}
                            />
                            <Form.Input
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
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                error={this.state.passwordError || this.state.passwordMatchError}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                onChange={this.handleChange}
                                value={this.state.confirmPassword}
                                error={this.state.confirmPasswordError || this.state.passwordMatchError}
                            />
                            {this.state.passwordMatchError
                            ?
                            <Message
                            error
                            content='passwords do not match'
                            />
                            :
                            null}
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
