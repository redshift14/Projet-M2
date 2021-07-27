import React, {useState} from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import styles from './IssueDocumentStyle';
import './issuePage.css';
import MyDocument from './MyDocument';
import { Button } from 'react-bootstrap';
import NewWindow from 'react-new-window';

const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

// Pour tester l'upload sans remplir le formulaire décommenter la button Test en la ligne 397

function IssuePage() {

  const [fileHash, setFileHash] = useState('');

  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // const [certHash, setCertHash] = useState('');

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [pod, setPod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [holderEmail, setHolderEmail] = useState('');
  const [certTitle, setCertTitle] = useState('');
  const [certField, setCertField] = useState('');
  const [certFaculty, setCertFaculty] = useState('');
  const [certSpecialty, setCertSpecialty] = useState('');
  const [certLevel, setCertLevel] = useState('');
  const [certYear, setCertYear] = useState('');
  const [univDem, setUnivDem] = useState('');
  const [univInstitut, setUnivInstitut] = useState('');
  const [univDep, setUnivDep] = useState('');
  const [univAddress, setUnivAddress] = useState('');
  const [univTel, setUnivTel] = useState('');
  const [univSite, setUnivSite] = useState('');
  const [totalMark, setTotalMark] = useState('');
  const [evaluationNote, setEvaluationNote] = useState('');
  const [rankingNote, setRankingNote] = useState('');
  const [otherNotes, setOtherNotes] = useState('');

  // const [rendereredCertHash, setRendereredCertHash] = useState('');

  const [rendereredName, setRendereredName] = useState('');
  const [rendereredLastName, setRendereredLastName] = useState('');
  const [rendereredDob, setRendereredDob] = useState('');
  const [rendereredPod, setRendereredPod] = useState('');
  const [rendereredCardNumber, setRendereredCardNumber] = useState('');
  const [rendereredHolderEmail, setRendereredHolderEmail] = useState('');
  const [rendereredCertTitle, setRendereredCertTitle] = useState('');
  const [rendereredCertField, setRendereredCertField] = useState('');
  const [rendereredCertFaculty, setRendereredCertFaculty] = useState('');
  const [rendereredCertSpecialty, setRendereredCertSpecialty] = useState('');
  const [rendereredCertLevel, setRendereredCertLevel] = useState('');
  const [rendereredCertYear, setRendereredCertYear] = useState('');
  const [rendereredUnivDem, setRendereredUnivDem] = useState('');
  const [rendereredUnivDep, setRendereredUnivDep] = useState('');
  const [rendereredUnivInstitut, setRendereredUnivInstitut] = useState('');
  const [rendereredUnivAdress, setRendereredUnivAddress] = useState('');
  const [rendereredUnivTel, setRendereredUnivTel] = useState('');
  const [rendereredUnivSite, setRendereredUnivSite] = useState('');
  const [rendereredTotalMark, setRendereredTotalMark] = useState('');
  const [rendereredEvaluation, setRendereredEvaluation] = useState('');
  const [rendereredRanking, setRendereredRanking] = useState('');
  const [rendereredOtherNotes, setRendereredOtherNotes] = useState('');

  function HandleClick(e) {
    e.preventDefault();
    setRendereredName(name);
    setRendereredLastName(lastName);
    setRendereredDob(dob);
    setRendereredPod(pod);
    setRendereredCardNumber(cardNumber);
    setRendereredHolderEmail(holderEmail);
    setRendereredCertTitle(certTitle);
    setRendereredCertField(certField);
    setRendereredCertFaculty(certFaculty);
    setRendereredCertSpecialty(certSpecialty);
    setRendereredCertLevel(certLevel);
    setRendereredCertYear(certYear);
    setRendereredUnivDem(univDem);
    setRendereredUnivInstitut(univInstitut);
    setRendereredUnivDep(univDep);
    setRendereredUnivAddress(univAddress);
    setRendereredUnivTel(univTel);
    setRendereredUnivSite(univSite);
    setRendereredTotalMark(totalMark);
    setRendereredEvaluation(evaluationNote);
    setRendereredRanking(rankingNote);
    setRendereredOtherNotes(otherNotes);
  }

  const getPdfBlob = async () => {
    try {
      const blobPdf = await pdf(MyDocument(rendereredName, rendereredLastName, rendereredDob,
      rendereredPod, rendereredCardNumber, rendereredHolderEmail, rendereredCertTitle, rendereredCertField,
      rendereredCertFaculty, rendereredCertSpecialty, rendereredCertLevel, rendereredCertYear, rendereredUnivDem,
      rendereredUnivInstitut, rendereredUnivDep, rendereredUnivAdress, rendereredUnivTel, rendereredUnivSite,
      rendereredTotalMark, rendereredEvaluation, rendereredRanking, rendereredOtherNotes)).toBlob();
      return blobPdf;
    }
    catch(error) {
      console.log(error);
    }
  }

  async function submitToIpfs(e) {
    e.preventDefault();

    if(!name || !lastName || !dob || !pod || !cardNumber || !holderEmail || !certTitle ||
      !certField || !certFaculty || !certSpecialty || !certYear || !univDem || !univInstitut ||
      !univDep || !univAddress || !univTel || !univSite || !totalMark || !evaluationNote ||
      !rankingNote || !otherNotes ) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    else {
      setError('');
      const myPdf = await getPdfBlob();
      console.log(myPdf);
      console.log('submitting the form');
      const result = await ipfs.add(myPdf);
      console.log(result);
      const fileHash = result["path"];
      console.log(fileHash);
      setSuccess(`File uploaded to IPFS successfully, file hash: ${fileHash}`);
      setTimeout(() => {
        setSuccess("");
      }, 10000);
      // setRendereredCertHash(fileHash);
    }
  }

  const captureTestFile = async () => {
    const myPdf = await getPdfBlob();
    console.log(myPdf);
    console.log('submitting the form');
    const result = await ipfs.add(myPdf);
    console.log(result);
    const fileHash = result["path"];
    console.log(fileHash);
    setSuccess(`File uploaded to IPFS successfully, file hash: ${fileHash}`);
    setTimeout(() => {
      setSuccess("");
    }, 10000);
    // setRendereredCertHash(fileHash);
  }


  return (
    <>
    <div className='input-container'>
      <form className='input-form' onSubmit={HandleClick}>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}

        <div className='form-step-title-container'>
          <h3>1- Certificate Holder:</h3>
        </div>

          <div className='first-step-form-container'>
            <div className='first-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Name'
                  onChange = {(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Last Name'
                  onChange = {(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className='second-column-input'>
              <div className='form-element-container'>
                <input
                  type="date"
                  placeholder='Data of Birth'
                  onChange = {(e) => setDob(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Place of Birth'
                  onChange = {(e) => setPod(e.target.value)}
                />
              </div>
            </div>

            <div className='third-column-input'>
              <div className='form-element-container'>
                <input
                  type="number"
                  placeholder='Card Number'
                  onChange = {(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div className='form-element-container'>
                <input
                  type="email"
                  placeholder='Email'
                  onChange = {(e) => setHolderEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='form-step-title-container'>
            <h3>2- Certificate Information:</h3>
          </div>

          <div className='second-step-form-container'>

            <div className='first-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Title'
                  onChange = {(e) => setCertTitle(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Field'
                  onChange = {(e) => setCertField(e.target.value)}
                />
              </div>
            </div>

            <div className='second-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Faculty'
                  onChange = {(e) => setCertFaculty(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Specialty'
                  onChange = {(e) => setCertSpecialty(e.target.value)}
                />
              </div>
            </div>

            <div className='third-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Level'
                  onChange = {(e) => setCertLevel(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input type="number" min="1900" max="2099" step="1"
                  placeholder='Study Year'
                  onChange = {(e) => setCertYear(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='form-step-title-container'>
            <h3>3- The authority responsible for issuing the certificate:</h3>
          </div>

          <div className='third-step-form-container'>
            <div className='first-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder="Denomination"
                  onChange = {(e) => setUnivDem(e.target.value)}
                />
              </div>

              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder="Institut"
                  onChange = {(e) => setUnivInstitut(e.target.value)}
                />
              </div>
            </div>

            <div className='second-column-input'>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Departement'
                  onChange = {(e) => setUnivDep(e.target.value)}
                />
              </div>
              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Address'
                  onChange = {(e) => setUnivAddress(e.target.value)}
                />
              </div>
            </div>

            <div className='third-column-input'>
              <div className='form-element-container'>
                <input
                  type="number"
                  placeholder='Telephone'
                  onChange = {(e) => setUnivTel(e.target.value)}
                />
              </div>

              <div className='form-element-container'>
                <input
                  type="text"
                  placeholder='Website'
                  onChange = {(e) => setUnivSite(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='form-step-title-container'>
            <h3>4- Results: </h3>
          </div>

          <div className='forth-step-form-container'>
            <div className='form-element-container'>
              <input type="number" min="0" max="20" step="0.01"
                placeholder="The Total Mark Obtained"
                onChange = {(e) => setTotalMark(e.target.value)}
              />
            </div>
            <div className='form-element-container'>
              <input
                type="text"
                placeholder="Evaluation"
                onChange = {(e) => setEvaluationNote(e.target.value)}
              />
            </div>
            <div className='form-element-container'>
              <input
                type="text"
                placeholder='Ranking'
                onChange = {(e) => setRankingNote(e.target.value)}
              />
          </div>
        </div>
        <div className='form-element-container'>
          <input
            type="text"
            placeholder='Other Notes'
            onChange = {(e) => setOtherNotes(e.target.value)}
          />
        </div>

        <div className='buttons-container'>
          <Button type="submit"
            className='btnPreview'
            variant='dark'
            size='sm'
            onClick={() => setPopup(!popup)}
          >
            Preview
          </Button>
          <Button onClick={submitToIpfs} className='btnSubmit' size='sm'>Submit</Button>
        </div>
      </form>
    </div>
{/*
    <div>
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div> */}

  {/* <div>
    <button onClick={captureTestFile}>Test</button>
  </div> */}

    {popup && (
        <NewWindow title='Document Preview'>
          <div>
            <div className='PDFViewer-container'>
              <PDFViewer style={styles.viewer}>
                <MyDocument
                  name={rendereredName}
                  lastName={rendereredLastName}
                  dob={rendereredDob}
                  pod={rendereredPod}
                  cardNumber={rendereredCardNumber}
                  holderEmail={rendereredHolderEmail}
                  certTitle={rendereredCertTitle}
                  certField={rendereredCertField}
                  certFaculty={rendereredCertFaculty}
                  certSpecialty={rendereredCertSpecialty}
                  certLevel={rendereredCertLevel}
                  certYear={rendereredCertYear}
                  univDem={rendereredUnivDem}
                  univInstitut={rendereredUnivInstitut}
                  univDep={rendereredUnivDep}
                  univAddress={rendereredUnivAdress}
                  univTel={rendereredUnivTel}
                  univSite={rendereredUnivSite}
                  totalMark={rendereredTotalMark}
                  evaluationNote={rendereredEvaluation}
                  rankingNote={rendereredRanking}
                  otherNotes={rendereredOtherNotes}
                />
              </PDFViewer>
            </div>
          </div>
        </NewWindow>
      )}
    </>
  );
}

export default IssuePage;
