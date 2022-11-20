const router = require("express").Router();
const companyController = require("../controller/company.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const { route } = require("./user.router");

router.get(
  "/getAll",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
  companyController.getAll
);
router.post(
  "/add",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureCoordinator,
  companyController.add
);
router.get(
  "/getOne",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
  companyController.getOne
);

router.get("/getAllCompanies", companyController.getAllCompanies);
router.post("/validate", companyController.validate);
router.get("/getCountOfAllCompanies", companyController.getCountOfAllCompanies);
module.exports = router;
