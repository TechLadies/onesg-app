/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const baseFolder = path.resolve();

const genKeyPair = () => {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  const keysFolder = `${baseFolder}/keys`;

  // create keys folder, if it doesnt exist
  try {
    if (!fs.existsSync(keysFolder)) {
      fs.mkdirSync(keysFolder);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return;
  }

  // Create the public key file
  fs.writeFileSync(`${baseFolder}/keys/id_rsa_pub.pem`, keyPair.publicKey);

  // Create the private key file
  fs.writeFileSync(`${baseFolder}/keys/id_rsa_priv.pem`, keyPair.privateKey);
};

// Generate the keypair
genKeyPair();
