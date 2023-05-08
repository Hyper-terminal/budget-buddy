const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    console.error(err);
  }
};

exports.postAddUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log({ username, email, password });
    const user = await User.create({ username, email, password });
    if (user) res.json({ message: "success", user });
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
