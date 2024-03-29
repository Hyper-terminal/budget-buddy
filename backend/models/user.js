const sequelize = require("../utils/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [4, 30],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 500],
    },
  },
  isPremium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: false,
  },
  total_expense: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;
