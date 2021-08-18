import React, {useState, useEffect, useCallback} from 'react';
import { Button } from 'react-bootstrap';
import './verifyPage.css';
import fingerPrintImage from '../../img/fingerPrint.png';
import documentImage from '../../img/document.png';

function VerifyPage(props) {

  const [isVerifiedById, setIsVerifiedById] = useState(false);
  const [id, setId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    props.loadWeb3();
    props.loadBlockchainData();
    return () => {
    }
  }, [])

  async function testConfirm() {
    console.log('Verifying');
    const hashState = await props.certificationContract.methods.isExist(id).call();
    setIsVerifiedById(hashState);
    console.log('IsVerifiedById', isVerifiedById);
  }

  function testVerify() {
    if(isVerifiedById) {
      setError('');
      setSuccess(`Certificate verified, to view it click `);
      setTimeout(() => {
        setSuccess("");
      }, 10000);
    }
    else {
      setSuccess('');
      setError('Certificate not found');
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  function handleChange(e) {
    setId( id => e.target.value)
  }

  return (
    <div className='verify-page'>
      <div className='box'>
      <h2 className='box-title'>Verify by ID</h2>
        <form className="verify-form">
          <input type="text" placeholder='Certification ID' onChange={handleChange} className='id-input'/>
          <div className='buttons'>
            <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px'}} onClick={testConfirm}>Click to Confirm</Button>
            <Button className='btn' size='sm' style={{border:'none', height:'35px'}} onClick={testVerify}>Click to Verify</Button>
          </div>
        </form>
        {
          success && 
          <span className="success-message">
            {success}
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
        {error && <span className="error-message">{error}</span>}
        <div className='img-1-container'>
          <img src={documentImage} className='img-1'/>
        </div>
      </div>

      <div className='box'>
        <h2 className='box-title'>Verify by Uploading The Document</h2>
        <form className="verify-form">
          <input type="file" placeholder='Choose your file' size='100' className='file-input' accept='application/pdf'/>
          <div className='buttons'>
            <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px'}}>Click to Confirm</Button>
            <Button className='btn' size='sm' style={{border:'none', height:'35px'}}>Click to Verify</Button>
          </div>
        </form>
        <div className='img-2-container'>
          <img src={fingerPrintImage} className='img-2'/>
        </div>
      </div>
    </div>
    
  )
}

export default VerifyPage;
