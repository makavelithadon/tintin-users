const path = require("path");
const fs = require("fs");
const NodeRSA = require("node-rsa");

// const privateKey = fs.readFileSync(path.resolve(__dirname, "..", "private.key"), "utf-8");

// Invalidate the private key and so the token if the server is stopped/restarted.
const RSAKey = new NodeRSA(fs.readFileSync(path.resolve(__dirname, "..", "jwt-private-key"), "UTF-8"));

const UniqID = require("uuid").v4();
const JWTPrivateKey = RSAKey.encrypt(UniqID, "base64");

module.exports = {
  privateKey: JWTPrivateKey,
  options: {
    expiresIn: "1d",
    issuer: `My Tintin React Application`
  },
  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "undefined") {
      return res.sendStatus(403);
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
};
