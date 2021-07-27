import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import "./register.css";
import { Button } from 'react-bootstrap';

function Register() {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState("");

  const {getStudentLoggedin} = useContext(AuthContext);
  const {getVerifierLoggedin} = useContext(AuthContext);
  const {getIssuerLoggedin} = useContext(AuthContext);

  const history = useHistory();

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = { displayName, email, password, passwordVerify, role }
      await axios.post("http://localhost:5000/auth/register", registerData);
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
    <div className='register-page'>
      <form onSubmit={register} className='register-page-form'>
      <h2 className="register-page-welcome-title">Welcome</h2>
      {error && <span className="error-message">{error}</span>}

      <div className="form-group">
        <input
          type="text"
          placeholder="Display name"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </div>

      <div className="form-group">
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

      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
      </div>

      <div className="form-group">
        <h4 className="roles-title">Choose the account type:</h4>
        <select className='roles-menu' onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="Student">Student</option>
            <option value="Verifier">Verifier</option>
            {/* <option value="Issuer">Issuer</option> */}
        </select>
      </div>

        <Button type="submit" className='btn' variant='dark' size='sm'>Submit</Button>
        <span className="register-page-subtext">Already have an account? <Link to="/login" style={{textDecoration: "none"}}>Login</Link></span>

      </form>
    </div>
  )
}

export default Register;
