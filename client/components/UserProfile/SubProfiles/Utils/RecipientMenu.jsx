import React, { Component } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import {
    Bio,
    MyWallet,
    UnclaimedDonations,
    RecipientHistory,
} from "./MenuItems";

class DonorMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: "My Wallet" };
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div>
                <Menu attached="top" tabular>
                    <Menu.Item
                        name="My Wallet"
                        active={activeItem === "My Wallet"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="Unclaimed"
                        active={activeItem === "Unclaimed"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="History"
                        active={activeItem === "History"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="Bio"
                        active={activeItem === "Bio"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Input
                                transparent
                                icon={{ name: "search", link: true }}
                                placeholder="Search transactions..."
                                onChange={() =>
                                    this.handleItemClick(event, {
                                        name: "History",
                                    })
                                }
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached="bottom">
                    {activeItem === "My Wallet" ? (
                        <MyWallet />
                    ) : activeItem === "Unclaimed" ? (
                        <UnclaimedDonations />
                    ) : activeItem === "History" ? (
                        <RecipientHistory />
                    ) : activeItem === "Bio" ? (
                        <Bio />
                    ) : (
                        ""
                    )}
                </Segment>
            </div>
        );
    }
}

export default DonorMenu;
