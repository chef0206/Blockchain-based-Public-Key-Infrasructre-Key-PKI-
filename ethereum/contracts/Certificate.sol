pragma solidity ^0.4.17;

contract CertificatePKI {
    address[] public deployedCertificates;
    mapping(address => address) public certificates;
    address public rootManager;

    function CertificatePKI() public {
        rootManager = msg.sender;
    }

    function createCertificate(string publicKey, string publicKeyAlgo, uint requestedValidity /*in years*/) public {
        // require(verifyUser(/*details*/));
        // require(verifyFieldDetails(/*details*/));
        address newCertificate = new Certificate(msg.sender, publicKey, publicKeyAlgo, requestedValidity);
        deployedCertificates.push(newCertificate);
        certificates[msg.sender] = newCertificate;
    }

    function terminateCertificate(address user) public {
        require(msg.sender == user || msg.sender == rootManager); 
        delete deployedCertificates[1];
        delete certificates[user];
    }

    function getDeployedCertificates() public view returns (address[]) {
        return deployedCertificates;
    }
}

contract Certificate {
    address public CertificateOwner;
    string public publicKey;
    string public publicKeyAlgo;
    uint public validity;
    uint[] public renewals;

    function Certificate(address applicant, string suggestedKey, string suggestedAlgo, uint requestedValidity) public {
        CertificateOwner = applicant;
        publicKey = suggestedKey;
        publicKeyAlgo = suggestedAlgo;
        validity = now + requestedValidity*60*60*24*365;
    }

    function extendCertificate(uint requestedExtension) public {
        validity = requestedExtension*60*60*24*365 + now;
        renewals.push(now);
    }

    function isValid() public view returns (bool) {
        if(validity<=now){
            return false;
        } else {
            return true;
        }
    }

    function terminateCertificate() public {
        validity = now;
    }

    function getRenewals() public view returns (uint[]) {
        return renewals;
    }

    function getSummary() public view returns (
      address, string, string, uint, bool
      ) {
        bool valid=true;
        if (validity<=now){
            valid = false;
        }
        return (
          CertificateOwner,
          publicKey,
          publicKeyAlgo,
          validity-now,
          valid
        );
    }
}