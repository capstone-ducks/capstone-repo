var TransactionList = artifacts.require('../contracts/Payments.sol');

module.exports = function(deployer) {
  deployer.deploy(TransactionList);
};
