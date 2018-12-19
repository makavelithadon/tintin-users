const { isEmail } = require("validator");

exports.isEmail = function(chain) {
  return isEmail(chain);
};

exports.isValidPassword = function isValidPassword(chain) {
  return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(chain);
};

exports.isPlainObject = function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
};

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") {
    return res.sendStatus(403);
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
};
