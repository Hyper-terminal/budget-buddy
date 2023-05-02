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
    const { username, email, phone } = req.body;
    console.log({ username, email, phone });
    const user = await User.create({ username, email, phone });
    if (user) res.send(user);
    else res.send("Some error occured!");
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};
