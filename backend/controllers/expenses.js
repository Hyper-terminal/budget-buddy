const Expense = require("../models/expense");
const AWS = require("aws-sdk");
let jsonToCsv = require("json-2-csv");

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
    const expense = await Expense.create({
      category,
      amount,
      description,
      name,
      userId: req.user.id,
    });

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
      { where: { id: id, userId: req.user.id } },
    );
    res.json({ success: true, message: "Expense updated successfully" });
  } catch (error) {
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
