import React, { useState } from "react";
import { Button, Header, Image, Modal, Popup } from "semantic-ui-react";
import DonateNowForm from "./DonateForm.jsx";
import DonateAccordion from "./DonateAccordion.jsx";
import questionMark from "../../../../public/images/question-mark.png";

const DonateNowModal = ({ trigger }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={trigger}
            style={{
                textAlign: "center",
            }}
            size="small"
        >
            <Modal.Header>Donate Now</Modal.Header>
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
                <DonateNowForm />
            </Modal.Content>
            <Modal.Content>
                <DonateAccordion />
            </Modal.Content>
        </Modal>
    );
};

export default DonateNowModal;
