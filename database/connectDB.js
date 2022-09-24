const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
const URL = process.env.MONGO_URL;
console.log("yes");
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully!!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
