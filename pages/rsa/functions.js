let publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCy5flsuxdRmdZ2RGg9MVsjwQkz
vAx4/k0Ad9pvvIFnBYQda7Dq1ABGGliPEp26eitSqe9MJ3V3awNmmugdmfq0HK1Y
E9n/f4Zx0VzUHoqeeFGd4PRpSm1LkxQWx4+9JYSHH4UYWv6sgmEP99sFYToO6QxR
PWfxMTD36DK2fxpMGwIDAQAB
-----END PUBLIC KEY-----`;
let privateKey = 
`-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIC3TBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIztuK9yCgmMYCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAePQRvlx42Vh7sX3NMIsDbBIIC
gLPAriC74peUmOtTWI9bNg2ndzIKg4/4pT+LlZe6CigdXMGe67CSVPwvvld+P12o
F58TzkPubY5uaey7x+HraZb0gw+k0xQrD0xCVLSprBrh+N0mBGm2u6ha0ivKzmBJ
3FtzeNpGdwzNc7UwWzdv8a9aL3rP/B3VknN4f+7X9k9u2rrnVnS4zhSjq9LhrY4F
/3OyAzENGoYOZv7wiS4c/JR5KmQrtBdqHyX6Zx/aafEv0zWlYQEoyo6VP2UOZnFZ
GDCQAKOLPbwvM6BtlolXHvaWNod+EDQ5JMmOYlEY7OOvpT4wWo92Qjs/wISQfMU9
kqMviOwqOsQWFRxZBoFeNoW7PF5yZ5ej2pEqaQXlKvceK20BvSkC1VESuRSTX3J1
gU1auNa+xtudcBtoMfwvvmn69tuUffDv0/lJvQZCKIvO6y0q1ec3lomfZE50sugV
GBKFDUnFv+XxFzfRkktlk2Ya0hmFImEzNbPYqbNUDUR52Qzc2tW7MWUDE+fd2rjG
jCC2H9haOJnliqNWGlANdZpUTzrBm1mI8bjpBLwkuVOd9I+nld4Kyby6ZgP5fVZp
VR42v66lVrWYMPw8IUB163+HmLz0yz4woquGwE9FpDO4/458Y6dU2RW6sKEdDS8Y
sOQYxUu5MdrrHji4refKjkPQf6gp92aoKVjLRVlKj11iFj7VlNNuNxkOKXngrd3U
V+UBeZOHGphU3a7f8/tcu2T6x1fd6ZMMcQl9Gb1ojHZOFsCH3mh1wXWemvPFqeCk
SxtwEaHZXrtI8GzWPs3SJGvH/gcE9FggAu9vOFImIXLyaRceGqeG4gs4DvyOFVb+
S5gpWgF5M8S8aXN2h1jihhI=
-----END ENCRYPTED PRIVATE KEY-----`;
// import crypto from "crypto"
// Including crypto and fs module
const crypto = require("crypto");
const fs = require("fs");


// Using a function generateKeyFiles
// function generateKeyFiles() {
//     const keyPair = crypto.generateKeyPairSync("rsa", {
//         modulusLength: 1024,
//         publicKeyEncoding: {
//             type: "spki",
//             format: "pem",
//         },
//         privateKeyEncoding: {
//             type: "pkcs8",
//             format: "pem",
//             cipher: "aes-256-cbc",
//             passphrase: "",
//         },
//     });
//     // publicKey=keyPair.publicKey;
//     // privateKey=keyPair.privateKey;

//     // Creating public and private key file
//     // fs.writeFileSync("public_key", keyPair.publicKey);
//     // fs.writeFileSync("private_key", keyPair.privateKey);
// }
// // Generate keys
// generateKeyFiles();

// Creating a function to encrypt string
function encryptString(plaintext) {

    // console.log(publicKey);
    // publicKey = fs.readFileSync(publicKeyFile, "utf8");
    // console.log(publicKey);
    // publicEncrypt() method with its parameters
    const encrypted = crypto.privateEncrypt({
        key: privateKey,
        passphrase: "",
    }, Buffer.from(plaintext,'utf8'));

    return encrypted.toString("base64");
}

// Creating a function to decrypt string
function decryptString(ciphertext) {

    // console.log(privateKey);
    // privateKey = fs.readFileSync(privateKeyFile, "utf8");
    // console.log(privateKey);
    // privateDecrypt() method with its parameters
    const decrypted = crypto.publicDecrypt(publicKey,
        Buffer.from(ciphertext, "base64")
    );
    
    return decrypted.toString("utf8");
}

// Defining a text to be encrypted
const plainText = "0x53C658f54b81AE46A10Fc68cee229aE1Fb6f6F67";

// Defining encrypted text
const encrypted = encryptString(plainText, "./public_key");

// Prints plain text
console.log("Plaintext:", plainText);
console.log();

// Prints buffer of encrypted content
console.log("Encrypted Text: ", encrypted);
console.log();

// Prints buffer of decrypted content
console.log("Decrypted Text: ", decryptString(encrypted, "private_key"));