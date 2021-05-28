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
import { Link } from 'react-router-dom';
// import sign in action creator

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
     console.log('THIS', this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    const { email, password } = this.state;

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center"></Header>
                <Form size="large"
                  onSubmit={this.handleSubmit}
                >
                    <Segment stacked>
                        <Form.Input
                            onChange={this.handleChange}
                            // value={email}
                            name='email'
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail address"
                        />
                        <Form.Input
                            onChange={this.handleChange}
                            // value={password}
                            name='password'
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />

              <Form.Button
                // onClick={this.handleSubmit}
                color='teal'
                fluid size='large'>
                Login
              </Form.Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to={'/sign-up'}>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

// const mapStateToProps = () => {
//   return {

//   }
// }
export default SignInForm;
