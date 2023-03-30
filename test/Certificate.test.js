// Not Working

const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledPKI = require("../ethereum/build/CertificatePKI.json");
const compiledCertificate = require("../ethereum/build/Certificate.json");

let accounts;
let PKI;
let certificateAddress;
let certificate;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  PKI = await new web3.eth.Contract(JSON.parse(compiledPKI.interface))
    .deploy({ data: compiledPKI.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await PKI.methods.createCertificate("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [certificateAddress] = await PKI.methods.getDeployedCertificates().call();
  certificate = await new web3.eth.Contract(
    JSON.parse(compiledCertificate.interface),
    certificateAddress
  );
});

describe("Certificates", () => {
  it("deploys a PKI and a certificate", () => {
    assert.ok(PKI.options.address);
    assert.ok(certificate.options.address);
  });

  it("marks caller as the certificate manager", async () => {
    const manager = await certificate.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await certificate.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await certificate.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await certificate.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await certificate.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await certificate.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await certificate.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await certificate.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await certificate.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await certificate.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
