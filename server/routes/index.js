const express = require("express");
const user = require("./../models");
const jwt = require("jsonwebtoken");
const { User } = require("./../models");
const { User: UserController } = require("./../controllers");
const { verifyToken } = require("./../utils");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

/* router.post("/register", async (req, res, next) => {
  const { body } = req;
  const { name, email, password } = body;

  console.log("====================================");
  console.log("name", name, "email", email, "password", password);
  console.log("====================================");

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
    res.send({ message });
  }
}); */

router.get("/users", verifyToken, UserController.getAll);

router.get("/users/:id", UserController.findById);

router.post("/login", UserController.login);

module.exports = router;
