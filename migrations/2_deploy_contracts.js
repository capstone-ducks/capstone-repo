const PaymentSplitter = artifacts.require("../contracts/PaymentSplitter.sol");
const Address = artifacts.require("../contracts/Address.sol");
const Context = artifacts.require("../contracts/Context.sol");
const Donation = artifacts.require("../contracts/Donation.sol");
// const SafeMath = artifacts.require("../contract/SafeMath.sol"); // is this being used at all?

module.exports = async function (deployer) {
    await deployer.deploy(Address);
    await deployer.deploy(Context);
    const instance = await deployer.deploy(Donation)
    await deployer.deploy(PaymentSplitter, instance); // will need two parameters ... from Donation?
};

/* Composable: chain them together
1 contract keeps track of metadata and then send that through paymentsplitter
deploy both and one will call payment splitter
Avoid deploying multiple instances of the same contract
    -- call payment splitter from Donation contract
    -- deploy PS + all contracts that call each other
*/
