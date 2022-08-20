//SPDX-License-Identifier: GPL3
pragma solidity ^0.8;

import "./interfaces/ISignCoin.sol";

contract DepositPermit {

    ISignCoin token;

    mapping(address => uint) deposits;

    event Deposit(address, uint);
    event Withdrawl(address, uint);

    constructor(address token_addr) {
        token = ISignCoin(token_addr);
    }

    function depositPermit(uint amount, uint deadline, uint8 v, bytes32 r, bytes32 s) public
    {
        token.permit(msg.sender, address(this), amount, deadline, v, r, s);
        token.transferFrom(msg.sender, address(this), amount);

        deposits[msg.sender] = amount;

        emit Deposit(msg.sender, amount);
    }

    function withdraw() public
    {
        uint amount = deposits[msg.sender];
        delete deposits[msg.sender];

        token.transfer(msg.sender, amount);

        emit Withdrawl(msg.sender, amount);
    }
}


