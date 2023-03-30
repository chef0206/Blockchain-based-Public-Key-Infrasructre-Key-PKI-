# PKI using Blockchain

This is a project that implements Public Key Infrastructure (PKI) using Blockchain technology. The project uses Solidity to write the smart contract and Ganache to deploy and test the contract. React was also used to deploy the project on a webpage.

## Project Overview

The project is designed to create a certificate for users based on their public keys. The certificate is generated using Blockchain technology, which ensures that it is secure and cannot be tampered with. The certificate includes information such as the user's name, public key, and other relevant details.

The smart contract is responsible for creating and managing the certificates. It allows users to submit their public keys, which are then verified and added to the Blockchain. Once added, the contract generates a certificate for the user, which can be accessed and verified by anyone.

React was used to deploy the project on a webpage, making it accessible to anyone with an internet connection. The webpage allows users to submit their public keys and receive their certificate. The certificate can also be verified on the webpage, ensuring its authenticity.

## Technologies Used

The following technologies were used in the project:

- Solidity: A programming language used to write smart contracts for Ethereum Blockchain.
- Ganache: A personal Blockchain for Ethereum development that allows for testing and deploying smart contracts.
- React: A JavaScript library used for building user interfaces.

### How to Run the Project

To run the project, follow these steps:

1. Clone the project repository from GitHub
2. Install all necessary dependencies using npm install
3. Start Ganache to deploy the smart contract using ganache-cli
4. Compile and deploy the smart contract using truffle migrate
5. Start the React application using npm start
6. Once the application is running, you can access it by navigating to http://localhost:3000 in your web browser.

Contributors
This was project was part of our Design Project.
