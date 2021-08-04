import React from 'react';
import Router from './Router';
import axios from 'axios';
import {AuthContextProvider} from './context/AuthContext';
import Web3 from 'web3';

axios.defaults.withCredentials = true;

// loadBlockchainData();
// 
// async function loadBlockchainData() {
//   const web3 = new Web3(Web3.givenProvider ||"http://localhost:8584");
//   const network = await web3.eth.net.getNetworkType();
//   const accounts = await web3.eth.getAccounts();
//   console.log('network: '+network);
//   console.log('accounts: ', accounts[0]);
// }

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
