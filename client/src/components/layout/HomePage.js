import React, { useEffect } from 'react';
import landingImage from '../../img/landing1.png';
import './homePage.css';

function HomePage(props) {

  useEffect(() => {
    if(props.issuerLoggedin === true) {
      props.loadWeb3();
      props.loadBlockchainData();
    }
    if (props.verifierLoggedin === false) {
      props.loadWeb3();
      props.loadBlockchainData();
    }
  }, [])

  return (

    <main>
      <div className='main-container'>

        <div className='container-1'>
          <h1 className='lg-heading'>Certifier</h1>
          <h2 className='sm-heading'>Certificaion generator & verifier...</h2>
          <p className='paragraph'>A Blockchain based educational certificates generation and verification system, using the InterPlanetary File System IPFS, 
          to store the certificates, and the ethereum blockchain to store the hashes of those certificates. </p>
        </div>

        <div className='image-container'>
          <img src={landingImage} alt='landing' className='image'/>
        </div>

      </div>
    </main>

  )
}

export default HomePage;