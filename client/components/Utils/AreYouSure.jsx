import React, { Component } from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

const AreYouSure = ({ trigger, message, callback }) => {
    const [open, setOpen] = React.useState(false);

    const takeAction = () => {
        callback();
        setOpen(false);
    };

    return (
        <Modal
            closeIcon
            onClose={() => closeModal()}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
            size="mini"
        >
            <Header icon="warning circle" content="Action Confirmation" />
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={() => setOpen(false)}>
                    <Icon name="remove" /> No
                </Button>
                <Button color="green" onClick={takeAction}>
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default AreYouSure;
