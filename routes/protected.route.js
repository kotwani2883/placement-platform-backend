const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth.middleware");

router.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/api/auth", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

module.exports = router;
