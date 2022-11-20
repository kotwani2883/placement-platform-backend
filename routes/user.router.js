const router = require("express").Router();
const userController = require("../controller/user.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.get(
  "/me",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
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
router.get("/totalStudents", userController.totalStudents);
router.get("/PlacedStudents", userController.PlacedStudents);
router.post("/PlacedDetails", userController.PlacedDetails);
module.exports = router;
