const express = require("express");
const { getExpenses, postExpenses, deleteExpenses } = require("../controllers/expenses");

const router = express.Router();

// /expenses

router.get("/", getExpenses);
router.post("/", postExpenses);
router.delete("/:expenseId", deleteExpenses);

module.exports = router;