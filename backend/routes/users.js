const express = require("express");
const { postSigninUser, postSignupUser, deleteUser, postForgotPassword } = require("../controllers/user");

const router = express.Router();

// users
router.post("/signup", postSignupUser);
router.post("/signin", postSigninUser);
router.post("/forgot-password", postForgotPassword)
router.delete("/:userId", deleteUser);

module.exports = router;
