import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";

class DonateAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: -1,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <Accordion>
                <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                >
                    <Icon name="dropdown" />
                    Who will receive your donation?
                </Accordion.Title>
                <Accordion.Content
                    active={activeIndex === 0}
                    style={{ fontSize: 11, color: "#383838" }}
                >
                    <p>
                        Your donation will be evenly split among 10 of TheGoodBlock's registered recipients
                    </p>
                </Accordion.Content>
                <Accordion.Title
                    active={activeIndex === 1}
                    index={0}
                    onClick={this.handleClick}
                >
                    <Icon name="dropdown" />
                    Why do we need your name?
                </Accordion.Title>
                <Accordion.Content
                    active={activeIndex === 0}
                    style={{ fontSize: 11, color: "#383838" }}
                >
                    <p>
                        Your name is just used to share with the recipient of
                        your donation! It is a nice reminder of the humanity of
                        peer-to-peer giving. Of course, any donation can be
                        anonymous. Just type "Anonymous" instead of your name.
                    </p>
                </Accordion.Content>

                <Accordion.Title
                    active={activeIndex === 2}
                    index={1}
                    onClick={this.handleClick}
                >
                    <Icon name="dropdown" />
                    Why do we need your email?
                </Accordion.Title>
                <Accordion.Content
                    active={activeIndex === 1}
                    style={{ fontSize: 11, color: "#383838" }}
                >
                    <p>
                        We do not share your email with your recipient. Your
                        email is used to receive confirmation that your donation
                        was processed for tax purposes. You can always choose to
                        leave your email private by not typing it.
                    </p>
                </Accordion.Content>
            </Accordion>
        );
    }
}

export default DonateAccordion;
