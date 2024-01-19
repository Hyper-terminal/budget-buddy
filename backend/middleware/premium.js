const jwt = require("jsonwebtoken");

exports.premiumUser = async (req, res, next) => {
    try {
        const jwtToken = req.header("Authorization");

        const token = jwt.verify(jwtToken, "secretkey");
        if (token.isPremium)
            next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};
