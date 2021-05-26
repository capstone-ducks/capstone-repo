import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import donateImg from "../../../public/images/donate.png";
import receiveImg from "../../../public/images/receive.png";
import styled from "styled-components";

import "../../../public/assets/homepage.css";

const HomepagePanel = ({ donate }) => {
    const buttonStyle = {
        fontFamily: "sans-serif",
        color: "white",
        letterSpacing: "0.05em",
        fontWeight: "400",
        fontSize: "larger",
        lineHeight: "150%",
        padding: "1rem 3rem",
        borderRadius: "0.5rem",
    };

    return (
        <article className="h-panel">
            <div className="panel-inside-h">
                <div className="panel-img-cont">
                    <img
                        src={donate ? donateImg : receiveImg}
                        alt=""
                        className="panel-img"
                    />
                </div>
                <div className="panel-header">
                    <h3 className="panel-header-text">
                        {donate ? "Donate Crypto" : "Receive Crypto"}
                    </h3>
                    <p className="panel-subheader-text">
                        {donate
                            ? "Donate ETH directly to somebody in need."
                            : "Receive decentralized charitable donations."}
                    </p>
                </div>
                <div className="panel-btn-container">
                    <NavLink
                        to="#"
                        className={`panel-btn ${donate ? "blue-h" : "red-h"}`}
                        style={buttonStyle}
                    >
                        {donate ? "Donate Now" : "Get Started"}
                    </NavLink>
                </div>
            </div>
        </article>
    );
};

export default HomepagePanel;
