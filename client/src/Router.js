import React, {useContext, useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyNavbar from './components/layout/MyNavbar';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './context/AuthContext';
import HomePage from './components/layout/HomePage';
import IssuePage from './components/layout/IssuePage';
import IssuerConsult from './components/layout/IssuerConsult';
import VerifyPage from './components/layout/VerifyPage';
import Web3 from 'web3';
import Certification from './abis/Certification.json';

function Router() {

  const [accountAddress, setAccountAddress] = useState('');
  const [certificationContract, setCertificationContract] = useState(null);
  const [certsTable, setCertsTable] = useState([]);

  async function loadWeb3() {
    console.log('loading web3')
    //Setting up Web3
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non ethereum browser detected, you should consider trying MetaMask');
    }
  }

  async function loadBlockchainData() {
    console.log('reseting table in loadblockchain');
    setCertsTable([]);
    console.log('loading blockchain data');
    //Declare Web3
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts();
    setAccountAddress(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = Certification.networks[networkId];
    if (networkData) {
      //Assign contract
      const web3 = window.web3;
      const certification = new web3.eth.Contract(Certification.abi, networkData.address);
      setCertificationContract(certification);
      console.log(certificationContract);
    }
    //Else
    else {
      //alert Error
      window.alert('Certification contract not deployed to detected network.')
    }
  }

  async function loadCertsTable() {
    setCertsTable([]);
    // Get certs amount 
    const certCount = await certificationContract.methods.certCount().call();
    // Load certs and sort by the newest 
    for (var i = certCount; i>=1; i--) {
      const cert = await certificationContract.methods.certs(i).call();
      setCertsTable(certsTable => [...certsTable, cert]);
    }
    console.log('certTable: ', certsTable);
  }

  function resetTable() {
    console.log('Reseting table');
    setCertsTable([]);
  }

  const {studentLoggedin} = useContext(AuthContext);
  const {verifierLoggedin} = useContext(AuthContext);
  const {issuerLoggedin} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MyNavbar accountAddress={accountAddress}/>
      <Switch>
        {
          (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === false) && (
            <>
              <Route exact path="/">
                <HomePage resetTable={resetTable}/>
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === true && verifierLoggedin === false && issuerLoggedin === false) && (
            <>
              <Route exact path="/">
                <HomePage resetTable={resetTable}/>
              </Route>
              <Route path="/student">
                <div>Student</div>
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === true && issuerLoggedin === false) && (
            <>
            <Route exact path="/">
                <HomePage resetTable={resetTable} loadBlockchainData={loadBlockchainData} verifierLoggedin={verifierLoggedin} loadWeb3={loadWeb3}/>
              </Route>
              <Route path="/verifier">
                <VerifyPage />
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === true)  && (
            <>
              <Route exact path="/">
                <HomePage resetTable={resetTable} loadBlockchainData={loadBlockchainData} issuerLoggedin={issuerLoggedin} loadWeb3={loadWeb3}/>
              </Route>
              <Route path="/issuer">
                <IssuePage loadWeb3={loadWeb3} loadBlockchainData={loadBlockchainData} certificationContract={certificationContract} accountAddress={accountAddress}/>
              </Route>
              <Route path="/issuerconsult">
                <IssuerConsult loadCertsTable={loadCertsTable} certs={certsTable} setCerts={setCertsTable}/>
              </Route>
            </>
          )
        }

      </Switch>
    </BrowserRouter>
  )
}

export default Router;
