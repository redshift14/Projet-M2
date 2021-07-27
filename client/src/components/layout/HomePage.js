import React from 'react';
import landingImage from '../../img/landing1.png';
import './homePage.css';

function HomePage() {

  return (

    <main>
      <div className='main-container'>

        <div className='container-1'>
          <h1 className='lg-heading'>Certifier</h1>
          <h2 className='sm-heading'>Certificaion generator & verifier...</h2>
          <p className='paragraph'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic nulla repellat
            illum rem aliquam quo rerum quae, est, velit veniam. illum rem aliquam quo rerum quae, est, velit veniam</p>
        </div>

        <div className='image-container'>
          <img src={landingImage} alt='landing' className='image'/>
        </div>

      </div>
    </main>

  )
}

export default HomePage;
