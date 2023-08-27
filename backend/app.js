require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const sequelize = require("./utils/database");
const expenseRoutes = require("./routes/expenses");
const purchaseRoutes = require("./routes/purchase");
const premiumRoutes = require("./routes/premium");
const userModel = require("./models/user");
const expenseModel = require("./models/expense");
const orderModel = require("./models/orders");

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}));

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);

userModel.hasMany(expenseModel);
userModel.hasMany(orderModel);
expenseModel.belongsTo(userModel);
orderModel.belongsTo(userModel);

sequelize.sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.error(err));
