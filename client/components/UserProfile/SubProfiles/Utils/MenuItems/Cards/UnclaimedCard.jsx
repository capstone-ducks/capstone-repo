import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const UnclaimedCard = () => (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/ethereum-logo.svg'
        />
        <Card.Header>You have an unclaimed donation!</Card.Header>
        <Card.Meta>Today's date</Card.Meta> {/*  input createdAt data */}
        <Card.Description>
          User X in X has sent you a donation. Click approve to <strong>claim your donation funds</strong>.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <div className='ui two buttons'> */}
        <div>
          <Button basic color='green'>
            Approve
          </Button>
        </div>
      </Card.Content>
    </Card>
);

export default UnclaimedCard;
