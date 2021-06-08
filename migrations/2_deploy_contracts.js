var PaymentSplitter = artifacts.require("../contracts/PaymentSplitter.sol");

module.exports = function (deployer) {
    // TWO PARAMETERS:
    // 1: Array of recipient Ethereum addresses as string
    // 2: Array of shares (integers) corresponding to recipient addresses by index
    console.log(deployer);
    deployer.deploy(PaymentSplitter);
};
