const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentSchema = new mongoose.Schema(
  {
    s_name: {
      type: String,
      required: true,
    },
    s_id: {
      type: String,
      required: true,
    },
    s_dob: {
      type: Date,
      required: true,
    },
    s_stream: {
      type: String,
      required: true,
    },
    s_college: {
      type: String,
      required: true,
    },
    s_emailid: {
      type: String,
      required: true,
    },
    s_mobileNo: {
      type: Number,
      required: true,
    },
    s_Batch: {
      type: Number,
      required: true,
    },
    s_CGPA: {
      type: Number,
      required: true,
    },
    s_Twelve: {
      type: Number,
      required: true,
    },
    s_Tenth: {
      type: Number,
      required: true,
    },
    s_ActiveBacklog: {
      type: Number,
      required: true,
    },
    s_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (req, res, next) {
  if (this.isModified("s_password")) {
    this.s_password = await bcrypt.hash(this.s_password, 8);
  }
  next();
});

studentSchema.statics.validateuserFirst = async ({ s_emailid, s_password }) => {
  console.log("in validateUserFirst");
  const user = await studentModel.findOne({ s_emailid });

  if (!user) {
    console.log("wrong email");
    throw new Error("wrong email");
  }

  const correctPassword = await bcrypt.compareSync(s_password, user.s_password);

  if (!correctPassword) {
    console.log("wrong password");
    throw new Error("wrong password");
  }

  console.log("Login authenticated SUCCESFULL");

  return user;
};

studentSchema.methods.generateToken = async function () {
  console.log("starting assigning token ");
  console.log(this);
  console.log("before assigenment of token");
  console.log(process.env.JWT_SECRET_TOKEN);
  const token = await jwt.sign(
    { _id: this._id.toString(), role: this.role },
    process.env.JWT_SECRET_TOKEN
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  console.log("Token hasbeen Assigened...");
  return token;
};

const studentModel = mongoose.model("user", studentSchema);

module.exports = studentModel;
