const express = require("express");
const {
  postSigninUser,
  postSignupUser,
  deleteUser,
  getForgotPassword,
  postForgotPasswordLink,
  postUpdatePassword,
} = require("../controllers/user");

const router = express.Router();

// users
router.post("/signup", postSignupUser);
router.post("/signin", postSigninUser);
router.get("/forgot-password/:id", getForgotPassword);
router.post("/update-password/:id", postUpdatePassword);
router.post("/forgot-password", postForgotPasswordLink);
router.delete("/:userId", deleteUser);

module.exports = router;
