import React, { Component } from "react";
import {
    Button,
    Checkbox,
    Form,
    Icon,
    TextArea,
    Header,
    Accordion,
} from "semantic-ui-react";

const SubmitDonation = (props) => {
    const { active, handleClick, handleEdit, message, agreeToTerms } = props;

    return (
        <React.Fragment>
            <Accordion.Title active={active} index={3} onClick={handleClick}>
                <Header as="h4" id="donation-target-information-header">
                    <Icon name="dropdown" />
                    SUBMIT DONATION
                </Header>
            </Accordion.Title>
            <Accordion.Content active={active}>
                <Form.Field
                    value={message}
                    name="message"
                    control={TextArea}
                    label="Message for Recipients"
                    placeholder="Tell us more about you..."
                    onChange={handleEdit}
                />
                <Form.Field
                    checked={agreeToTerms}
                    control={Checkbox}
                    required
                    name="agreeToTerms"
                    label="I agree to the Terms and Conditions"
                    onChange={handleEdit}
                />
                <Form.Field control={Button}>Submit</Form.Field>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default SubmitDonation;
