const User = require("../models/user");

exports.postSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    if (user) res.json({ message: "success", user });
  } catch (error) {
    res.status(500).json({ message: error.errors[0].message });
  }
};

exports.postSigninUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) res.status(404).json({ message: "No user found" });
    else {
      if (user.password.toString() === password.toString()) {
        res.json({ message: "success", user });
      } else {
        res.status(401).json({ message: "password didn't match" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.errors[0].message });
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
  }
};
