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
import StudentPage from './components/layout/StudentPage';

const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

function Router() { 

  const [accountAddress, setAccountAddress] = useState('');
  const [certificationContract, setCertificationContract] = useState(null);
  const [certsTable, setCertsTable] = useState([]);
  const [certInfoTable, setCertInfoTable] = useState([]);
  const [fileBlob, setFileBlob] = useState('');
  const [uploadedFileHash, setUploadedFileHash] = useState('');

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
    console.log('loading blockchain data');
    //Declare Web3
    const web3 = window.web3;
    //Load account
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts ', accounts);
    setAccountAddress(accounts[0]);
    console.log('Account Address State', accountAddress);
    const networkId = await web3.eth.net.getId();
    const networkData = Certification.networks[networkId];
    if (networkData) {
      //Assign contract
      const web3 = window.web3;
      const certification = new web3.eth.Contract(Certification.abi, networkData.address);
      setCertificationContract(certification);
      console.log('Certification Contract: ', certificationContract);
    }
    //Else
    else {
      //alert Error
      window.alert('Certification contract not deployed to detected network.')
    }
  }

  async function loadCertsTable() {
    // Get certs amount 
    if(certificationContract) {
      const certCount = await certificationContract.methods.getCertsCount().call();
      // Load certs and sort by the newest 
      console.log('CertCount: ', certCount);
      for (var i = certCount-1; i >= 0; i--) {
        const cert = await certificationContract.methods.certIndex(i).call();
        setCertsTable(certsTable => [...certsTable, cert]);
        const certInfo = await certificationContract.methods.certs(cert).call();
        setCertInfoTable(certInfoTable => [...certInfoTable, certInfo]);
      }
      console.log('certTable: ', certsTable);
      console.log('certInfoTable', certInfoTable);
    }
  }
  
  async function captureFileTest(e) {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const urlRes = reader.result;  
      fetch(urlRes).then(res => res.blob()).then(setFileBlob);
    } 
    console.log('FileBlob', fileBlob);
  }

  async function hashFile() {
    if(!fileBlob) {
      console.log('error');
    }
    else {
      console.log('submitting the form');
      const result = await ipfs.add(fileBlob);
      setUploadedFileHash(result["path"]);
      console.log('Result ipfs: ', uploadedFileHash);  
    }
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
                <HomePage />
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
                <HomePage />
              </Route>
              <Route path="/student">
                <StudentPage loadBlockchainData={loadBlockchainData} loadWeb3={loadWeb3} certificationContract={certificationContract}/>
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === true && issuerLoggedin === false) && (
            <>
            <Route exact path="/">
                <HomePage loadBlockchainData={loadBlockchainData} verifierLoggedin={verifierLoggedin} loadWeb3={loadWeb3} />
              </Route>
              <Route path="/verifier">
                <VerifyPage loadWeb3={loadWeb3} loadBlockchainData={loadBlockchainData} certificationContract={certificationContract} captureFile={captureFileTest} hashFile={hashFile} uploadedFileHash={uploadedFileHash}/>
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === true)  && (
            <>
              <Route exact path="/">
                <HomePage loadBlockchainData={loadBlockchainData} issuerLoggedin={issuerLoggedin} loadWeb3={loadWeb3}/>
              </Route>
              <Route path="/issuer">
                <IssuePage loadWeb3={loadWeb3} loadBlockchainData={loadBlockchainData} certificationContract={certificationContract} accountAddress={accountAddress}/>
              </Route>
              <Route path="/issuerconsult">
                <IssuerConsult loadCertsTable={loadCertsTable} certs={certInfoTable} setCerts={setCertInfoTable} certsHashes={certsTable} setCertHashes={setCertsTable} />
              </Route>
            </>
          )
        }

      </Switch>
    </BrowserRouter>
  )
}

export default Router;
