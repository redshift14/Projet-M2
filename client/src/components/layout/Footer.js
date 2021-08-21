import React from 'react';
import gitHubIcon from '../../img/github.png';
import linkedInIcon from '../../img/linkedin.png';
import mailIcon from '../../img/mail.png';
import './footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='info'>
                <h2>Certifier</h2>
                <p>This application was designed by Anas Arif as final project to obtain the master's degree - University of Relizane.</p>
            </div>
            <div className='social'>
                <div className='social-item'>
                  <a href='https://github.com/redshift14/Projet-M2' rel="noopener noreferrer" target='_blank'><img src={gitHubIcon} alt='github'/></a>
            </div>
                <div className='social-item'>
                    <a href='https://www.linkedin.com/in/anas-arif-mi' rel="noopener noreferrer" target='_blank'><img src={linkedInIcon} alt='linkedIn'/></a>
                </div>
                <div className='social-item'>
                    <a href='mailto: anasarif.mi@gmail.com'><img src={mailIcon} alt='mail'/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

