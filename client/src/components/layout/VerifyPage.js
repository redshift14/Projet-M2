import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import './verifyPage.css';
import or from '../../img/or.png'

function VerifyPage() {
  return (
    <div className='verify-page'>

      <div className='forms-container'>
        <div className='label-container'>
          <label>Verify by ID</label>
        </div>
        <form className="id-verify-form">
          <input type="text" placeholder='Certification ID' />
          <Button type="submit" className='btn form-btn' size='sm'>Verify</Button>
        </form>

        <div className='or-image-container'>
          <img src={or} alt="or" className='or-image'/>
        </div>

        <div className='label-container'>
          <label>Verify by uploading the document</label>
        </div>
        <form className="file-verify-form">
          <input type="file" placeholder='Choose your file' size='100' />
          <Button type="submit" className='btn form-btn' size='sm'>Verify</Button>
        </form>
      </div>

    </div>
  )
}

export default VerifyPage;
