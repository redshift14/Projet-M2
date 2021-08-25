import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {

  const [studentLoggedin, setStudentLoggedin] = useState(undefined);
  const [issuerLoggedin, setIssuerLoggedin] = useState(undefined);
  const [verifierLoggedin, setVerifierLoggedin] = useState(undefined);

  async function getStudentLoggedin() {
    const studentLoggedinResponse = await axios.get('/auth/studentloggedin');
    setStudentLoggedin(studentLoggedinResponse.data);
  }

  async function getVerifierLoggedin() {
    const verifierLoggedinResponse = await axios.get('/auth/verifierloggedin');
    setVerifierLoggedin(verifierLoggedinResponse.data);
  }

  async function getIssuerLoggedin() {
    const issuerLoggedinResponse = await axios.get('/auth/issuerloggedin');
    setIssuerLoggedin(issuerLoggedinResponse.data);
  }

  useEffect(() => {
    getStudentLoggedin();
    getVerifierLoggedin();
    getIssuerLoggedin();
  }, [])

  return (
      <AuthContext.Provider value={
        {studentLoggedin, getStudentLoggedin, issuerLoggedin, getIssuerLoggedin, verifierLoggedin, getVerifierLoggedin}
      }>
        {props.children}
      </AuthContext.Provider>
  )
}

export default AuthContext;
export {AuthContextProvider};
