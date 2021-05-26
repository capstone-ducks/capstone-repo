import React, { Component } from "react";
import "../../../public/assets/homepage.css";
// import mainImg from "../../../public/images/charity-img.png";
import mainImg from "../../../public/images/multicultural.png";
import HomepagePanel from "./HomepagePanel.jsx";
import { Link, NavLink } from "react-router-dom";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="homepage-container">
                <section className="homepage-init-cont">
                    <div className="main-item-cont">
                        <div className="main-text-cont">
                            <div className="homepage-text">
                                <div className="homepage-header">
                                    <h1>
                                        Send crypto directly,{" "}
                                        <span className="highlighted-blue">
                                            to those who need it most.
                                        </span>
                                    </h1>
                                </div>
                                <div className="homepage-subheader">
                                    <p className="subheader-text">
                                        <span className="highlighted-bold">
                                            Donate with trust, give without
                                            hassle,
                                        </span>{" "}
                                        and{" "}
                                        <span className="highlighted-bold">
                                            make a difference with confidence.
                                        </span>{" "}
                                        TheGoodBlock's platform gives you a way
                                        to reach out directly where it matters
                                        most.
                                    </p>
                                </div>
                            </div>
                            <div className="homepage-btn">
                                <NavLink to="/sign-in" id="donate-button">
                                    Donate Now
                                </NavLink>
                            </div>
                        </div>
                        <div className="main-img-cont">
                            <img src={mainImg} alt="" id="main-img" />
                        </div>
                    </div>
                </section>
                <section className="two-panel-container">
                    <div className="h-header-cont">
                        <h2 className="sub-header-h">
                            Whether you wish to donate or receive, we can help.
                        </h2>
                    </div>
                    <div className="h-panel-cont">
                        <HomepagePanel donate={true} />
                        <HomepagePanel donate={false} />
                    </div>
                </section>
            </div>
        );
    }
}

export default Homepage;
