import React, { useState } from "react";
import { Image, Modal, Popup } from "semantic-ui-react";
import {
    DonateNowForm,
    DonateAccordion,
    DonateNowPaymentForm,
} from "./DonateNowPieces";

import questionMark from "../../../../public/images/question-mark.png";

const DonateNowModal = ({ trigger }) => {
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
            <Modal.Header>Donate Now</Modal.Header>

            {step === 1 ? (
                <React.Fragment>
                    <Modal.Content>
                        Please enter the following information:{" "}
                        <span>
                            &nbsp;
                            <Popup
                                trigger={
                                    <Image
                                        src={questionMark}
                                        alt=""
                                        style={{
                                            width: "14px",
                                            height: "auto",
                                            filter: "opacity(40%)",
                                            position: "relative",
                                            top: "-1px",
                                        }}
                                        avatar
                                    />
                                }
                                content="The merchant has requested that you provide this information to complete the transaction."
                                inverted
                            />
                        </span>
                    </Modal.Content>
                    <Modal.Content>
                        <DonateNowForm setStep={setStep} />
                    </Modal.Content>
                    <Modal.Content>
                        <DonateAccordion />
                    </Modal.Content>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Modal.Content>
                        <DonateNowPaymentForm />
                    </Modal.Content>
                </React.Fragment>
            )}
        </Modal>
    );
};

export default DonateNowModal;
