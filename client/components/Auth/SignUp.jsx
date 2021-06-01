import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Select ,Checkbox} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {addUser} from '../../store/thunk'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName : '',
          lastName :'',
          email :'',
          password : '',
         //isDonor: true
          // confirmPassword:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e) {
      e.preventDefault();
      console.log(this.props , 'submit handle')
      console.log(this.state , 'submit handle')
      this.props.createUser(this.state);
    }

    handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value,
      });
    }

    render() {
      console.log(this.state)
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                </Header>
                <Form size='large' onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='FirstName' name="firstName" onChange= {this.handleChange}
                    value ={this.state.firstName}/>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='LastName' name="lastName" onChange= {this.handleChange} value ={this.state.lastName}/>
                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' name="email" onChange= {this.handleChange} value ={this.state.email}/>
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      name="password"
                      onChange = {this.handleChange}
                      value ={this.state.password}
                    />
                    <Button color='teal' fluid size='large'>
                      Submit
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
        )
    }
}

// const mapStateToProps = ( state ) => ({
//     loggedInUser: state.auth.user,
// });

const mapDispatchToProps = (dispatch, {history}) => {
  return {
    createUser: (user) => dispatch(addUser(user, {history}))
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
