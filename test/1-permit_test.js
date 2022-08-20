const { signERC2612Permit } = require("eth-permit");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const SignCoin = artifacts.require("SignCoin");
const DepositPermit = artifacts.require("DepositPermit");


function toWei(amount) {
    return (web3.utils.toWei(amount, 'ether'))
}

function fromWei(amount) {
    return (web3.utils.fromWei(amount, 'ether'))
}

contract("SignCoin", () => {
    it("should deploy the contracts", async () => {
        const token = await SignCoin.deployed();
        const vault = await DepositPermit.deployed();
        assert(token, "contract failed to deploy");
        assert(vault, "contract failed to deploy");
    });
    it("should deposit successfully", async () => {
        const token = await SignCoin.deployed();
        const vault = await DepositPermit.deployed();
        const acc = await web3.eth.personal.getAccounts();
        const amount = toWei("100");

        const result = await signERC2612Permit(web3.currentProvider, token.address, acc[0], vault.address, amount);

        await vault.depositPermit(amount, result.deadline, result.v, result.r, result.s);

        console.log(web3.utils.fromWei(await token.balanceOf(vault.address), 'ether'), "SIGN");

        assert(web3.utils.fromWei(await token.balanceOf(vault.address), 'ether') === fromWei(amount), 'Transfer failed.');
    });
    it("should withdraw successfully", async () => {
        const token = await SignCoin.deployed();
        const vault = await DepositPermit.deployed();
        const acc = await web3.eth.personal.getAccounts();

        await vault.withdraw();
        console.log(web3.utils.fromWei(await token.balanceOf(vault.address), 'ether'), "SIGN");
        console.log(web3.utils.fromWei(await token.balanceOf(acc[0]), 'ether'), "SIGN");
        assert(web3.utils.fromWei(await token.balanceOf(acc[0]), 'ether') == 1000, "withdraw failed"); 
    });
}); 
