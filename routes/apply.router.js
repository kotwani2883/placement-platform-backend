const router = require("express").Router();
const applyController = require("../controller/apply.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/oneClickApply",
  jwtMiddleware.verify,
  authMiddleware.ensureStudentWithCompleteProfile,
  applyController.oneClickApply
);

module.exports = router;
