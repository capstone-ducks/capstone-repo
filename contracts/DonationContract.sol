// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
  constructor() {
  }
  // Structs are like models objects. A new struct is made for each donation instance
  struct Donation {
      address payable[] recipientAddresses;
      mapping (address => bool) claimsList;
    //   address[] alreadyClaimed;
      uint numberOfRecipients;
      uint donationTotal;
      address donorAddress;
      bool active;
  }

  mapping(uint => Donation) public allDonations;

  function createDonation(uint _donationId, address payable[] memory _recipientAddresses, uint _numberOfRecipients) public payable  {
      createDonationStruct(_donationId, msg.sender, _recipientAddresses, _numberOfRecipients);
  }

  function createDonationStruct(uint _donationId, address _donatorAddress, address payable[] memory _recipientAddresses, uint _numberOfRecipients) internal {
        Donation storage newDonation = allDonations[_donationId];
        newDonation.recipientAddresses = _recipientAddresses;
        //   alreadyClaimed: new address[](_numberOfRecipients), // creates array of addresses for those who claimed donation to prevent double dipping
        newDonation.numberOfRecipients = _numberOfRecipients;
        newDonation.donationTotal = msg.value;
        newDonation.donorAddress = _donatorAddress;
        newDonation.active = true;
  }

  function claimDonation(uint _donationId, address payable _recipient) public isDonationActive(_donationId) {
      // if recipient address is in donation recipient list, and they havent already claimed money, transfer money to them
      // subtract from total in donation
      require(allDonations[_donationId].claimsList[_recipient] == false, "this user has already claimed this donation");
      uint amount = allDonations[_donationId].donationTotal / allDonations[_donationId].numberOfRecipients;
      _recipient.transfer(amount);
      allDonations[_donationId].claimsList[_recipient] = true;
  }

  function balanceOfContract() external view returns(uint) {
       return address(this).balance;
  }

  // does donation exist?
  modifier isDonationActive (uint _donationId) {
      require(allDonations[_donationId].active, 'donation is not active');
      _;
  }
}
