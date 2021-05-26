import React, { Component } from "react";
import logo from "../../../public/images/logo-dark-letters.png";

// React Router Links
import { Link, NavLink } from "react-router-dom";

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Scrolling behavior
    componentDidMount() {
        window.onscroll = () => {
            // Fighting the bug...
            // If you are within 5px of the top, we will trigger the animation immediately
            if (document.documentElement.scrollTop < 2) {
                document.getElementById("app-header").style.padding = "3.3vh";
                document.getElementById("app-header").style.boxShadow =
                    "0px -12px 9px 5px rgba(0, 0, 0, 0)";
                document.getElementById("app-header").style.transition = ".2s";
            } else {
                setTimeout(() => {
                    if (document.documentElement.scrollTop > 2) {
                        document.getElementById("app-header").style.padding =
                            "0vh";
                        document.getElementById("app-header").style.boxShadow =
                            "0px -5px 9px 5px rgba(0, 0, 0, 0.75)";
                        document.getElementById("app-header").style.transition =
                            ".2s";
                    }
                    // There's a weird bug if you sit around 50 px, so this
                    // gives user x milliseconds of buffer before it happens.
                    // it also delays our animation though so we can't go too crazy
                }, 100);
            }
        };
    }

    render() {
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
                    <NavLink to="/sign-in" id="sign-in">
                        Log In
                    </NavLink>
                    <NavLink to="/sign-up" id="sign-up">
                        Sign Up
                    </NavLink>
                </div>
            </header>
            // <Sticky>
            //     <Menu borderless size="large" pointing secondary>
            //         <Container>
            //             <Menu.Item as="a" name="Image" position="left">
            //                 <Image src={logo} size="tiny" id="main-logo" />
            //             </Menu.Item>
            //             <Menu.Item
            //                 as="a"
            //                 href="/#/"
            //                 name="Home"
            //                 active={activeItem === "Home"}
            //                 onClick={this.handleItemClick}
            //             >
            //                 Home
            //             </Menu.Item>
            //             <Menu.Item position="right">
            //                 <Button as="a" href="/#/sign-in">
            //                     Log in
            //                 </Button>
            //                 <Button
            //                     as="a"
            //                     href="/#/sign-up"
            //                     style={{ marginLeft: "0.5em" }}
            //                 >
            //                     Sign Up
            //                 </Button>
            //             </Menu.Item>
            //         </Container>
            //     </Menu>
            // </Sticky>
        );
    }
}

export default AppHeader;
