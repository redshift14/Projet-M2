import React, {useEffect} from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import './issuerConsult.css';
import { convertBytes } from './convertBytes';
import Footer from './Footer';

function IssuerConsult(props) {

  useEffect(() => {
    props.loadCertsTable();
    return () => {
      props.setCerts([]);
      props.setCertHashes([]);
    }
  }, [])

  return (
    <>
    <div className='holder'>
      <div className='issuer-consult-page'>
        <div className='table-container'>
          <Table striped bordered hover className='table table-1' responsive='md'>
            <thead style={{fontSize:'12px'}}>
              <tr>
                <th scope="col" style={{width: '10px'}}>#</th> 
                <th scope="col" style={{ width: '300px'}}>Student Name</th>
                <th scope="col" style={{ width: '200px'}}>Certificate Title</th>
                <th scope="col" style={{ width: '150px'}}>File Size</th>
                <th scope="col" style={{ width: '150px'}}>Upload Date</th>
                <th scope="col" style={{ width: '150px'}}>Uploader</th>
              </tr>
            </thead>
            { 
              props.certs.map((cert, key) => { 
                return (
                  <thead key={key} style={{fontSize:'11px', textAlign:'center'}}>
                    <tr>
                      <td>{cert.index}</td>
                      <td>{cert.studentName}</td>
                      <td>{cert.certTitle}</td>
                      <td>{convertBytes(cert.certSize)}</td>
                      <td>{moment.unix(cert.uploadTime).format('M/D/Y')}</td>
                      <td>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={"https://etherscan.io/address/" + cert.uploader}
                        >
                          {cert.uploader ? cert.uploader.substring(0,6) : '0x0'}
                          ...{cert.uploader ? cert.uploader.substring(38,42) : '0x0'}
                        </a>
                      </td>
                    </tr>
                  </thead>
                )
              })
            }
          </Table>

          <Table striped bordered hover className='table table-2' responsive='md'> 
            <thead style={{fontSize:'12px'}}>
              <tr>
                <th scope="col" style={{ width: '400px'}}>View</th>
              </tr>
            </thead>
            {
              props.certsHashes.map((certHash, key) => {
                return (
                  <thead key={key} style={{fontSize:'11px', textAlign:'center'}}>
                    <tr>
                      <td>
                        <a
                            href={"https://ipfs.infura.io/ipfs/" + certHash}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {certHash}
                          </a>
                      </td>
                    </tr>
                  </thead>
                )
              })
            }
          </Table>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default IssuerConsult;