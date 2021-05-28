import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='FirstName' />
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='LastName' />
                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' />
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

export default SignUp;
