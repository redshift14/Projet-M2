import React, { useEffect, useState } from 'react';
import { Button, Table} from 'react-bootstrap';
import moment from 'moment';
import { convertBytes } from './convertBytes';
import './studentPage.css';
import Footer from './Footer';

function StudentPage(props) {

    useEffect(() => {
        props.loadWeb3();
        props.loadBlockchainData();
    }, []);

    const [hash, setHash] = useState('');
    const [certTable, setCertTable] = useState([]);
    const [error, setError] = useState('');
    const [isExistHash, setIsExistHash] = useState(false);

    async function loadStudentTable() {
        setCertTable([]);
        console.log('Verifying');
        const hashState = await props.certificationContract.methods.isExist(hash).call();
        setIsExistHash(hashState);
        if(hashState) {
            const studentCert = await props.certificationContract.methods.certs(hash).call();
            setCertTable(certTable => [...certTable, studentCert]);
            console.log('Student Table', certTable);
        }
        else {
            setError('Certificate not found');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    function viewCertificate() {
        if(isExistHash) {
            window.open("https://ipfs.infura.io/ipfs/" + hash);
        }
        else {
            setError('Confirm the certificate first');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }
    
    return (
        <>
        <div className='holder'> 
            <div className='student-page'>
                <h2 className='title' style={{fontSize:'22px'}}>Enter your certificate hash</h2>
                <input type='text' placeholder='Certificate hash' onChange={(e) => setHash(e.target.value)}/>
                <div className='buttons'>
                    <Button className='btn' variant='dark' size='sm' style={{border:'none', height:'35px'}} onClick={loadStudentTable}>Confirm the hash</Button>
                    <Button className='btn' size='sm' style={{border:'none', height:'35px'}} onClick={viewCertificate}>View the certificate</Button>
                </div>
                <div className='table-div'>
                    <Table striped bordered hover className='table' responsive='md'>
                        <thead style={{fontSize:'14px'}}>
                            <tr>
                                <th scope="col" style={{ width: '250px'}}>Student Name</th>
                                <th scope="col" style={{ width: '200px'}}>Certificate Title</th>
                                <th scope="col" style={{ width: '150px'}}>File Size</th>
                                <th scope="col" style={{ width: '150px'}}>Upload Date</th>
                                <th scope="col" style={{ width: '200px'}}>Uploader</th>
                            </tr>
                        </thead>
                        { 
                            certTable.map((cert, key) => { 
                                return (
                                    <thead key={key} style={{fontSize:'13px', textAlign:'center'}}>
                                        <tr>
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
                </div>
                {error && <span className="error-message">{error}</span>}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default StudentPage;