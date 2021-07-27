import React, {useContext} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyNavbar from './components/layout/MyNavbar';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './context/AuthContext';
import HomePage from './components/layout/HomePage';
import IssuePage from './components/layout/IssuePage';
import IssuerConsult from './components/layout/IssuerConsult';
import VerifyPage from './components/layout/VerifyPage';

function Router() {

  const {studentLoggedin} = useContext(AuthContext);
  const {verifierLoggedin} = useContext(AuthContext);
  const {issuerLoggedin} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        {
          (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === false) && (
            <>
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
              <Route path="/student">
                <div>Student</div>
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === true && issuerLoggedin === false) && (
            <>
              <Route path="/verifier">
                <VerifyPage />
              </Route>
            </>
          )
        }

        {
          (studentLoggedin === false && verifierLoggedin === false && issuerLoggedin === true) && (
            <>
              <Route path="/issuer">
                <IssuePage />
              </Route>
              <Route path="/issuerconsult">
                <IssuerConsult />
              </Route>
            </>
          )
        }

      </Switch>
    </BrowserRouter>
  )
}

export default Router;
