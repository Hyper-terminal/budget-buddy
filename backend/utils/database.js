const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_shop", "root", "coc2001ab", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
