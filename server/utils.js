const { isEmail } = require("validator");

exports.isEmail = function(chain) {
  return isEmail(chain);
};

exports.isValidPassword = function isValidPassword(chain) {
  return new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})").test(chain);
};
