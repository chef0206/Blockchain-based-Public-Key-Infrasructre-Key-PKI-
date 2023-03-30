import web3 from './web3';
import CertificatePKI from './build/CertificatePKI.json';

const instance = new web3.eth.Contract(
  JSON.parse(CertificatePKI.interface),
  '0xfdE07f977627c13Ab33B404980a869193Ab22a67'
);

export default instance;