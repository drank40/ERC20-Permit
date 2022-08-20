const SignCoin = artifacts.require("SignCoin");
const DepositPermit = artifacts.require("DepositPermit");
const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(SignCoin);
    const coin = await SignCoin.deployed();

    await deployer.deploy(DepositPermit, coin.address);
};
