// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    mapping(address => uint) wavesByAddress;

    event NewWave(address indexed from, uint timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;

    constructor() {
        console.log("Yo yo, I am a contract am I am smart");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        wavesByAddress[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getAddressTotalWaves() public view returns (uint) {
        return wavesByAddress[msg.sender];
    }
}
