const express = require("express");
const user = require("./../models");
const jwt = require("jsonwebtoken");
const { User } = require("./../models");
const { User: UserController } = require("./../controllers");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

router.post("/register", async (req, res, next) => {
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
});

router.get("/users", UserController.getAll);

router.get("/users/:id", UserController.findById);

router.post(
  "/login",
  UserController.findOne /* (req, res, next) => {
  const { body } = req;
  console.log("req.body", req.body);
  const { username } = body;
  const { password } = body;

  //checking to make sure the user entered the correct username/password combo
  if (username === user.username && password === user.password) {
    //if user log in success, generate a JWT token for the user with a secret key
    jwt.sign({ user }, "privatekey", { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.log(err);
      }
      res.send(token);
    });
  } else {
    console.log("ERROR: Could not log in");
  }
} */
);

//This is a protected route
router.get("/data", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, "privatekey", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      //If token is successfully verified, we can send the autorized data
      res.json({
        message: "Successful log in",
        authorizedData
      });
      console.log("SUCCESS: Connected to protected route");
    }
  });
});

module.exports = router;
