const path = require("path");
const fs = require("fs");
const NodeRSA = require("node-rsa");

// const privateKey = fs.readFileSync(path.resolve(__dirname, "..", "private.key"), "utf-8");

// Invalidate the private key and so the token if the server is stopped/restarted.
const RSAKey = new NodeRSA(fs.readFileSync(path.resolve(__dirname, "..", "jwt-private-key"), "UTF-8"));

const UniqID = require("uuid").v4();
const JWTPrivateKey = RSAKey.encrypt(UniqID, "base64");

module.exports = {
  options: {
    expiresIn: "1d",
    issuer: `My Tintin React Application`
  },
  privateKey: JWTPrivateKey
};
