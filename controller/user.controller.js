const User = require("../models/user.model");
const jwtService = require("../services/jwt.services");
//Register Working Successfully
exports.register = async (req, res) => {
  try {
    console.log("register", req.body);
    const user = new User(req.body);
    await user.save();
    console.log("user Saved Successfully");
    res.status(200).send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "server error" });
  }
};
//TODO CHeck Login
exports.login = async (req, res) => {
  const _b = req.body;

  if (!_b.college_id || !_b.password) {
    res
      .status(500)
      .json({ success: false, message: "Ensure you filled all the entries." });
  } else {
    try {
      const user = await User.findOne({
        college_id: req.body.college_id.toUpperCase(),
      }).select("college_id student_name password");
      console.log(user);
      let validPassword = user.comparePassword(_b.password);
      console.log(_b.password);
      if (validPassword) {
        let token = jwtService.encode(user);
        res.status(200).json({
          success: true,
          message: "User authenticated Successfully",
          token: token,
        });
        console.log("Yayy User Authenticated successfully");
      } else {
        res.status(500).json({
          success: false,
          message: "Incorrect password. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
};
