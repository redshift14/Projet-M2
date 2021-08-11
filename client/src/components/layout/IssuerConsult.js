import React, {useEffect} from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import './issuerConsult.css';
import { convertBytes } from './convertBytes';

function IssuerConsult(props) {

  useEffect(() => {
    props.loadCertsTable();
    return () => {
      props.setCerts([]);
    }
  }, [])

  return (
    <div className='issuer-consult-page'>
      <div className='table-container'>
        <Table striped bordered hover className='table'>
          <thead style={{fontSize:'13px'}}>
            <tr>
              <th scop="col" style={{width: '10px'}}>#</th>
              <th scope="col" style={{ width: '200px'}}>Student Name</th>
              <th scope="col" style={{ width: '200px'}}>Certificate Title</th>
              <th scope="col" style={{ width: '200px'}}>University</th>
              <th scope="col" style={{ width: '200px'}}>File Size</th>
              <th scope="col" style={{ width: '300px'}}>Upload Date</th>
              <th scope="col" style={{ width: '200px'}}>Uploader</th>
              <th scope="col" style={{ width: '200px'}}>View</th>
            </tr>
          </thead>
          { 
            props.certs.map((cert, key) => { 
              return (
                <thead key={key} style={{fontSize:'12px', textAlign:'center'}}>
                  <tr>
                    <td>{cert.certId}</td>
                    <td>{cert.studentName}</td>
                    <td>{cert.certTitle}</td>
                    <td>{cert.univName}</td>
                    <td>{convertBytes(cert.certSize)}</td>
                    <td>{moment.unix(cert.uploadTime).format('M/D/Y')}</td>
                    <td>{cert.uploade}</td>
                    <td>
                      <a
                        href={"https://ipfs.infura.io/ipfs/" + cert.certHash}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {cert.certHash}
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
  );
}

export default IssuerConsult;
