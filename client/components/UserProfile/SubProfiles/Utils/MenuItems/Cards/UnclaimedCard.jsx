import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const UnclaimedCard = (props) => {
  let { donations } = props;

  // donations = Object.entries(donations).map((donation) => {
    // if (donation.users[0].donationsRecipients.isClaimed == false) return donation });
  // let arrayDonations= new Array (donations)
  // console.log(donations)
  console.log(Object.entries(donations))
  console.log(typeof Object.entries(donations))


  return (
    <div>
      {!donations.length ? <div>No donations to claim at this time</div> :
        donations.map((donation) => {
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
                  User {donation.donor.firstName} {donation.donor.lastName[0]}. from {donation.donor.city ? donation.donor.city : 'UNKOWN'} has sent you a donation. Click approve to <strong>claim your donation funds</strong>.
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
          )}
        )
      }
    </div>
  )
};

export default UnclaimedCard;
