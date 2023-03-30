import React,{ useState } from "react";
import { Card,Grid,Button, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import PKI from "../../ethereum/PKI";
import web3 from "../../ethereum/web3";
import Certificate from "../../ethereum/Certificate";

function CertificateShow({summary, contractAddress}) {const [counter, setCounter] = React.useState(summary[3]);
  
  const [loading,setLoading] = useState(false);
  const [errorMessage,seterrorMessage] = useState("");

  const webAddress = "https://sepolia.etherscan.io/address/" + contractAddress;
  const findTime = (num) => {
    if(num < 1){
       return '0'
    };
    const qualifier = num => (num > 1 ? ' ' : '')
    const numToStr = (num, unit) => num > 0 ? ` ${num}
    ${unit}${qualifier(num)}` : ''
    const oneMinute = 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30.4375;
    const oneYear = oneDay * 365;
    const times = {
       Years: ~~(num / oneYear),
       Months: ~~((num% oneYear) / oneMonth),
       Days: ~~((num % oneMonth) / oneDay),
       Hours: ~~((num % oneDay) / oneHour),
       Min: ~~((num % oneHour) / oneMinute),
       Sec: num % oneMinute,
    };
    let str = '';
    for (let [key, value] of Object.entries(times)) {
       str += numToStr(times[key], key)
    }
    const arr = str.trim().split(',')
    const res = []
    arr.forEach((x, i) => {
       if (i % 2 === 0 && i !== 0) res.push(i === arr.length - 2 ? 'and' : ' ')
       res.push(x)
    })
    return res.join(" ").replace(/\s,/g, ',')
 }

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  function renderCards() {
    const CertificateOwner = summary[0],
      publicKey = summary[1],
      publicKeyAlgo = summary[2],
      valid = summary[4];
    let status = "";
    if(valid){
      status = "This Certificate is Valid."
    }else {
      status = "This Certificate has Expired."
    }
    const items = [
      {
        header: CertificateOwner,
        meta: "Owner's Account",
        description:
          "The owner owns the public key in this certificate.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: contractAddress,
        meta: "Address of the Contract",
        description:
          "The address on the blockchain where the current certificate has been stored.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: publicKey,
        meta: "Public Key",
        description:
          "This is the key which can be used to communicate with the owner of the key. They are a very integral feature of most modern verification systems.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: publicKeyAlgo,
        meta: "Algorithm associated with the Public Key",
        description:
          "The algorithm which is used in decryption and encryption using the given pair of public/private keys.",
      },
      {
        header: findTime(counter),
        meta: "Validity (seconds)",
        description:
          "The period for which the certificate is actually valid.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: status,
        meta: "Status of the Certificate",
        description: 
          "Shows if the Certificate is still valid or has it expired already."
      }
    ];

    return <Card.Group centered items={items} />;
  }

  const onClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    seterrorMessage("");

    try{
        const accounts = await web3.eth.getAccounts();
      await PKI.methods
        .terminateCertificate(accounts[0])
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
      <br />
      <br />
      <h3 class = 'ui one column stackable center aligned page grid'>Certificate Details :</h3>
      <br />
      <br />
      <div class = "">
      <Grid>
        <Grid.Row>
          <Grid.Column width={20}>{renderCards()}</Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      <br />
      <br />
      {/* <Message error header="Oops!" content={errorMessage} style={{width: "80%", marginLeft: "10%"}}/> */}
      <Button loading={loading} onClick={onClick} className="blue fluid ui button" style={{width: "60%", marginLeft: "20%"}}>
          Remove Certificate!
      </Button>
      <br /><br />
      <a target="_blank" href={webAddress} style={{color: "white"}}> 
      <button class="blue fluid ui button" style={{width: "80%", marginLeft: "10%"}}>
          View on EtherScan
      </button>
      </a>
    </Layout>
  );
};

CertificateShow.getInitialProps = async (props) => {
  const certificate = Certificate(props.query.address);
  const contractAddress = props.query.address;
  const summary = await certificate.methods.getSummary().call();
  return {
    summary,contractAddress
  };
};

export default CertificateShow;
