import React from "react";
import { Form, Input, Icon, Header, Accordion, Dropdown, Segment, Divider } from "semantic-ui-react";

const DonationDetails = (props) => {
    const { active, handleClick, handleEdit, usd, eth, numRecipients, recipientOptions } = props;

    const genderOptions = [
        { key: 'random', text: 'Random', value: 'random' },
        { key: 'gender', text: 'Male', value: 'male'},
        { key: 'female', text: 'Female', value: 'female' },
        { key: 'transgender', text: 'Transgender', value: 'transgender' },
        { key: 'nonbinary', text: 'Non-Binary', value: 'nonbinary' },
    ];

    const raceOptions = [
        { key: 'random', text: 'Random', value: 'random' },
        { key: 'white', text: 'White', value: 'white' },
        { key: 'black_africanAmerican', text: 'Black/African American', value: 'black_africanAmerican' },
        { key: 'hispanic_latino', text: 'Hispanic/Latinx', value: 'hispanic_latino' },
        { key: 'asian', text: 'Asian', value: 'asian' },
        { key: 'americanIndian_alaskaNative', text: 'American Indian/Alaska Native', value: 'americanIndian_alaskaNative' },
        { key: 'nativeHawaiian_pacificIslander', text: 'Native Hawaiian/Other Pacific Islander', value: 'nativeHawaiian_pacificIslander' },
    ];

    const cityOptions = [
        { key: 'brooklyn', text: 'Brooklyn', value: 'brooklyn' },
        { key: 'queens', text: 'Queens', value: 'queens' },
        { key: 'bronx', text: 'Bronx', value: 'bronx' },
        { key: 'manhattan', text: 'Manhattan', value: 'manhattan' },
        { key: 'statenIsland', text: 'Staten Island', value: 'statenIsland' },
    ];

    const stateOptions = [
        { key: 'ny', text: 'NY', value: 'ny' },
        { key: 'ca', text: 'CA', value: 'ca' },
        { key: 'az', text: 'AZ', value: 'az' },
        { key: 'ar', text: 'AR', value: 'ar' },
        { key: 'ma', text: 'MA', value: 'ma' },
    ];
      console.log(genderOptions);
      console.log(raceOptions);
    return (
        <React.Fragment>
            <Accordion.Title active={active} index={1} onClick={handleClick}>
                <Header as="h4" id="donation-details-information-header">
                    <Icon name="dropdown" />
                    DONATION DETAILS
                </Header>
            </Accordion.Title>
            <Accordion.Content active={active}>
            <Segment>
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
                   </Form.Group>
                        <Divider horizontal>Recipient Information</Divider>
                        <Form.Group widths="equal">
                        <Form.Field
                            value={numRecipients}
                            name="detailNumRecipients"
                            control={Input}
                            label="Number of Recipients"
                            placeholder="Number of Recipients"
                            onChange={handleEdit}
                        />
                        </Form.Group>
                        <Form.Group widths="equal">
                        <Form.Dropdown 
                            label="Race" 
                            name="recipientOptions" 
                            placeholder='Race' 
                            fluid multiple selection options={raceOptions} 
                            onChange={handleEdit} 
                        />
                         <Form.Dropdown 
                            label="Gender" 
                            name="recipientOptions" 
                            placeholder='Gender' 
                            fluid multiple selection options={genderOptions} 
                            onChange={handleEdit} 
                        />
                        <Form.Dropdown 
                            label="City" 
                            name="recipientOptions" 
                            placeholder='City' 
                            fluid multiple selection options={cityOptions} 
                            onChange={handleEdit} 
                        />
                        <Form.Dropdown 
                            label="State" 
                            name="recipientOptions" 
                            placeholder='City' 
                            fluid multiple selection options={stateOptions} 
                            onChange={handleEdit} 
                        />
                </Form.Group>
                </Segment>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default DonationDetails;
