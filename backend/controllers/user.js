const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");
const PasswordModel = require("../models/forgotPassword");
const { generateToken } = require("../utils/utils");
const SibApiV3Sdk = require("sib-api-v3-sdk");

const { v4: uuidv4 } = require("uuid");

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
    if (!req.body.email) new Error();

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


exports.postForgotPasswordLink = async (req, res) => {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Instantiate the client
    const apiKey = defaultClient.authentications["api-key"];

    apiKey.apiKey = process.env.EMAIL_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: process.env.EMAIL_SENDER,
    };

    const receivers = [{ email: req.body.email }];

    const uniqueId = uuidv4();

    const currentUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!currentUser) new Error();

    await PasswordModel.create({
      isActive: true,
      id: uniqueId,
      userId: currentUser.id,
    });

    const forgotLink = `http://localhost:3000/users/forgot-password/${uniqueId}`;

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Link to reset password",
      HtmlContent: `
      <h1>Reset Password</h1>
      <h4>Please click on this <a target="_blank" href={{params.link}}>{{params.link}}</a> to reset the password</h4>
      `,
      params: {
        link: forgotLink,
      },
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

exports.getForgotPassword = async (req, res) => {
  try {
    const passwordId = await PasswordModel.findOne({
      where: { id: req.params.id },
    });

    if (!passwordId) {
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });
    }

    if (passwordId.isActive) {
      // Render an HTML page with JavaScript that makes a fetch request to reset the password
      return res.send(`<html>
            <head>
              <title>Reset Password</title>
            </head>
            <body>
              <label for="newpassword">Enter New password</label>
              <input id="newpassword" type="password" required></input>
              <button onclick="resetPassword()">Reset Password</button>
              
              <script>
                async function resetPassword() {
                  const newPassword = document.getElementById("newpassword").value;
                    const response = await fetch('http://localhost:3000/users/update-password/${passwordId.id}', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newPassword }),
                  });
                  
                  if (response.status === 200) {
                    // Password reset successful
                    alert('Password reset successful');
                  } else {
                    // Password reset failed
                    alert('Password reset failed');
                  }
                }
              </script>
            </body>
          </html>`);
    }

    return res
      .status(403)
      .json({ success: false, message: "Link is no longer active" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.postUpdatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { id } = req.params;

    if (!newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot update password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const pwdObj = await PasswordModel.findOne({ where: { id } });

    if (!pwdObj) {
      return res
        .status(404)
        .json({ success: false, message: "Link not found" });
    }

    await User.update(
      { password: hashedPassword },
      { where: { id: pwdObj.userId } }
    );
    res.redirect("http://localhost:5173/signin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
