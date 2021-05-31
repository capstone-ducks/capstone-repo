import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { register } from '../../store/thunk';
import authenticate from "./Authenticate";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          isDonor: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
      e.preventDefault();
      try {
        await authenticate(this.state);
        await this.props.createUser(this.state);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    handleChange (e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }


    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input
                      fluid icon='user'
                      iconPosition='left'
                      placeholder='FirstName'
                    />
                    <Form.Input
                      fluid icon='user'
                      iconPosition='left'
                      placeholder='LastName'
                    />
                    <Form.Input
                      fluid icon='mail'
                      iconPosition='left'
                      placeholder='E-mail address'
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />

                    <Button color='teal' fluid size='large'>
                      Submit
                    </Button>
                  </Segment>
                </Form>
                {/* <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message> */}
              </Grid.Column>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatchEvent(register(user))
  }
}
export default connect(null, mapDispatchToProps)(SignUp);
