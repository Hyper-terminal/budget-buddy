const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const ForgotPassword = sequelize.define("forgotPassword", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    primaryKey: false,
    unique: false,
    defaultValue: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ForgotPassword;
