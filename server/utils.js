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
