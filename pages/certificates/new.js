import React, { Component, useEffect, useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import PKI from "../../ethereum/PKI";
import web3 from "../../ethereum/web3";
import {Router} from "../../routes"

function CertificateNew() {

    const [errorMessage,seterrorMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [publicKey,setpublicKey] = useState("");
    const [publicKeyAlgo,setpublicKeyAlgo] = useState("");
    const [requestedValidity, setrequestedValidity] = useState();
    const [encryptedAccount, setencryptedAccount] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        seterrorMessage("");

        try{
            const accounts = await web3.eth.getAccounts();
          await PKI.methods
            .createCertificate(publicKey, publicKeyAlgo, requestedValidity)
            .send({
              from: accounts[0],
            });
            Router.pushRoute("/");
        } catch (err) {
            seterrorMessage(err.message);
          }
          setLoading(false);
      }

    return (
      <Layout>
      <h1 className="center aligned ui header">Create Campaign</h1>
      <br />
      <Form className="big" onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label style={{marginLeft: "10%"}}>Enter your Public Key: </label>
          <input
            maxlength="266" minlength="216"
            style={{width: "80%", marginLeft: "10%"}}
            // label="wei"
            // labelPosition="right"
            value={publicKey}
            onChange={(event) => setpublicKey(event.target.value)
            }
          />
        </Form.Field>
        {/* <Form.Field>
          <label style={{marginLeft: "10%"}}>Enter your Account number encrypted with your private key: </label>
          <Input
            style={{width: "80%", marginLeft: "10%"}}
            // label="wei"
            // labelPosition="right"
            value={encryptedAccount}
            onChange={(event) => setencryptedAccount(event.target.value)
            }
          />
        </Form.Field> */}
        <Form.Field>
          <label style={{marginLeft: "10%"}}>Enter the Algorithm your key uses:</label>
          <select id="cars" name="cars" style={{width: "80%", marginLeft: "10%"}} onChange={(event) => setpublicKeyAlgo(event.target.value)}>
            <option value="">--No Value Selected--</option>
            <option value="RSA">RSA</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label style={{marginLeft: "10%"}}>Requested Certificate Validation? (Years)</label>
          <Input 
            style={{width: "80%", marginLeft: "10%"}}
            // label="wei"
            // labelPosition="right"
            value={requestedValidity}
            onChange={(event) => setrequestedValidity(event.target.value)
            }
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <br />
        <Button 
            class="blue fluid ui button" 
            style={{width: "60%", marginLeft: "20%"}}
            icon="add circle"
            content = "Create!"
            primary
            loading={loading}
        />
      </Form>
    </Layout>
    );
}

export default CertificateNew;