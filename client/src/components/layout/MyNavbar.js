import React, { useContext} from 'react';
import AuthContext from '../../context/AuthContext';
import LogoutBtn from '../../auth/LogoutBtn';
import { Navbar, Container, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

function MyNavbar(props) {

  const {studentLoggedin} = useContext(AuthContext);
  const {verifierLoggedin} = useContext(AuthContext);
  const {issuerLoggedin} = useContext(AuthContext);

  return (
      <Navbar bg='dark' expand='lg' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand style={{fontSize:'40px'}}>Certifier</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

              {
                (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === false) && (
                  <>
                  <Nav className="justify-content-end" style={{ flex: 1}}>
                    <LinkContainer to='/register'>
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  </>
                )
              }
              {
                (studentLoggedin === true && verifierLoggedin === false && issuerLoggedin === false) && (
                  <>
                  <Nav className='justify-content-start' style={{ flex: 1}}>
                    <LinkContainer to='/student'>
                      <Nav.Link>Consult</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <Nav.Item>
                    <Nav.Link
                      target="_blank"
                      style={{color:'white', marginRight:'10px', fontSize: '15px'}}
                      href={"https://etherscan.io/address/" + props.accountAddress}
                    >
                      {props.accountAddress ? props.accountAddress.substring(0,6) : '0x0'}
                      ...{props.accountAddress ? props.accountAddress.substring(38,42) : '0x0'}
                    </Nav.Link>
                  </Nav.Item>
                  <LogoutBtn />
                  </>
                )
              }
              {
                (studentLoggedin === false && verifierLoggedin === true && issuerLoggedin === false) && (
                  <>
                  <Nav className='justify-content-start' style={{ flex: 1}}>
                    <LinkContainer to='/verifier'>
                      <Nav.Link>Verify</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <Nav.Item>
                    <Nav.Link
                      target="_blank"
                      style={{color:'white', marginRight:'10px', fontSize: '15px'}}
                      href={"https://etherscan.io/address/" + props.accountAddress}
                    >
                      {props.accountAddress ? props.accountAddress.substring(0,6) : '0x0'}
                      ...{props.accountAddress ? props.accountAddress.substring(38,42) : '0x0'}
                    </Nav.Link>
                  </Nav.Item>
                  <LogoutBtn />
                  </>
                )
              }
              {
                (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === true) && (
                  <>
                  <Nav className='justify-content-start' style={{ flex: 1}}>
                    <LinkContainer to='/issuer'>
                      <Nav.Link>Issue</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/issuerconsult'>
                      <Nav.Link>Consult</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <Nav.Item>
                    <Nav.Link
                      target="_blank"
                      style={{color:'white', marginRight:'10px', fontSize: '15px'}}
                      href={"https://etherscan.io/address/" + props.accountAddress}
                    >
                      {props.accountAddress ? props.accountAddress.substring(0,6) : '0x0'}
                      ...{props.accountAddress ? props.accountAddress.substring(38,42) : '0x0'}
                    </Nav.Link>
                  </Nav.Item>
                  <LogoutBtn />
                  </>
                )
              }

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default MyNavbar;
