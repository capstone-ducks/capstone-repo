var PaymentSplitter = artifacts.require('../contracts/PaymentSplitter.sol');

module.exports = function(deployer) {
  deployer.deploy(PaymentSplitter);
};
