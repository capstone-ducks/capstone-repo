import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const UnclaimedCard = (props) => {
  let { donations } = props;
  return (
    <div>
      {!donations.length ? <div>No donations to claim at this time</div> :
        donations.map((donation) => {
            if (!donation.users[0].donationsRecipients.isClaimed) {
              return (
                <Card key={donation.id}>
                  <Card.Content>
                    <Image
                      floated='right'
                      size='mini'
                      src='/images/ethereum-logo.svg'
                    />
                    <Card.Header>You have an unclaimed donation of {donation.users[0].donationsRecipients.amountOwed} ETH</Card.Header>
                    <Card.Meta>{donation.createdAt}</Card.Meta> {/*  reformat createdAt data */}
                    <Card.Description>
                      User {donation.donor.firstName} {donation.donor.lastName[0]}. {donation.donor.city ? `from ${donation.donor.city}` : 'UNKOWN'} has sent you a donation. Click approve to <strong>claim your donation funds</strong>.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button basic color='green'>
                        Approve
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              )
            }
          }
        )
      }
    </div>
  )
};

export default UnclaimedCard;
