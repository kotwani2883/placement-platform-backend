const User = require("../models/user.model");
const jwtService = require("../services/jwt.services");
//Register Working Successfully
exports.register = async (req, res) => {
  console.log(req.body);
  try {
    console.log("register", req.body);
    const user = new User(req.body);
    await user.save();
    console.log("user Saved Successfully");
    res.status(200).send({ status: true, user: user });
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
      }).select("college_id first_name last_name password permission");
      console.log(user);
      let validPassword = user.comparePassword(_b.password);
      console.log(_b.password);
      if (validPassword) {
        res.status(200).json({
          success: true,
          message: "User authenticated Successfully",

          user: user,
        });
        console.log(user);
        console.log("Yayy User Authenticated successfully");
      } else {
        res.status(400).json({
          success: false,
          message: "Incorrect password. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
};

exports.forgotPassword = async (req, res) => {
  const _b = req.body;
  if (!_b.college_id)
    res.status(200).json({ success: false, message: "Missing college ID" });
  else
    try {
      const user = await User.findOne({
        college_id: req.body.college_id.toUpperCase(),
      }).select("college_id college_email temporarytoken first_name last_name");
      if (!user) {
        res
          .status(200)
          .json({ success: false, message: "College ID not found." });
      } else {
        user.temporarytoken = jwtService.encode(user);
        let updateToken = await User.updateOne(
          { college_id: req.body.college_id.toUpperCase() },
          { temporarytoken: user.temporarytoken }
        );
        res.status(200).json({
          success: true,
          message:
            "Link to reset your password has been sent to your registered email.",
        });
        //TODO
        // const sendLink = await Mailer.sendDM(user, 'forgotPassword');
      }
    } catch (err) {
      console.error(err);
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    }
};

exports.me = async (req, res) => {
  const user = await User.findOne({ college_id: req.decoded.college_id })
    .select(
      "college_id first_name last_ gender department red_flags passout_batch permission"
    )
    .lean();

  if (!user) {
    res.status(500).json({ success: false, message: "User not found." });
  } else {
    res.send(user);
  }
};

exports.profile = async (req, res) => {
  let profile = await User.findOne({ college_id: req.query.college_id })
    .select("-temporarytoken -password ")
    .lean()
    .then((profile) => {
      console.log(profile);
      res.status(200).json({ success: true, profile: profile });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(404)
        .json({ success: false, message: "Something went wrong!" });
    });
};

exports.verifyToken = async (req, res) => {
  const _b = req.body;
  if (!_b.token) {
    res.status(200).json({ success: false, message: "No token provided." });
  } else {
    try {
      const user = await User.findOne({ temporarytoken: _b.token }).select(
        "college_id temporarytoken"
      );

      if (!user) {
        res.json({ success: false, message: "Link has been expired." });
      } else {
        res.status(200).json({ success: true, user: user });
      }
    } catch (err) {
      console.error(err);
      res
        .status(200)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
};

exports.permission = async (req, res) => {
  const user = await User.findOne({ college_id: req.decoded.college_id })
    .select("permission")
    .lean();

  if (!user) {
    res.status(500).json({ success: false, message: "User not found." });
  } else {
    res.status(200).json({ success: true, permission: user.permission });
  }
};
