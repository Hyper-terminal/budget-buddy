const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./utils/database");
const expenseRoutes = require("./routes/expenses");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

sequelize
  .sync({force:true})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
