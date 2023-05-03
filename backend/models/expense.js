const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  category: { type: DataTypes.STRING },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Expense;