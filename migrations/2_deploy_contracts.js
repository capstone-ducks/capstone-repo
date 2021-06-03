var Payments = artifacts.require('../contracts/Payments.sol');

module.exports = function(deployer) {
  deployer.deploy(Payments);
};
