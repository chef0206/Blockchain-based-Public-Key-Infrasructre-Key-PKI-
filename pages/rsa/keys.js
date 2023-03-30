import { generateKeyPairSync } from "crypto";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { CopyToClipboard } from "react-copy-to-clipboard";
// reactstrap components
import { Button, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "../../routes";
// import fs_extra from "fs-extra";
import { privateEncrypt } from "crypto";

function app({publicKey,privateKey}) {
// function decryptString(ciphertext) {
    
//   // console.log(privateKey);
//   // privateKey = fs.readFileSync(privateKeyFile, "utf8");
//   // console.log(privateKey);
//   // privateDecrypt() method with its parameters
//   const decrypted = crypto.publicDecrypt(publicKey,
//       Buffer.from(ciphertext, "base64")
//   );
  
//   return decrypted.toString("utf8");
// }
  return (
    <Layout>

      <br />
        <h2>Public Key:</h2>
      <div style={{border: "solid black 10px", borderRadius: "10%", width: "70%", marginLeft: "15%"}}>
        <p style={{width: "60%", marginLeft: "15%"}}>{publicKey}</p>
      </div>
      <br /><br />
      <Col>
          <CopyToClipboard
            text={publicKey}
          >
            <Button
              className="blue fluid ui button btn-icon-clipboard" 
              style={{width: "60%", marginLeft: "20%"}}
              id="tooltip982655500"
              type="button"
            >
              <div>
                <i className="ni ni-active-40" />
                <span>Copy Public Key</span>
              </div>
            </Button>
          </CopyToClipboard>
          <UncontrolledTooltip
            delay={0}
            trigger="hover focus"
            target="tooltip982655500"
          >
          </UncontrolledTooltip>
        </Col>
      <br /><br />
      <h2>Private Key:</h2>
      <div style={{border: "solid black 10px", borderRadius: "10%", width: "70%", marginLeft: "15%"}}>
        <p style={{width: "60%", marginLeft: "15%"}}>{privateKey}</p>
      </div>
      <br /><br />

      <Col>
          <CopyToClipboard
            text={privateKey}
          >
            <Button
              className="blue fluid ui button btn-icon-clipboard" 
              style={{width: "60%", marginLeft: "20%"}}
              id="tooltip982655500"
              type="button"
            >
              <div>
                <i className="ni ni-active-40" />
                <span>Copy Private Key</span>
              </div>
            </Button>
          </CopyToClipboard>
          <UncontrolledTooltip
            delay={0}
            trigger="hover focus"
            target="tooltip982655500"
          >
          </UncontrolledTooltip>
        </Col>
    </Layout>

  )
}

app.getInitialProps = async () => {
  const keyPair = generateKeyPairSync("rsa", {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: "",
        },
    });
    const publicKey=keyPair.publicKey;
    const privateKey=keyPair.privateKey;
    // fs_extra.writeFileSync("public_key", keyPair.publicKey);
    // fs_extra.writeFileSync("private_key", keyPair.privateKey);
  return { publicKey,privateKey };
};

export default app;