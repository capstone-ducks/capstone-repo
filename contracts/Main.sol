/* if you do everything in one contract >> leads to problem of tight coupling
Keep metadata here in Donation contract

 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PaymentSplitter.sol";

// make a donation
// cash out donation

contract Main {
  constructor() {

  }

  PaymentSplitter public paymentInstance;

  // takes in array of addresses and array of shares
  function createDonation(address[] memory payees, uint256[] memory shares_) public {
    paymentInstance = new PaymentSplitter(payees, shares_);
  }
}
