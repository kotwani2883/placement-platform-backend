const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.s_name = !isEmpty(data.s_name) ? data.s_name : "";
  data.s_id = !isEmpty(data.s_id) ? data.s_id : "";
  data.s_dob = !isEmpty(data.s_dob) ? data.s_dob : "";
  data.s_stream = !isEmpty(data.s_stream) ? data.s_stream : "";
  data.s_college = !isEmpty(data.s_college) ? data.s_college : "";
  data.s_emailid = !isEmpty(data.s_emailid) ? data.s_emailid : "";
  data.s_mobileNo = !isEmpty(data.s_mobileNo) ? data.s_mobileNo : "";
  data.s_Batch = !isEmpty(data.s_Batch) ? data.s_Batch : "";
  data.s_CGPA = !isEmpty(data.s_CGPA) ? data.s_CGPA : "";
  data.s_Twelve = !isEmpty(data.s_Twelve) ? data.s_Twelve : "";
  data.s_Tenth = !isEmpty(data.s_Tenth) ? data.s_Tenth : "";
  data.s_ActiveBacklog = !isEmpty(data.s_ActiveBacklog)
    ? data.s_ActiveBacklog
    : "";
  data.s_PlacementStatus = !isEmpty(data.s_PlacementStatus)
    ? data.s_PlacementStatus
    : "";
  data.s_password = !isEmpty(data.s_password) ? data.s_password : "";
  data.s_password2 = !isEmpty(data.s_password2) ? data.s_password2 : "";

  // Name checks
  if (Validator.isEmpty(data.s_name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.s_id)) {
    errors.name = "Id field is required";
  }
  if (Validator.isEmpty(data.s_dob)) {
    errors.name = "Date of Birth field is required";
  }

  if (Validator.isEmpty(data.s_id)) {
    errors.name = "Id field is required";
  }

  if (Validator.isEmpty(data.s_stream)) {
    errors.name = "Stream field is required";
  }

  if (Validator.isEmpty(data.s_college)) {
    errors.name = "College field is required";
  }

  if (Validator.isEmpty(data.s_mobileNo)) {
    errors.name = "Mobile Number field is required";
  }

  if (Validator.isEmpty(data.s_Batch)) {
    errors.name = "Batch field is required";
  }
  if (Validator.isEmpty(data.s_CGPA)) {
    errors.name = "CGPA field is required";
  }

  if (Validator.isEmpty(data.s_Twelve)) {
    errors.name = "Twelve Percentage field is required";
  }

  if (Validator.isEmpty(data.s_Tenth)) {
    errors.name = "Tenth Percentage field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.s_emailid)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.s_password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.s_password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.s_password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.s_password, data.s_password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
