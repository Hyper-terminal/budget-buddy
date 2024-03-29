const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.userAuthentication = async (req, res, next) => {
  try {
    const jwtToken = req.header("Authorization");

    const token = jwt.verify(jwtToken, "secretkey");

    const user = await User.findByPk(token.userId);

    if (!user) new Error("No user found");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
