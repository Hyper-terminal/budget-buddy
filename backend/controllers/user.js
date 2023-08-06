const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.postSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // generate salt and hash
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: hash, isPremium: false });
    const jwtToken = jwt.sign({ userId: user.id }, "secretkey");

    res.json({
      success: true,
      message: "successfully created the user",
      user: { username, email },
      isPremium: false,
      jwtToken,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        success: false,
        message: `${error.errors[0].value} already exists`,
      });
    } else if (error.name === "SequelizeValidationError") {
      res
        .status(400)
        .json({ success: false, message: error.errors[0].message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to create user" });
    }
  }
};

exports.postSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ success: false, message: "No user found" });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        // generate a token for user and send it
        const jwtToken = jwt.sign({ userId: user.id }, "secretkey");

        res.json({
          success: true,
          message: "successfully logged in",
          user: { username: user.username, email: user.email },
          isPremium: user.isPremium,
          jwtToken,
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to log in" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.json({ success: true, message: "successfully deleted" });
  } catch (error) {
    console.error(error.error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};
