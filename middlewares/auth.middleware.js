let User = require("../models/user.model");

// Only allows Admin & Faculty Coordinators

function ensureCoordinator(req, res, next) {
  if (!req.decoded.college_id) {
    res.status(200).json({ success: false, message: "Please login." });
  } else {
    User.findOne({ college_id: req.decoded.college_id })
      .select("permission")
      .lean()
      .then((user) => {
        if (user.permission === "admin" || user.permission === "coordinator") {
          next();
        } else {
          res.status(200).json({
            success: false,
            message:
              "Insufficient Permission. Only Admin & Faculty is allowed.",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(200)
          .json({ success: false, message: "Something went wrong!" });
      });
  }
}

function ensureStudent(req, res, next) {
  if (!req.decoded.college_id) {
    res.status(200).json({ success: false, message: "Please login." });
  } else {
    User.findOne({ college_id: req.decoded.college_id })
      .select("permission")
      .lean()
      .then((user) => {
        if (user.permission === "student") {
          next();
        } else {
          res.status(200).json({
            success: false,
            message: "Insufficient Permission. Only student is allowed.",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(200)
          .json({ success: false, message: "Something went wrong!" });
      });
  }
}

function ensureStudentWithCompleteProfile(req, res, next) {
  if (!req.decoded.college_id) {
    res.status(200).json({ success: false, message: "Please login." });
  } else {
    User.findOne({ college_id: req.decoded.college_id })
      .select("permission resume_url address")
      .lean()
      .then((user) => {
        if (user.permission === "student") {
          if (user.resume_url && user.address) {
            next();
          } else {
            if (!user.resume_url) {
              res.status(200).json({
                success: false,
                message:
                  "Sorry, We could not find your resume. Head over to profile page to upload it.",
              });
            } else {
              res.status(200).json({
                success: false,
                message:
                  "Sorry, Complete your profile. Head over to profile page.",
              });
            }
          }
        } else {
          res.status(200).json({
            success: false,
            message:
              "Insufficient Permission. Only Admin & Faculty is allowed.",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(200)
          .json({ success: false, message: "Something went wrong!" });
      });
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.decoded.college_id) {
    res.status(200).json({ success: false, message: "Please login." });
  } else {
    next();
  }
}

module.exports = {
  ensureCoordinator,
  ensureStudent,
  ensureStudentWithCompleteProfile,
  ensureLoggedIn,
};
