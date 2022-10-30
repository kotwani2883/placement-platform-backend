const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.s_email = !isEmpty(data.s_email) ? data.s_email : "";
  data.s_password = !isEmpty(data.s_password) ? data.s_password : "";

  // Email checks
  if (Validator.isEmpty(data.s_email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.s_email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.s_password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
