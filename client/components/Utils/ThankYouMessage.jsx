import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ThankYouMessage({trigger}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={trigger}
    //   trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Thank you for your generous donation!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
        You truly make the difference for us, and we are extremely grateful!
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>OK</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ThankYouMessage