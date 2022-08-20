// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol";

//This is needed since to combine the two interfaces into one
//exposing all the functions
interface ISignCoin is IERC20, IERC20Permit {}


