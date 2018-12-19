const { User } = require("./../models");
const api = require("./../api");
const bcrypt = require("bcrypt");

exports.getAll = async (req, res, next) => {
  const allUsers = await api.getAll(User);
  return res.send(allUsers);
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

exports.findOne = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("body", req.body);
  if (typeof password === "undefined") return res.status(404).send({ message: "You must provide a password." });
  const user = await api.findOne(User, { email: email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.send(user);
    }
    return res.status(401).send({ message: "Bad credentials." });
  }
  return res.status(204).send();
};
