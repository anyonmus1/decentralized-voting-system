# Decentralized Voting System

This project consists of a Solidity smart contract that implements a simple decentralized voting system and a React-based front-end to interact with it.

## Project Structure

- **contracts/**: Contains the Solidity smart contract (`VotingSystem.sol`) for managing proposals and voting.
- **frontend/**: Contains the React-based front-end for interacting with the smart contract using MetaMask and Web3.js.

## Features

- Users can connect to MetaMask and vote for one of the proposals.
- Only one vote is allowed per user.
- The system tracks the number of votes for each proposal and prevents duplicate voting.

## Getting Started

### Solidity Contracts

1. Navigate to the `contracts` folder.
2. Compile and deploy the `VotingSystem.sol` contract using Remix or Truffle.

### React Front-End

1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Update the contract address in the `App.js` file to match the deployed contract address.
4. Run the development server:
    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:3000` to interact with the voting system.

## Tools Used

- Solidity (for smart contract development)
- Web3.js (for connecting the React front-end to the blockchain)
- MetaMask (for connecting the user's wallet)
- React (for the user interface)