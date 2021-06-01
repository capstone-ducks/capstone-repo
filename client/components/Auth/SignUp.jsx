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
        console.log('STATE', this.state)
        await this.props.createUser({...this.state});
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
      console.log('THIS.STATE', this.state)
      console.log('THIS.PROPS', this.props)

        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                </Header>
                <Form
                  size='large'
                  onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input
                      name='firstName'
                      fluid icon='user'
                      iconPosition='left'
                      placeholder='FirstName'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='lastName'
                      fluid icon='user'
                      iconPosition='left'
                      placeholder='LastName'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='email'
                      fluid icon='mail'
                      iconPosition='left'
                      placeholder='E-mail address'
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      name='password'
                      fluid icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={this.handleChange}
                    />

                    <Button color='teal' fluid size='large'>
                      Submit
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  Already have an account with us? <Link to='/sign-in'>Sign In</Link>
                </Message>
              </Grid.Column>
            </Grid>
        )
    }
};

const mapStateToProps = (state) => {
  return {
      user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(register(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
