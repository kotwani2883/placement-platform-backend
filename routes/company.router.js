const router = require("express").Router();
const companyController = require("../controller/company.controller");
const jwtMiddleware = require("../middlewares/jwt.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
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
  "/getOne/:company_id",
  //   jwtMiddleware.verify,
  //   authMiddleware.ensureLoggedIn,
  companyController.getOne
);
router.get("/getAllCompanies", companyController.getAllCompanies);

module.exports = router;
