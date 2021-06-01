import React, { useState } from "react";

import { Image, Modal, Popup } from "semantic-ui-react";

const SetUpWalletModal = ({ trigger }) => {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);

    const closeModal = () => {
        setOpen(false);
        setStep(1);
    };

    return (
        <Modal
            onClose={() => closeModal()}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
            style={{
                textAlign: "center",
            }}
            size="small"
        >
            <Modal.Header>Setup Wallet</Modal.Header>

            {step === 1 ? (
                <React.Fragment>
                    <Modal.Content>
                        {/* <DonateNowForm setStep={setStep} /> */}
                    </Modal.Content>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Modal.Content>
                        {/* <DonateNowPaymentForm /> */}
                    </Modal.Content>
                </React.Fragment>
            )}
        </Modal>
    );
};

export default SetUpWalletModal;
