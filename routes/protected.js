const express = require("express");
const router = express.Router();
const studentAuth = require("../middleware/studentAuth");

router.get("/auth", studentAuth, async (req, res) => {
  try {
    res.status(200).send({ status: true, user: req.validUser });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

module.exports = router;
