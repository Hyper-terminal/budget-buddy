const Expense = require("../models/expense");
const User = require("../models/user");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });
    res.json({
      success: true,
      expenses,
      totalExpenses: req.user.total_expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve expenses" });
  }
};

exports.postExpenses = async (req, res) => {
  try {
    const { category, amount, description, name } = req.body;
    const expense = await Expense.create({
      category,
      amount,
      description,
      name,
      userId: req.user.id,
    });

    // updated total amount
    const totalAmount = Number(req.user.total_expense) + Number(amount);

    await User.update(
      { total_expense: totalAmount },
      { where: { id: req.user.id } }
    );

    res.json({ success: true, expense, totalExpenses: totalAmount });
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
    // need to find the amount of above expense first
    const currentExpense = await Expense.findOne({
      where: { id: req.params.expenseId },
    });
    //
    const totalExpenses =
      Number(req.user.total_expense) - Number(currentExpense.amount);

    await Promise.all([
      Expense.destroy({
        where: { id: req.params.expenseId, userId: req.user.id },
      }),
      User.update(
        { total_expense: totalExpenses },
        { where: { id: req.user.id } }
      ),
    ]);

    res.json({
      success: true,
      message: "Expense deleted successfully",
      totalExpenses: totalExpenses || 0,
    });
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

    const totalExpense = await Expense.sum("amount", {
      where: { userId: req.user.id },
    });

    await User.update(
      { total_expense: totalExpense || 0 },
      { where: { id: req.user.id } }
    ),
      res.json({
        success: true,
        message: "Expense updated successfully",
        totalExpenses: totalExpense,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update expense" });
  }
};
