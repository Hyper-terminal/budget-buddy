const express = require("express");
const { postSigninUser, postSignupUser, deleteUser } = require("../controllers/user");

const router = express.Router();

// users
router.post("/signup", postSignupUser);
router.post("/signin", postSigninUser);
router.delete("/:userId", deleteUser);

module.exports = router;
