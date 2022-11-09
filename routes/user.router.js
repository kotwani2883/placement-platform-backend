const router = require("express").Router();
const userController = require("../controller/user.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post(
  "/me",
  jwtMiddleware.verify,
  authMiddleware.ensureLoggedIn,
  userController.me
);
router.get(
  "/profile",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
  userController.profile
);

router.get(
  "/permission",
  jwtMiddleware.verify,
  authMiddleware.ensureLoggedIn,
  userController.permission
);
module.exports = router;
