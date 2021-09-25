// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    mapping(address => uint) wavesByAddress;

    constructor() {
        console.log("Yo yo, I am a contract am I am smart");
    }

    function wave() public {
        totalWaves += 1;
        wavesByAddress[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getAddressTotalWaves() public view returns (uint) {
        return wavesByAddress[msg.sender];
    }
}
