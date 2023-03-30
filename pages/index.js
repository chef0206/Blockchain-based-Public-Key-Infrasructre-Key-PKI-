import React from "react";
import { Card, Button } from "semantic-ui-react";
import PKI from "../ethereum/PKI";
import Layout from "../components/Layout";
import { Link } from "../routes";

function CertificateIndex ({certificates}) {
    function renderCertificate() {
        const items = certificates.map(address => {
            return {
                header: address,
                description: (
                  <Link route={`/certificates/${address}`}>
                    <a>View Certificate</a>
                  </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group style={{width: "80%", marginLeft: "10%"}} items={items} />;
    }
    
    return (
      <Layout>
        <div>
          <h2 style={{marginLeft: "10%"}}><u>Issued Certificates</u></h2>
          {renderCertificate()}
        </div>
        <br /><br />
        <Link route="/certificates/new"> 
          <Button 
            class="blue fluid ui button" 
            style={{width: "60%", marginLeft: "20%"}}
            icon="add circle"
            content = "Create Certificate"
            primary
            />
        </Link>
      </Layout>
    )
}
  
CertificateIndex.getInitialProps = async () => {
    const certificates = await PKI.methods.getDeployedCertificates().call();
    // console.log(certificates);
    return { certificates };
};

export default CertificateIndex;