const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const { generateToken } = require("../utils/utils");
const SibApiV3Sdk = require("sib-api-v3-sdk");

exports.postSignupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // generate salt and hash
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      email,
      password: hash,
      isPremium: false,
    });
    const jwtToken = generateToken(user.id, user.isPremium);

    res.json({
      success: true,
      message: "successfully created the user",
      user: { username, email },
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
        const jwtToken = generateToken(user.id, user.isPremium);

        res.json({
          success: true,
          message: "successfully logged in",
          user: {
            username: user.username,
            email: user.email,
          },
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
    if(!req.body.email) new Error();

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

exports.postForgotPassword = async (req, res) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;



  // Instantiate the client
  const apiKey = defaultClient.authentications['api-key'];



  apiKey.apiKey = process.env.EMAIL_API_KEY;





  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();


  const sender = {
    email: "abhisharma001001001@gmail.com"
  }
  
  const receivers =  [{email: req.body.email}];

  await tranEmailApi.sendTransacEmail({sender, to: receivers, subject: 'Link to reset password',  textContent: 'Testing email'});
 

  res.status(200).json({success: true, message: "Email sent successfully"});

  }
  
  catch(err) {
    res.status(500).json({ success: false, message: "Failed to delete user" });

  }
  


};
