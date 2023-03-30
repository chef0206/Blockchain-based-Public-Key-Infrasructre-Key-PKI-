import { generateKeyPairSync } from "crypto";
import React from "react";
import Layout from "../../components/Layout";
function app({publicKey,privateKey}) {
  return (
    <Layout>
      <br />
      <a href="/rsa/keys"> 
          <button 
            class="blue fluid ui button" 
            style={{width: "60%", marginLeft: "20%"}}
            icon="add circle"
            content = "Generate Public Private Key Pair"
            primary
            >Generate Public Private Key Pair</button>
        </a>
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
  return { publicKey,privateKey };
};

export default app;