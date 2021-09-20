// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wallet {
    address[] public approvers;
    uint256 public quorum;
    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvals;
        bool sent;
    }
    Transfer[] public transfers;

    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function createTransfer(uint256 amount, address payable to) external {
        transfers.push(Transfer(transfers.length, amount, to, 0, false));
    }
}
