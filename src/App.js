import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const contractABI = [/* Your contract ABI here */];
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your new contract address

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null); // Track selected proposal
  const [metaMaskRequested, setMetaMaskRequested] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum && !metaMaskRequested) {
        try {
          setMetaMaskRequested(true);

          console.log("Requesting MetaMask account access...");
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          const accounts = await web3.eth.getAccounts();
          console.log("Connected account:", accounts[0]);
          setAccount(accounts[0]);

          const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
          console.log("Contract connected:", contractInstance);

          // Fetch proposals
          console.log("Fetching proposals...");
          const fetchedProposals = await contractInstance.methods.getProposals().call();
          console.log("Proposals fetched:", fetchedProposals);

          const { 0: names, 1: voteCounts } = fetchedProposals;
          const formattedProposals = names.map((name, index) => ({
            name,
            voteCount: voteCounts[index],
          }));
          setProposals(formattedProposals);
          setIsLoading(false);
        } catch (error) {
          console.error("Error connecting to MetaMask or fetching proposals:", error);
        }
      } else if (!window.ethereum) {
        alert("Please install MetaMask to use this DApp.");
      }
    };

    init();
  }, [metaMaskRequested]);

  // Function to cast a vote
  const vote = async () => {
    if (selectedProposal === null) {
      alert("Please select a proposal to vote for.");
      return;
    }

    try {
      await contract.methods.vote(selectedProposal).send({ from: account });
      alert(`Voted successfully for proposal ${proposals[selectedProposal].name}`);
    } catch (error) {
      console.error("Error while voting:", error);
      alert("Failed to cast vote, please check the console for more details.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Decentralized Voting System</h1>
      </header>
      <div className="container">
        {isLoading ? (
          <div>Loading proposals...</div>
        ) : (
          <>
            <ul className="proposal-list">
              {proposals.map((proposal, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="radio"
                      name="proposal"
                      value={index}
                      onChange={() => setSelectedProposal(index)}
                    />
                    {proposal.name}
                  </label>
                  <span>{proposal.voteCount}</span>
                </li>
              ))}
            </ul>
            <button onClick={vote} className="submit-button">
              Submit Vote
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
