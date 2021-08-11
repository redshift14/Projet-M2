pragma solidity 0.8.6;
// SPDX-License-Identifier: MIT

contract Certification {

  string public name = 'Certification';
  uint public certCount = 0;
  address public owner;

  mapping( uint => Cert ) public certs;

  struct Cert {
    uint certId;
    string certHash;
    uint certSize;
    string studentName;
    string certTitle;
    string univName;
    uint uploadTime;
    address payable uploade;
  }

  event CertUploaded(
    uint certId,
    string certHash,
    uint certSize,
    string studentName,
    string certTitle,
    string univName,
    uint uploadTime,
    address payable uploader
  );

  constructor() {
    owner = msg.sender;
  }

  function uploadCert(
    string memory _certHash,
    uint _certSize,
    string memory _studentName,
    string memory _certTitle,
    string memory _univName
  ) public {
    require(bytes(_certHash).length > 0);
    require(bytes(_studentName).length > 0);
    require(bytes(_certTitle).length > 0);
    require(bytes(_univName).length > 0);
    require(msg.sender!=address(0));
    require(_certSize>0);
    certCount ++;
    // Add cert to the contract
    certs[certCount] = Cert(certCount, _certHash, _certSize, _studentName, _certTitle, _univName, block.timestamp, payable(owner));
    // Trigger an event
    emit CertUploaded(certCount, _certHash, _certSize, _studentName, _certTitle, _univName, block.timestamp, payable(owner));
  }
}
