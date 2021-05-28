import React, { Component } from "react";
import {connect} from 'react-redux';
import{fetchUser} from '../store/thunk/index';

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import { Homepage } from "./Homepage";
import { AppHeader } from "./AppHeader";
import { SignInForm, SignUp } from "./SignUp";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount(){
        const user = await this.props.loginUser(1);
        console.log(user)
    }
    render() {
        return (
            <React.Fragment>
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/sign-in" component={SignInForm} />
                        <Route exact path="/sign-up" component={SignUp} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) =>{
    return state;
}
const mapDispatchToProps = (dispatch) =>{
    return{
        loginUser: (id) => dispatch(fetchUser(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
