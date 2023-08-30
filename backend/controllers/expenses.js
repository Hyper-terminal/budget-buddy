const Expense = require("../models/expense");
const User = require("../models/user");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json({ success: true, expenses });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve expenses" });
  }
};

exports.postExpenses = async (req, res) => {
  try {
    const { category, amount, description, name } = req.body;
    const expense = Expense.create({
      category,
      amount,
      description,
      name,
      userId: req.user.id,
    });

    // need to update total amount in users table
    const getUserDetails = await User.findOne({ where: { id: req.user.id } });

    // updated total amount
    const totalAmount = getUserDetails.total_amount + amount;
    const updatedUser = await User.update(
      { total_amount: totalAmount },
      { where: { id: req.user.id } }
    );

    res.json({ success: true, expense });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to create expense" });
    }
  }
};

exports.deleteExpenses = async (req, res) => {
  try {
    await Expense.destroy({
      where: { id: req.params.expenseId, userId: req.user.id },
    });
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete expense" });
  }
};

exports.patchExpense = async (req, res) => {
  const { name, id, description, amount, category } = req.body;
  try {
    await Expense.update(
      { name, description, amount, category },
      { where: { id: id, userId: req.user.id } }
    );
    res.json({ success: true, message: "Expense updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update expense" });
  }
};
