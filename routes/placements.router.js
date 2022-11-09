const router = require("express").Router();
const placementsController = require("../controller/placements.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/add",
  jwtMiddleware.verify,
  authMiddleware.ensureCoordinator,
  placementsController.add
);

module.exports = router;
