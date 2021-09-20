// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    address[] public approvers;
    uint256 public quorum;

    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }
}
