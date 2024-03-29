const jwtService = require("../services/jwt.services");

function verify(req, res, next) {
  let token = req.body.token || req.body.query || req.headers["x-access-token"];
  console.log(token);
  if (token) {
    // verify token
    try {
      req.decoded = jwtService.decode(token);
      next();
    } catch (err) {
      console.log(err);
      res.status(200).json({ success: false, message: "Token invalid." });
    }
  } else {
    res.status(500).json({ success: false, message: "No token provided." });
  }
}

module.exports = {
  verify,
};
