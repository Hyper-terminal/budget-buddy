const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Food", "Travel", "Entertainment", "Bills", "Others"]],
    },
  },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Expense;
