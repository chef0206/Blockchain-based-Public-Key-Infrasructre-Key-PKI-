const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledPKI = require('./build/CertificatePKI.json');

const provider = new HDWalletProvider(
  'tackle solution rubber truly silent barrel cable clarify siege despair soup adult',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/c2912201169345118b996f78d5ec1321'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledPKI.interface)
  )
    .deploy({ data: compiledPKI.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
