import React from "react";
import { Form, Input, Icon, Header, Accordion } from "semantic-ui-react";

const DonationDetails = (props) => {
    const { active, handleClick, handleEdit, usd, eth, numRecipients } = props;
console.log('PROPS', props)
    return (
        <React.Fragment>
            <Accordion.Title active={active} index={1} onClick={handleClick}>
                <Header as="h4" id="donation-details-information-header">
                    <Icon name="dropdown" />
                    DONATION DETAILS
                </Header>
            </Accordion.Title>
            <Accordion.Content active={active}>
                <Form.Group widths="equal">
                    <Form.Field
                        value={parseFloat(usd).toLocaleString("en-US")}
                        name="detailUSDTotal"
                        control={Input}
                        label="$USD"
                        placeholder=""
                        onChange={handleEdit}
                    />
                    <Form.Field
                        value={
                            eth === 0
                                ? 0
                                : parseFloat(
                                      parseFloat(eth).toFixed(4),
                                  ).toLocaleString("en-US")
                        }
                        name="detailEthTotal"
                        control={Input}
                        label="ΞETH (estimate)"
                        placeholder=""
                        readOnly
                    />
                    <Form.Field
                        value={numRecipients}
                        name="detailNumRecipients"
                        control={Input}
                        label="Number of Recipients"
                        placeholder="Number of Recipients"
                        onChange={handleEdit}
                    />
                </Form.Group>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default DonationDetails;
