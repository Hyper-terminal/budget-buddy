const express = require("express");
const { getUsers, postAddUser, deleteUser } = require("../controllers/user");

const router = express.Router();

// users
router.get("/", getUsers);
router.post("/", postAddUser);
router.delete("/:userId", deleteUser);

module.exports = router;
