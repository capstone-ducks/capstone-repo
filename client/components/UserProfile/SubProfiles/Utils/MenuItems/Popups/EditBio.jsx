import React, { Component } from "react";
import {
    Button,
    Header,
    Image,
    Modal,
    Input,
    Select,
    Form
} from "semantic-ui-react";
import nanPic from "../../../../../../../public/images/profile-pictures/nan.png";
import matthewPic from "../../../../../../../public/images/profile-pictures/matthew.png";
import { connect } from "react-redux";
import { genderOptions, raceOptions } from "../DonateFormItems";
import { updateExistingUser } from "../../../../../../store/thunk";

class EditBio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            gender: props.user.gender || "",
            email: props.user.email || "",
            phone: props.user.phone || "",
            race: props.user.race || "",
            city: props.user.city || "",
            state: props.user.state || "",
            isDonor: props.user.isDonor
        };

        this.setOpen = this.setOpen.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setOpen(bool) {
        this.setState({ open: bool });
    }

    handleEdit(e, { name, value }) {
        this.setState({ [name]: value });
    }

    async handleSubmit() {
        const { firstName, lastName, gender, email, phone, race , city, state} = this.state;
        const { id } = this.props.user;

        // Payload object to update user
        const payload = {
            data: { firstName, lastName, gender, email, phone, race, city, state },
            id,
        };

        await this.props.updateUser(payload);

        this.setOpen(false);
    }

    render() {
        const { firstName, lastName, gender, email, phone, race, open, city, state, isDonor} =
            this.state;
        
        const phoneError = phone.length <= 9;
        return (
            <Modal
                onClose={() => this.setOpen(false)}
                onOpen={() => this.setOpen(true)}
                open={open}
                trigger={this.props.trigger}
            >
                <Modal.Header>Edit Information</Modal.Header>
                <Modal.Content image>
                    <Image size="medium" src={isDonor ? nanPic : matthewPic} wrapped />
                    <Modal.Description>
                        <Header>Personal Information</Header>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Field
                                    value={firstName}
                                    name="firstName"
                                    control={Input}
                                    label="First name"
                                    placeholder="First name"
                                    onChange={this.handleEdit}
                                />
                                <Form.Field
                                    value={lastName}
                                    name="lastName"
                                    control={Input}
                                    label="Last name"
                                    placeholder="Last name"
                                    onChange={this.handleEdit}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field
                                    value={gender}
                                    name="gender"
                                    control={Select}
                                    label="Gender"
                                    options={genderOptions}
                                    placeholder="Gender"
                                    onChange={this.handleEdit}
                                />
                                <Form.Field
                                    value={race}
                                    name="race"
                                    control={Select}
                                    label="Race/Ethnicity"
                                    options={raceOptions}
                                    placeholder="Race/Ethnicity"
                                    onChange={this.handleEdit}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field
                                    value={email}
                                    name="email"
                                    control={Input}
                                    label="Email"
                                    placeholder="Email"
                                    onChange={this.handleEdit}
                                />
                                <Form.Field
                                    value={phone}
                                    error={phoneError ? {content :'Enter a valid phone number'} : null}
                                    name="phone"
                                    control={Input}
                                    label="Phone"
                                    placeholder="Phone"
                                    onChange={this.handleEdit}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field
                                    value={city}
                                    name="city"
                                    control={Input}
                                    label="City"
                                    placeholder="City"
                                    onChange={this.handleEdit}
                                />
                                <Form.Field
                                    value={state}
                                    name="state"
                                    control={Input}
                                    label="State"
                                    placeholder="State"
                                    onChange={this.handleEdit}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => this.setOpen(false)}>
                        Nope
                    </Button>
                    <Button
                        content="Save Changes"
                        labelPosition="right"
                        icon="checkmark"
                        onClick={() => this.handleSubmit()}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: ({ data, id }) =>
            dispatch(updateExistingUser({ data, id })),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBio);
