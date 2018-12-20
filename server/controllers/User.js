const { User } = require("./../models");
const api = require("./../api");
const jwt = require("jsonwebtoken");
const { isPlainObject } = require("./../utils");
const { options: JWTOptions, privateKey: JWTPrivateKey } = require("./../utils/index").jwt;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.register = async (req, res, next) => {
  const { body } = req;
  const { name, email, password } = body;

  let message = "";

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    // create a new user
    const newUser = User({
      name,
      email,
      password: hash
    });

    // save the user
    const user = await newUser.save();
    message = "User created.";
    console.log(message);
  } catch (err) {
    console.error("Error: ", err);
    message = err;
  } finally {
    res.json({ message });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const match = await jwt.verify(req.token, JWTPrivateKey);
    if (!isPlainObject(match)) return res.sendStatus(403);
    const allUsers = await api.getAll(User);
    return res.json({ allUsers: allUsers.map(({ _id: id, email }) => ({ id, email })) });
  } catch (err) {
    console.error("error", err);
    return res.sendStatus(403);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const user = await api.findById(User, req.params.id);
    return res.json(user);
  } catch (error) {
    console.error("error");
    return res.status(204).send();
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (typeof password === "undefined") return res.status(404).json({ message: "You must provide a password." });
  const user = await api.findOne(User, { email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const { _id: id, email } = user;
      const token = await jwt.sign({ user: { id, email }, role: "ADMIN" }, JWTPrivateKey, {
        ...JWTOptions,
        subject: email
      });
      return res.json({ token });
    }
    return res.status(401).json({ message: "Bad credentials." });
  }
  return res.status(204).send();
};
