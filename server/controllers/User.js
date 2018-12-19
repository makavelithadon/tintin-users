const { User } = require("./../models");
const api = require("./../api");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { isPlainObject } = require("./../utils");

// const privateKey = fs.readFileSync(path.resolve(__dirname, "..", "private.key"), "utf-8");

// Invalidate the private key and so the token if the server is stopped/restarted.
const privateKey = require("uuid").v4();

exports.getAll = async (req, res, next) => {
  try {
    const match = await jwt.verify(req.token, privateKey);
    if (!isPlainObject(match)) return res.sendStatus(403);
    const allUsers = await api.getAll(User);
    return res.send(allUsers);
  } catch (err) {
    console.error("error", err);
    return res.sendStatus(403);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const user = await api.findById(User, req.params.id);
    return res.send(user);
  } catch (error) {
    console.error("error");
    return res.status(204).send();
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof password === "undefined") return res.status(404).send({ message: "You must provide a password." });
  const user = await api.findOne(User, { email: email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { _id: id, email } = user;
      const token = await jwt.sign({ user: { id, email } }, privateKey, { expiresIn: "1d" });
      return res.send({ token });
    }
    return res.status(401).send({ message: "Bad credentials." });
  }
  return res.status(204).send();
};
