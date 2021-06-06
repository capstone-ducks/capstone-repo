var PaymentSplitter = artifacts.require("../contracts/PaymentSplitter.sol");

module.exports = function (deployer) {
    // TWO PARAMETERS:
    // 1: Array of recipient Ethereum addresses as string
    // 2: Array of shares (integers) corresponding to recipient addresses by index
    console.log(deployer);
    deployer.deploy(
        PaymentSplitter,
        ["0x758f405e4949ff3b70437b6d3d83d2b8f6ca0091"],
        [1],
    );
};
