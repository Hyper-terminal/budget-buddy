const express = require("express");
const {
  getExpenses,
  postExpenses,
  deleteExpenses,
} = require("../controllers/expenses");
const { userAuthentication } = require("../middleware/auth");

const router = express.Router();

// /expenses
router.get("/", userAuthentication, getExpenses);
router.post("/", userAuthentication, postExpenses);
router.delete("/:expenseId", userAuthentication, deleteExpenses);

module.exports = router;
