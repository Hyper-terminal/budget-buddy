const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_shop", "abhi", "Abhishek_01", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
