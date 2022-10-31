const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");
require("dotenv").config();

const adminAuth = async (req, res, next) => {
  try {
    console.log("starting authentication..");
    const tokenFromRequest = req.cookies.token;
    console.log(tokenFromRequest);
    const decodedUsingJwt = await jwt.verify(
      tokenFromRequest,
      process.env.JWT_SECRET_TOKEN
    );
    console.log(decodedUsingJwt);
    if (decodedUsingJwt.role !== "admin") {
      throw new Error();
      return;
    }
    const validUser = await studentModel.findOne({
      _id: decodedUsingJwt._id,
      "tokens.token": tokenFromRequest,
    });
    if (!validUser) {
      throw new Error();
    }
    req.tokenFromAuthRequest = tokenFromRequest;
    req.validUser = validUser;
    console.log("Done Authenticatio Process of..", validUser.s_Name);
    next();
  } catch (e) {
    console.log("auth", e);
    res
      .status(500)
      .send({ error: "Sorry We are not able to provide you resource..." });
  }
};

module.exports = adminAuth;
