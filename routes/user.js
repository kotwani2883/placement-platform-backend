const express = require("express");
const studentAuth = require("../middleware/studentAuth");
const studentModel = require("../models/studentModel");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const coordinatorAuth = require("../middleware/CoordinatorAuth");

//signup route
router.post("/register", async (req, res) => {
  try {
    console.log("register", req.body);
    const user = new studentModel(req.body);
    await user.save();
    console.log("user Saved Successfully");
    res.status(200).send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "server error" });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    console.log("login", req.body);
    const validatedUser = await studentModel.validateuserFirst(req.body);
    console.log(validatedUser);
    const token = await validatedUser.generateToken();
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .send({ status: true, user: validatedUser });
    console.log("User login successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/", studentAuth, async (req, res) => {
  try {
    // this is for memory purpose
    console.log("Logged out ...");
    req.validUser.tokens = req.validUser.tokens.filter((token) => {
      console.log("inside filter", token.token, req.tokenFromAuthRequest);
      return token.token !== req.tokenFromAuthRequest;
    });
    await req.validUser.save();
    console.log("Logged out ...");
    res.send({ msg: "Logged out ..." });
  } catch (e) {
    console.log("1");
    console.log("catch", e);
    res.status(500).send(e);
  }
});

router.get("/home", studentAuth, async (req, res) => {
  try {
    res
      .status(200)
      .send({ status: true, user: req.validUser, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/student", studentAuth, async (req, res) => {
  try {
    res
      .status(200)
      .send({ status: true, user: req.validUser, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/coordinator", coordinatorAuth, async (req, res) => {
  try {
    res
      .status(200)
      .send({ status: true, user: req.validUser, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/admin", adminAuth, async (req, res) => {
  try {
    res
      .status(200)
      .send({ status: true, user: req.validUser, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/student/auth", studentAuth, async (req, res) => {
  try {
    res.status(200).send({ status: true, message: "auth completed " });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, user: req.validUser, message: "server error " });
  }
});

router.get("/admin/auth", adminAuth, async (req, res) => {
  try {
    console.log("admin auth");
    res.status(200).send({ status: true, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/coordinator/auth", coordinatorAuth, async (req, res) => {
  try {
    console.log("coordinatorAuth auth");
    res.status(200).send({ status: true, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/coordinator/logout", coordinatorAuth, async (req, res) => {
  try {
    console.log("coordinator logging out ");
    req.validUser.tokens = req.validUser.tokens.filter((token) => {
      return token.token !== req.cookies.token;
    });
    await req.validUser.save();

    res.status(200).send({ status: false, message: "ssuccesfully logout  " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error in logout " });
  }
});

router.get("/student/logout", studentAuth, async (req, res) => {
  try {
    console.log("student logging out");
    req.validUser.tokens = req.validUser.tokens.filter((token) => {
      return token.token !== req.cookies.token;
    });
    const save = await req.validUser.save();
    console.log(save, "save ");
    res.status(200).send({ status: false, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});

router.get("/admin/logout", adminAuth, async (req, res) => {
  try {
    console.log("admin logging out");
    req.validUser.tokens = req.validUser.tokens.filter((token) => {
      return token.token !== req.cookies.token;
    });
    await req.validUser.save();

    res.status(200).send({ status: false, message: "auth completed " });
  } catch (error) {
    res.status(500).send({ status: false, message: "server error " });
  }
});
module.exports = router;
