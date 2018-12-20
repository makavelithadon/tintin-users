const { User } = require("./../models");
const api = require("./../api");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isPlainObject } = require("./../utils");
const { options: JWTOptions, privateKey: JWTPrivateKey } = require("./../utils/index").jwt;

exports.getAll = async (req, res, next) => {
  try {
    const match = await jwt.verify(req.token, JWTPrivateKey);
    if (!isPlainObject(match)) return res.sendStatus(403);
    const allUsers = await api.getAll(User);
    return res.send(allUsers.map(({ _id: id, email }) => ({ id, email })));
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
      const token = await jwt.sign({ user: { id, email }, role: "ADMIN" }, JWTPrivateKey, {
        ...JWTOptions,
        subject: email
      });
      return res.send({ token });
    }
    return res.status(401).send({ message: "Bad credentials." });
  }
  return res.status(204).send();
};
