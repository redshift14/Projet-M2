pragma solidity >=0.5.0 <0.6.0;
// SPDX-License-Identifier: MIT

contract Certification {
    struct Cert {
        string certHash;
        uint certSize;
        string studentName;
        string certTitle;
        uint uploadTime;
        address uploader;
        uint index;
    }

    mapping (string => Cert) public certs;
    string[] public certIndex;

    event LogNewCert (string certHash, uint certSize, string studentName, string certTitle, uint uploadTime, address uploader, uint index);

    function isExist(string memory certHash) public view returns (bool isIndeed) {
        if(certIndex.length == 0) return false;
        return (compareStrings(certIndex[certs[certHash].index], certHash));
    }

    function insertCert(
        string memory _certHash,
        uint _certSize,
        string memory _certTitle,
        string memory _studentName
        ) public returns(uint _index) {

        certs[_certHash].certSize = _certSize;
        certs[_certHash].studentName = _studentName;
        certs[_certHash].certTitle = _certTitle;
        certs[_certHash].uploadTime = block.timestamp;
        certs[_certHash].uploader = msg.sender;
        certs[_certHash].index = certIndex.push(_certHash)-1;

        // certs[_certHash] = Cert(_certHash, _certSize, _studentName, block.timestamp, msg.sender, certIndex.push(_certHash)-1);

        emit LogNewCert(
            _certHash,
            _certSize,
            _studentName,
            _certTitle,
            block.timestamp,
            msg.sender,
            certs[_certHash].index
        );
        return certIndex.length -1;
    }

    function getCertsCount() public view returns (uint _count) {
        return certIndex.length;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}