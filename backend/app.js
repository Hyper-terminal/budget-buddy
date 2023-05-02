const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./utils/database");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
