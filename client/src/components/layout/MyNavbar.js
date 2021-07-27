import React, { useContext} from 'react';
import AuthContext from '../../context/AuthContext';
import LogoutBtn from '../../auth/LogoutBtn';
import { Navbar, Container, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

function MyNavbar() {

  const {studentLoggedin} = useContext(AuthContext);
  const {verifierLoggedin} = useContext(AuthContext);
  const {issuerLoggedin} = useContext(AuthContext);

  console.log(`
      studentloggedin: ${studentLoggedin}
      verifierLoggedin: ${verifierLoggedin}
      issuerLoggedin: ${issuerLoggedin}
    `);


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
                  <Nav className='justify-content-center' style={{ flex: 1}}>
                    <LinkContainer to='/student'>
                      <Nav.Link>Consult</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <LogoutBtn />
                  </>
                )
              }
              {
                (studentLoggedin === false && verifierLoggedin === true && issuerLoggedin === false) && (
                  <>
                  <Nav className='justify-content-center' style={{ flex: 1}}>
                    <LinkContainer to='/verifier'>
                      <Nav.Link>Verify</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <LogoutBtn />
                  </>
                )
              }
              {
                (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === true) && (
                  <>
                  <Nav className='justify-content-center' style={{ flex: 1}}>
                    <LinkContainer to='/issuer'>
                      <Nav.Link>Issue</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/issuerconsult'>
                      <Nav.Link>Consult</Nav.Link>
                    </LinkContainer>
                  </Nav>
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
