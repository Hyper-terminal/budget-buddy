const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./utils/database");
const expenseRoutes = require("./routes/expenses");
const userModel = require("./models/user");
const expenseModel = require("./models/expense");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
