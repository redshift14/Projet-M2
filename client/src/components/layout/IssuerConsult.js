import React, {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function IssuerConsult() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // const url = 'https://ipfs.infura.io/ipfs/Qmf7Pxjzht2A8XNFpmLQXbsGNh45LcnwLnSRkFW3gsYj7i'
  ;

  return (
    <div>
      <h1>This page where you consult previous documents</h1>
    </div>
  );
}

export default IssuerConsult;
