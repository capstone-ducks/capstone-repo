import React from "react";
import {
    Form,
    Input,
    Icon,
    Header,
    Accordion,
    Dropdown,
    Segment,
    Divider,
} from "semantic-ui-react";

const DonationDetails = (props) => {
    const {
        active,
        handleClick,
        handleEdit,
        usd,
        eth,
        numRecipients,
        raceOptions,
        genderOptions,
        cityOptions,
        stateOptions,
    } = props;

    const genders = [
        { key: "Male", text: "Male", value: "Male" },
        { key: "Female", text: "Female", value: "Female" },
        { key: "Non-Binary", text: "Non-Binary", value: "Non-Binary" },
        { key: "Other", text: "Other", value: "Other" },
        { key: "Transgender", text: "Transgender", value: "Transgender" },
    ];

    const races = [
        {
            key: "americanIndian_alaskaNative",
            text: "American Indian or Alaska Native",
            value: "American Indian or Alaska Native",
        },
        { key: "asian", text: "Asian", value: "Asian" },
        {
            key: "black / african american",
            text: "Black/African American",
            value: "Black / African American",
        },
        {
            key: "hispanic_latino",
            text: "Hispanic/Latinx",
            value: "Hispanic or Latino",
        },
        { key: "multiracial", text: "Multiracial", value: "Multiracial" },
        {
            key: "Native Hawaiian or Other Pacific Islander",
            text: "Native Hawaiian/Other Pacific Islander",
            value: "Native Hawaiian or Other Pacific Islander",
        },
        { key: "Other", text: "Other", value: "Other" },
        { key: "white", text: "White", value: "White" },
    ];

    const cities = [
        { key: "akron", text: "Akron", value: "Akron" },
        { key: "bronx", text: "Bronx", value: "Bronx" },
        { key: "brooklyn", text: "Brooklyn", value: "Brooklyn" },
        { key: "queens", text: "Queens", value: "Queens" },
        { key: "los angeles", text: "Staten Island", value: "Los Angeles" },
        { key: "manhattan", text: "Manhattan", value: "Manhattan" },
        { key: "new york", text: "New York", value: "New York" },
        { key: "san diego", text: "San Diego", value: "San Diego" },
    ];

    const states = [
        { key: "ar", text: "AR", value: "AR" },
        { key: "az", text: "AZ", value: "AZ" },
        { key: "ca", text: "CA", value: "CA" },
        { key: "ct", text: "CT", value: "CT" },
        { key: "ma", text: "MA", value: "MA" },
        { key: "ny", text: "NY", value: "NY" },
        { key: "oh", text: "OH", value: "OH" },
    ];

    const employmentStatus = [
        { key: "employed", text: "Employed", value: "Employed" },
        { key: "unemployed", text: "Unemployed", value: "Unemployed" },
        { key: "student", text: "Student", value: "Student" },
        { key: "smallBusinessOwner", text: "Small Business Owner", value: "Small Business Owner" },
    ];

    const familyStatus = [
        { key: "single", text: "Single", value: "Single" },
        { key: "singleParent", text: "Single Parent", value: "Single Parent" },
        { key: "headOfHousehold", text: "Head of Household", value: "Head of Household" },
    ];

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
                        <Form.Field
                            value={numRecipients}
                            name="detailNumRecipients"
                            control={Input}
                            label="Number of Recipients"
                            placeholder="Number of Recipients"
                            onChange={handleEdit}
                        />
                    </Form.Group>
                    <br />
                    <Divider horizontal>
                        Target Recipient Information (Optional)
                    </Divider>
                    <Form.Group widths="equal">
                        <Form.Dropdown
                            label="Race"
                            name="raceOptions"
                            placeholder="Race"
                            fluid
                            multiple
                            selection
                            options={races}
                            onChange={handleEdit}
                        />
                        <Form.Dropdown
                            label="Gender"
                            name="genderOptions"
                            placeholder="Gender"
                            fluid
                            multiple
                            selection
                            options={genders}
                            onChange={handleEdit}
                        />
                        <Form.Dropdown
                            label="Family Status"
                            name="familyStatus" // delete?
                            placeholder="Family Status"
                            fluid
                            multiple
                            selection
                            options={familyStatus}
                            onChange={handleEdit}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Dropdown
                            label="City"
                            name="cityOptions"
                            placeholder="City"
                            fluid
                            multiple
                            selection
                            options={cities}
                            onChange={handleEdit}
                        />
                        <Form.Dropdown
                            label="State"
                            name="stateOptions"
                            placeholder="State"
                            fluid
                            multiple
                            selection
                            options={states}
                            onChange={handleEdit}
                        />
                        <Form.Dropdown
                            label="Employment Status"
                            name="employmentStatus" // delete?
                            placeholder="Employment Status"
                            fluid
                            multiple
                            selection
                            options={employmentStatus}
                            onChange={handleEdit}
                        />
                    </Form.Group>
                </Segment>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default DonationDetails;
