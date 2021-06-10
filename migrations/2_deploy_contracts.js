var DonationContract = artifacts.require("../contracts/DonationContract.sol");

module.exports = function (deployer) {
    deployer.deploy(DonationContract);
};
