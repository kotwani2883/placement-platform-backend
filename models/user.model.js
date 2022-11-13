const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var titlize = require("mongoose-title-case");
var validate = require("mongoose-validator");
// mongoose.set("useCreateIndex", true);

// Backend mongoose validators
var nameValidator = [
  validate({
    validator: "matches",
    arguments: /^(([a-zA-Z]{3,10})+[ ]+([a-zA-Z]{3,10})+)+$/,
    message:
      "Name must have minimum 3 and maximum 20 character, Space in between the name, No special letters or numbers!",
  }),
  validate({
    validator: "isLength",
    arguments: [3, 20],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

var passwordValidator = [
  validate({
    validator: "matches",
    arguments: /^(?=.*?[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).{8,25}$/,
    message:
      "Password must have one lowercase, one uppercase, one special character, one number and minimum 8 and maximum 25 character",
  }),
  validate({
    validator: "isLength",
    arguments: [8, 25],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
];

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  personal_email: {
    type: String,
    required: true,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  post_code: {
    type: String,
  },
  gender: {
    type: String,
    default: "M",
  },
  college_name: {
    type: String,
    required: true,
  },
  college_email: {
    type: String,
    required: true,
  },
  college_id: {
    type: String,
    required: true,
  },
  college_course: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  sem1_cgpa: {
    type: Number,
    required: true,
  },
  sem2_cgpa: {
    type: Number,
    required: true,
  },
  sem3_cgpa: {
    type: Number,
    required: true,
  },
  sem4_cgpa: {
    type: Number,
    required: true,
  },
  sem5_cgpa: {
    type: Number,
    required: true,
  },
  sem6_cgpa: {
    type: Number,
  },
  sem7_cgpa: {
    type: Number,
  },
  sem8_cgpa: {
    type: Number,
  },
  aggregate_cgpa: {
    type: Number,
    required: true,
  },
  ActiveBacklog: {
    type: Number,
    required: true,
  },
  senior_marks: {
    type: Number,
  },
  senior_yop: {
    type: Number,
  },
  matric_marks: {
    type: Number,
    required: true,
  },
  matric_yop: {
    type: Number,
    required: true,
  },
  diploma_marks: {
    type: Number,
  },
  diploma_yop: {
    type: Number,
  },
  gap_yrs: {
    type: Number,
    required: true,
  },
  resume_url: {
    type: String,
  },
  linkedln_link: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  /*temporary token is generated for the forgot password feature */
  temporarytoken: {
    type: String,
  },
  permission: {
    type: String,
    required: true,
    default: "student",
  },
  placed_in: {
    type: Array,
    required: false,
  },
  companies_allowed: {
    type: Array,
    required: false,
  },
});

userSchema.pre("save", async function (req, res, next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
    console.log(this.password);
  }
  next();
});
userSchema.plugin(titlize, {
  // addition here also
  paths: ["address", "city", "state", "country"], // Array of paths
});

// Password compare method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
