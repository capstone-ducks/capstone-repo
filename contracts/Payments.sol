pragma solidity ^0.8.0;

// TODO
// run truffle compile
// run truffle migrate
// test on the truffle terminal


contract Escrow {
    enum State { AWAITING_PAYMENT, AWAITING_CONFIRMATION, COMPLETE }
    State public currState;

    address public donor;
    address payable public recipient;

    modifier onlyDonor() {
        require(msg.sender == donor, "Only donor can call this method");
        _;
    }

    constructor(address _donor, address payable _recipient) public {
        donor = _donor;
        recipient = _recipient;
    }

    function deposit() onlyDonor external payable {
        require(currState == State.AWAITING_PAYMENT, "Already paid");
        currState = State.AWAITING_CONFIRMATION;
    }

    function confirmation() onlyDonor external {
        require(currState == State.AWAITING_CONFIRMATION, "Cannot confirm");
        recipient.transfer(address(this).balance);
        currState = State.COMPLETE;
    }
}



// pragma solidity ^0.5.1;

// contract Payments {
//   constructor() public {
//         countDonations(10);
//       }
//   // state variable stored on blockchain
//    uint public transactionCount = 0;

//   struct Donation {
//     uint id;
//     uint donationTotal;
//     address donorAddress;
//     address payable recipientAddress;
//   }

//   mapping(uint => Donation) public donations;

//   function countDonations(string memory donationTotal) public {
//     uint donationTotal = 10;
//     transactionCount ++;
//     donations[transactionCount] = Donation(transactionCount, donationTotal, _content, false);
//   }

//   function sendDonation (uint donationId) public payable aboveMinimum() {
//     require(donations[donationId].recipientAddress != donations[donationId].donorAddress, 'cant send until recipient address has been set');
//     // add donation amount to donations
//       donations[donationId].donationTotal += msg.value;
//   }

//   //Modifiers
//   //validations
//   modifier aboveMinimum () {
//       require( msg.value > 0 ether, "donation must be more than 0 ether");

//   }

// }
