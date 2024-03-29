const router = require("express").Router();
const announcementController = require("../controller/announcement.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/add",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureCoordinator,
  announcementController.add
);

router.get(
  "/getAll",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
  announcementController.getAll
);

module.exports = router;
