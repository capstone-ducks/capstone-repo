import React, { Component } from "react";
import { genderOptions, raceOptions } from "./genderRaceOptions";
import {
    Form,
    Input,
    Icon,
    Select,
    Header,
    Accordion,
} from "semantic-ui-react";

const DonorInformation = (props) => {
    const {
        active,
        handleEdit,
        handleClick,
        firstName,
        lastName,
        gender,
        email,
        phone,
        race,
    } = props;

    return (
        <React.Fragment>
            <Accordion.Title active={active} index={0} onClick={handleClick}>
                <Header as="h4" id="basic-information-header">
                    <Icon name="dropdown" />
                    DONOR INFORMATION
                </Header>
            </Accordion.Title>
            <Accordion.Content active={active}>
                <Form.Group widths="equal">
                    <Form.Field
                        value={firstName}
                        name="donorFirstName"
                        control={Input}
                        label="First name"
                        placeholder="First name"
                        onChange={handleEdit}
                    />
                    <Form.Field
                        value={lastName}
                        name="donorLastName"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                        onChange={handleEdit}
                    />
                    <Form.Field
                        value={gender}
                        name="donorGender"
                        control={Select}
                        label="Gender"
                        options={genderOptions}
                        placeholder="Gender"
                        onChange={handleEdit}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field
                        value={email}
                        name="donorEmail"
                        control={Input}
                        label="Email"
                        placeholder="Email"
                        onChange={handleEdit}
                    />
                    <Form.Field
                        value={phone}
                        name="donorPhone"
                        control={Input}
                        label="Phone"
                        placeholder="Phone"
                        onChange={handleEdit}
                    />
                    <Form.Field
                        value={race}
                        name="donorRace"
                        control={Select}
                        label="Race/Ethnicity"
                        options={raceOptions}
                        placeholder="Race/Ethnicity"
                        onChange={handleEdit}
                    />
                </Form.Group>
            </Accordion.Content>
        </React.Fragment>
    );
};

export default DonorInformation;
