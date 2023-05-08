const Expense = require("../models/expense");

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.send(expenses);
    } catch (error) {
        console.error(error);
        res.json({message: "Some error occured"});
    }
};

exports.postExpenses = async (req, res) => {
    try {
        const {category, amount, description} = req.body;
        const expense = await Expense.create({category, amount, description});
        res.send(expense);
    } catch (error) {
        console.error(error);
        res.json({message: "Some error occured"});
    }
};

exports.deleteExpenses = async (req, res) => {
    try {
        await Expense.destroy({where: {id: req.params.expenseId}});
        res.json({message: "deleted successfully"});
    } catch (error) {
        console.error(error);
        res.json({message: "Some error occured"});
    }
};
