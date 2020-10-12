import React, { Component } from "react";
import ITellor from "./contracts/ITellorII.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = "mainnet";
      const instance = new web3.eth.Contract(
        ITellor.abi,"0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5",
      );
  

      // // Set web3, accounts, and contract to the state, and then proceed with an
      // // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  nay = async() => {
    await this.state.contract.methods.vote(1, false).send({from: this.state.accounts[0]});
  }

  yay = async() => {
    return this.state.contract.methods.vote(1, true).send({from: this.state.accounts[0]});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Vote on Tellor Proposal</h1>
        <p><a href={"https://github.com/tellor-io/TIPs/blob/main/TIPs/TIP-2%20Tellor2.5.md"}> See Proposal </a></p>
        <button onClick={this.yay}>Vote YES</button>
        <button onClick={this.nay}>Vote NO</button>

      </div>
    );
  }
}

export default App;
