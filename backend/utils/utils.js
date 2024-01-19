const jwt = require("jsonwebtoken");

exports.generateToken = (userId, isPremium) => {
  return jwt.sign({ userId, isPremium }, "secretkey");
};

exports.cloneObjects = (objToClone) => {
  if (objToClone) {
    return JSON.parse(JSON.stringify(objToClone));
  }
};
