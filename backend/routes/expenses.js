const express = require("express");
const {
  getExpenses,
  postExpenses,
  deleteExpenses,
  patchExpense,
  getDownloadExpense
} = require("../controllers/expenses");
const { userAuthentication } = require("../middleware/auth");

const router = express.Router();

// /expenses
router.get("/", userAuthentication, getExpenses);
router.post("/", userAuthentication, postExpenses);
router.delete("/:expenseId", userAuthentication, deleteExpenses);
router.patch("/:expenseId", userAuthentication, patchExpense);
router.get("/download", userAuthentication, getDownloadExpense);

module.exports = router;
