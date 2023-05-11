const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

exports.postSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // generate salt and hash
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: hash });
    res.json({ message: "success", user });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(400)
        .json({ message: `${error.errors[0].value} already exists` });
    } else if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  }
};

exports.postSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "No user found" });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        res.json({ message: "successfully logged in", user });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
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
    res.json({ message: "successfully deleted" });
  } catch (error) {
    console.error(error.error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
