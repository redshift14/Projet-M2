import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import './verifyPage.css';
import fingerPrintImage from '../../img/fingerPrint.png';
import documentImage from '../../img/document.png';
import Footer from './Footer';

function VerifyPage(props) {

  const [isVerifiedById, setIsVerifiedById] = useState(false);
  const [isVerifiedByFile, setIsVerifiedByFile] = useState(false);
  const [id, setId] = useState('');
  const [successById, setSuccessById] = useState('');
  const [successByFile, setSuccessByFile] = useState('');
  const [errorById, setErrorById] = useState('');
  const [errorByFile, setErrorByFile] = useState('');
  const [statusLeft, setStatusLeft] = useState('');
  const [statusRight, setStatusRight] = useState('');

  useEffect(() => {
    props.loadWeb3();
    props.loadBlockchainData();
    return () => {
    }
  }, []);

  async function confirmByFile() {
    if(!props.uploadedFileHash) {
      setStatusRight('');
      setErrorByFile('Please choose your file');
      setTimeout(() => {
        setErrorById('');
        setErrorByFile('');
      }, 3000);
    } 
    else {
      console.log('Confirm By File');
      const hashState = await props.certificationContract.methods.isExist(props.uploadedFileHash).call();
      setIsVerifiedByFile(hashState);
      console.log('IsVerifiedByFile', isVerifiedByFile);
      setStatusRight('File confirmed and uploaded');
    }
  }

  function verifiyByFile() {
    setStatusRight('');
    if(isVerifiedByFile) {
      setErrorByFile('');
      setErrorById('');
      setSuccessByFile(`Certificate verified`);
      setTimeout(() => {
        setSuccessByFile('');
        setSuccessById('');
      }, 10000);
    }
    else {
      setSuccessByFile('');
      setSuccessById('');
      setErrorByFile('Certificate not found');
      setTimeout(() => {
        setErrorByFile('');
        setErrorById('');
      }, 3000);
    }
  }

  async function confirmById() {
    if(!id) {
      setStatusLeft('');
      setErrorById('Please enter the hash');
      setTimeout(() => {
        setErrorById('');
        setErrorByFile('');
      }, 3000);
    }
    else {
      console.log('Verifying');
      const hashState = await props.certificationContract.methods.isExist(id).call();
      setIsVerifiedById(hashState);
      console.log('IsVerifiedById', isVerifiedById);
      setStatusLeft('File confirmed');
    }
  }

  function verifyById() {
    setStatusLeft('');
    if(isVerifiedById) {
      setStatusLeft('');
      setErrorById('');
      setErrorByFile('');
      setSuccessById(`Certificate verified, to view it click `);
      setTimeout(() => {
        setSuccessById('');
        setIsVerifiedByFile('');
      }, 10000);
    }
    else {
      setSuccessById('');
      setIsVerifiedByFile('');
      setErrorById('Certificate not found');
      setTimeout(() => {
        setErrorById('');
        setErrorByFile('');
      }, 3000);
    }
  }

  function handleChangeById(e) {
    setId( id => e.target.value)
  }

  return (
    <>
      <div className='verify-page'>
        <div className='box'>
        <h2 className='box-title'>Verify by ID</h2>
        <div className='instructions'>
          <p>1- Fill in the text field with the hash of the certificate</p>
          <p>2- Click the button confirm</p>
          <p>3- Click the button verify, and you well get the result</p>
        </div>
          <form className="verify-form">
            <input type="text" placeholder='Certification ID' onChange={handleChangeById} className='id-input'/>
            <div className='buttons'>
              <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px'}} onClick={confirmById}>Confirm</Button>
              <Button className='btn' size='sm' style={{border:'none', height:'35px'}} onClick={verifyById}>Verify</Button>
            </div>
          </form>
          {
            successById && 
            <span className="success-message">
              {successById}
              <a 
                href={"https://ipfs.infura.io/ipfs/" + id}
                rel="noopener noreferrer"
                target="_blank"
                style={{color: 'white'}}
              >
                here
              </a>
            </span>
          }
          {errorById && <span className="error-message">{errorById}</span>}
          {statusLeft && <span className="status-message">{statusLeft}</span>}
          <div className='img-1-container'>
            <img src={documentImage} className='img-1' alt='document'/>
          </div>
        </div>

        <div className='box'>
          <h2 className='box-title'>Verify by Uploading The Document</h2>
          <div className='instructions'>
            <p>1- Choose the certificate from your system, and click confirm</p>
            <p>2- Click upload to upload the certificate to our system</p>
            <p>3- Click the button verify, and you well get the result</p>
          </div>
          <form className="verify-form">
            <input type="file" placeholder='Choose your file' size='100' className='file-input' accept='application/pdf' onChange={props.captureFile}/>
            <div className='buttons'>
              <div className='buttons-row'>
                <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px', marginRight: '9px'}} onClick={props.hashFile}>Confirm</Button>
                <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px', marginLeft: '9px'}} onClick={confirmByFile}>Upload</Button>
              </div>
              <Button className='btn' size='sm' style={{border:'none', height:'35px'}} onClick={verifiyByFile}>Verify</Button>
            </div>
          </form>
          {successByFile && <span className="success-message">{successByFile}</span>}
          {errorByFile && <span className="error-message">{errorByFile}</span>}
          {statusRight && <span className="status-message">{statusRight}</span>}
          <div className='img-2-container'>
            <img src={fingerPrintImage} className='img-2' alt='fingerPrint'/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default VerifyPage;