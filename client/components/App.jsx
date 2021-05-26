import React, { Component } from "react";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import { Homepage } from "./Homepage";
import { SignInForm, SignUp } from "./SignUp";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <main>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path="/sign-in" component={SignInForm} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
