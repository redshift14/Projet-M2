import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import "./login.css";
import { Button } from 'react-bootstrap';

function Login () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const {getStudentLoggedin} = useContext(AuthContext);
  const {getVerifierLoggedin} = useContext(AuthContext);
  const {getIssuerLoggedin} = useContext(AuthContext);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = { email, password }
      await axios.post("/auth/login", loginData);
      getStudentLoggedin();
      getVerifierLoggedin();
      getIssuerLoggedin();
      history.push('/');
    }
    catch (error) {
      setError(error.response.data.errorMessage);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={login} className='login-page-form'>
        <h3 className="login-page-welcome-title">Login</h3>
        {error && <span className="error-message">{error}</span>}

        <div className='form-group'>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Button type="submit" className='btn' variant='dark' size='sm'>Submit</Button>
        <span className="login-screen-subtext">Dont have an account? <Link to="/register" style={{textDecoration: "none"}}>Signup</Link></span>
      </form>
    </div>
  )
}

export default Login;
