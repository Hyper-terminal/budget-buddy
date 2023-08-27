const userModel = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../utils/database');

exports.getLeaderBoard = async (req, res) => {
    try {
        const getLeaderBoardExpenses = await userModel.findAll({
            attributes: ['id', 'username', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_amount']],
            include: [{
                model: Expense,
                attributes: []
            }],
            group: ['user.id'],
            order: [['total_amount', 'DESC']]

        });

        res.json({ success: true, data: getLeaderBoardExpenses });
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: error.message });
    }

}