import React, { Component } from "react";

// React Router Imports
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

// Component Imports
import { Homepage } from "./Homepage";
import { AppHeader } from "./AppHeader";
import { SignIn, SignUp } from "./SignUp";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/sign-up" component={SignIn} />
                        <Route exact path="/sign-in" component={SignUp} />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
