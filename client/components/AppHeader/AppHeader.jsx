import React, { Component } from "react";
import logo from "../../../public/images/logo-dark-letters.png";

// Style Imports
import "../../../public/assets/header.css";

// React Router Links
import { Link, NavLink } from "react-router-dom";

// Redux Imports
import { connect } from "react-redux";
import { logout } from "../../store/thunk";

// Component Imports
import { AreYouSure } from "../Utils";

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { loggedInUser, logoutUser } = this.props;

        return (
            <header id="app-header">
                <div id="header-home">
                    <NavLink to="/">
                        <img id="main-logo" src={logo} />
                    </NavLink>
                </div>
                <div id="header-links">
                    <NavLink to="/" className="header-link">
                        Home
                    </NavLink>
                    <NavLink to="/about-us" className="header-link">
                        About Us
                    </NavLink>
                    {!loggedInUser ? (
                        <React.Fragment>
                            <NavLink to="/sign-in" id="sign-in">
                                <p className="btn-text">Log In</p>
                            </NavLink>
                            <NavLink to="/sign-up" id="sign-up">
                                <p className="btn-text">Sign Up</p>
                            </NavLink>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <NavLink
                                to={`/user/${loggedInUser.id}`}
                                id="sign-in"
                            >
                                <p className="btn-text">Profile</p>
                            </NavLink>
                            <AreYouSure
                                trigger={
                                    <NavLink to="#" id="sign-up">
                                        <p className="btn-text">Sign Out</p>
                                    </NavLink>
                                }
                                message="Are you sure you want to sign out?"
                                callback={logoutUser}
                            />
                        </React.Fragment>
                    )}
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.auth.user,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logout()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
