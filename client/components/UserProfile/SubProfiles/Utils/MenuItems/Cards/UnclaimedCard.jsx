import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const UnclaimedCard = (props) => {
  const { donations } = props;
  return (
    <div>
      {!donations.length ? <div>No donations to claim at this time</div> :
        donations.map((donation) => (
          <Card key={donation.id}>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                src='/images/ethereum-logo.svg'
              />
              <Card.Header>You have an unclaimed donation!</Card.Header>
              <Card.Meta>{donation.createdAt}</Card.Meta> {/*  reformat createdAt data */}
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
        ))
      }
    </div>
  )
};

export default UnclaimedCard;
