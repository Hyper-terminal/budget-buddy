const Expense = require("../models/expense");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.send(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve expenses" });
  }
};

exports.postExpenses = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const expense = await Expense.create({ category, amount, description });
    res.send(expense);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Failed to create expense" });
    }
  }
};

exports.deleteExpenses = async (req, res) => {
  try {
    await Expense.destroy({ where: { id: req.params.expenseId } });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
