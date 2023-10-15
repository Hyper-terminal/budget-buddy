const Expense = require("../models/expense");
const AWS = require("aws-sdk");
let jsonToCsv = require("json-2-csv");
const User = require("../models/user");
const sequelize = require("../utils/database");

exports.getExpenses = async (req, res) => {
  let t; // Declare the transaction variable outside the try-catch block

  try {
    let expenses = [];
    const isPagination = req.query.pageNumber;

    if (isPagination) {
      t = await sequelize.transaction();

      const itemLimit = req.query.limit ? parseInt(req.query.limit) : 10;
      const pageNumber = parseInt(req.query.pageNumber);
      const offset = (pageNumber - 1) * itemLimit;

      expenses = await Expense.findAll({
        where: { userId: req.user.id },
        offset,
        limit: itemLimit,
        transaction: t,
      });

      const totalExpenses = await Expense.count({
        where: { userId: req.user.id },
        transaction: t,
      });

      const totalPages = Math.ceil(totalExpenses / itemLimit);

      await t.commit();

      const hasNextPage = pageNumber < totalPages;
      const hasPreviousPage = pageNumber > 1;
      const previousPageNumber = hasPreviousPage ? pageNumber - 1 : null;
      const lastPageNumber = totalPages;

      res.json({
        success: true,
        expenses,
        totalExpenses: req.user.total_expense,
        currentPageNumber: pageNumber,
        hasNextPage,
        hasPreviousPage,
        previousPageNumber,
        lastPageNumber,
      });
    } else {
      expenses = await Expense.findAll({
        where: { userId: req.user.id },
      });

      res.json({
        success: true,
        expenses,
        totalExpenses: req.user.total_expense,
      });
    }
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve expenses" });
  }
};

exports.postExpenses = async (req, res) => {
  const t = await sequelize.transaction(); // to track the db query
  // if something goes wrong it will rollback
  try {
    const { category, amount, description, name } = req.body;
    const expense = await Expense.create(
      {
        category,
        amount,
        description,
        name,
        userId: req.user.id,
      },
      { transaction: t },
    );
    // updated total amount
    const totalAmount = Number(req.user.total_expense) + Number(amount);

    await User.update(
      { total_expense: totalAmount },
      { where: { id: req.user.id }, transaction: t },
    );

    await t.commit(); // if there are no issues than we can safely update the values in DB

    res.json({ success: true, expense, totalExpenses: totalAmount });
  } catch (error) {
    // need to rollback the transaction here
    await t.rollback();
    res
      .status(500)
      .json({ success: false, message: "Failed to create expense" });
  }
};

exports.deleteExpenses = async (req, res) => {
  const transaction = await sequelize.transaction();
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
        transaction,
      }),
      User.update(
        { total_expense: totalExpenses },
        { where: { id: req.user.id }, transaction },
      ),
    ]);
    await transaction.commit();
    res.json({
      success: true,
      message: "Expense deleted successfully",
      totalExpenses: totalExpenses || 0,
    });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ success: false, message: "Failed to delete expense" });
  }
};

exports.patchExpense = async (req, res) => {
  const transaction = await sequelize.transaction();

  const { name, id, description, amount, category } = req.body;

  try {
    await Expense.update(
      { name, description, amount, category },
      { where: { id: id, userId: req.user.id }, transaction },
    );

    const totalExpense = await Expense.sum("amount", {
      where: { userId: req.user.id },
      transaction,
    });

    await User.update(
      { total_expense: totalExpense || 0 },
      { where: { id: req.user.id }, transaction },
    );

    await transaction.commit();

    res.json({
      success: true,
      message: "Expense updated successfully",
      totalExpenses: totalExpense,
    });
  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({ success: false, message: "Failed to update expense" });
  }
};

exports.getDownloadExpense = async (req, res) => {
  try {
    console.log(req.user);
    const expenses = await Expense.findAll({ where: { userId: req.user.id } });

    // setting the region
    AWS.config.update({ region: "ap-south-1" });

    // Create S3 service object
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
    });

    const expenses_csv = await jsonToCsv.json2csv(
      JSON.parse(JSON.stringify(expenses)),
    );
    const uploadParams = {
      Bucket: "budget-buddy1",
      Key: req.user.email + "__expenses.csv",
      Body: expenses_csv,
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) new Error(err);
      return res.status(200).json({ success: true, data: data });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving expenses" });
  }
};
