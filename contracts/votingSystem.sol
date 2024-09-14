// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Proposal {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public hasVoted;
    Proposal[] public proposals;

    constructor(string[] memory proposalNames) {
        owner = msg.sender;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function vote(uint proposalIndex) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(proposalIndex < proposals.length, "Invalid index");
        proposals[proposalIndex].voteCount += 1;
        hasVoted[msg.sender] = true;
    }

    function getWinningProposal() public view returns (string memory winningProposalName) {
        uint winningVoteCount = 0;
        uint winningProposalIndex = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalIndex = i;
            }
        }
        return proposals[winningProposalIndex].name;
    }

    // Modify this function to return two arrays: one for names, one for vote counts
    function getProposals() public view returns (string[] memory names, uint[] memory voteCounts) {
        names = new string[](proposals.length);
        voteCounts = new uint[](proposals.length);
        for (uint i = 0; i < proposals.length; i++) {
            names[i] = proposals[i].name;
            voteCounts[i] = proposals[i].voteCount;
        }
    }
}
