import React from "react";
import { Form, Input, Icon, Header, Accordion, Dropdown, Segment, Divider } from "semantic-ui-react";

const DonationDetails = (props) => {
    const { active, handleClick, handleEdit, usd, eth, numRecipients, raceOptions, genderOptions, cityOptions, stateOptions } = props;

    const genders = [
        { key: 'gender', text: 'Male', value: 'male'},
        { key: 'female', text: 'Female', value: 'female' },
        { key: 'transgender', text: 'Transgender', value: 'transgender' },
        { key: 'nonbinary', text: 'Non-Binary', value: 'nonbinary' },
    ];

    const races = [
        { key: 'white', text: 'White', value: 'white' },
        { key: 'black_africanAmerican', text: 'Black/African American', value: 'black_africanAmerican' },
        { key: 'hispanic_latino', text: 'Hispanic/Latinx', value: 'hispanic_latino' },
        { key: 'asian', text: 'Asian', value: 'asian' },
        { key: 'americanIndian_alaskaNative', text: 'American Indian/Alaska Native', value: 'americanIndian_alaskaNative' },
        { key: 'nativeHawaiian_pacificIslander', text: 'Native Hawaiian/Other Pacific Islander', value: 'nativeHawaiian_pacificIslander' },
    ];

    const cities = [
        { key: 'brooklyn', text: 'Brooklyn', value: 'brooklyn' },
        { key: 'queens', text: 'Queens', value: 'queens' },
        { key: 'bronx', text: 'Bronx', value: 'bronx' },
        { key: 'manhattan', text: 'Manhattan', value: 'manhattan' },
        { key: 'statenIsland', text: 'Staten Island', value: 'statenIsland' },
    ];

    const states= [
        { key: 'ny', text: 'NY', value: 'ny' },
        { key: 'ca', text: 'CA', value: 'ca' },
        { key: 'az', text: 'AZ', value: 'az' },
        { key: 'ar', text: 'AR', value: 'ar' },
        { key: 'ma', text: 'MA', value: 'ma' },
    ];

    console.log(genderOptions, 'genders');
    console.log(raceOptions, 'races');
    console.log(cityOptions, 'cities');
    console.log(stateOptions, 'states');
    
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
                            name="raceOptions" 
                            placeholder='Race' 
                            fluid multiple selection options={races} 
                            onChange={handleEdit} 
                        />
                         <Form.Dropdown 
                            label="Gender" 
                            name="genderOptions" 
                            placeholder='Gender' 
                            fluid multiple selection options={genders} 
                            onChange={handleEdit} 
                        />
                        <Form.Dropdown 
                            label="City" 
                            name="cityOptions" 
                            placeholder='City' 
                            fluid multiple selection options={cities} 
                            onChange={handleEdit} 
                        />
                        <Form.Dropdown 
                            label="State" 
                            name="stateOptions" 
                            placeholder='State' 
                            fluid multiple selection options={states} 
                            onChange={handleEdit} 
                        />
                </Form.Group>
                </Segment>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default DonationDetails;
