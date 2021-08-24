import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

function LogoutBtn() {

  const {getStudentLoggedin} = useContext(AuthContext);
  const {getVerifierLoggedin} = useContext(AuthContext);
  const {getIssuerLoggedin} = useContext(AuthContext);

  const history = useHistory();

  async function logout() {
    await axios.get('http://localhost:5000/auth/logout');
    getStudentLoggedin();
    getVerifierLoggedin();
    getIssuerLoggedin();
    history.push('/');
  }

  return (
    <Nav className='justify-content-end'>
      <Button className='btn' style={{backgroundColor:'#eee', color:'#333', border:'none', height:'35px'}} size='sm' onClick={logout}>Logout</Button>
    </Nav>
  )
}

export default LogoutBtn;
