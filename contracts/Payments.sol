pragma solidity ^0.5.1;

contract Payments {
  constructor() public {
        countDonations(10);
      }
  // state variable stored on blockchain
   uint public transactionCount = 0;

  struct Donation {
    uint id;
    uint donationTotal;
    address donorAddress;
    address payable recipientAddress;
  }

  mapping(uint => Donation) public donations;

  function countDonations(string memory donationTotal) public {
    uint donationTotal = 10;
    transactionCount ++;
    donations[transactionCount] = Donation(transactionCount, donationTotal, _content, false);
  }

  function sendDonation (uint donationId) public payable aboveMinimum() {
    require(donations[donationId].recipientAddress != donations[donationId].donorAddress, 'cant send until recipient address has been set');
    // add donation amount to donations
      donations[donationId].donationTotal += msg.value;
  }

  //Modifiers 
  //validations
  modifier aboveMinimum () {
      require( msg.value > 0 ether, "donation must be more than 0 ether");
    
  }

}
