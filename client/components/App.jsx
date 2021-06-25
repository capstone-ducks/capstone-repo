import React, { Component } from "react";
import Web3 from "web3";
import { connect } from "react-redux";
import { signIn } from "../store/thunk/index";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import { Homepage } from "./Homepage";
import { AppHeader } from "./AppHeader";
import { SignInForm, SignUp } from "./Auth";
import { UserProfile } from "./UserProfile";
import AboutUs from "./AboutUs/AboutUs.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        // Attempts a log in automatically if user has a token on page refresh
        const token = window.localStorage.getItem("token");
        if (token) {
            await this.props.attemptLogin();
        }
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
                        <Route path="/user/:id" component={UserProfile} />
                        <Route path="/about-us" component={AboutUs} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: () => dispatch(signIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
