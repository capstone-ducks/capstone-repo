import React, { Component } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import { Bio, Donate, DonateHistory } from "./MenuItems";

class DonorMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: "donate" };
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
                        name="donate"
                        active={activeItem === "donate"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="history"
                        active={activeItem === "history"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name="bio"
                        active={activeItem === "bio"}
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
                                        name: "history",
                                    })
                                }
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment attached="bottom">
                    {activeItem === "donate" ? (
                        <Donate />
                    ) : activeItem === "history" ? (
                        <DonateHistory />
                    ) : activeItem === "bio" ? (
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
