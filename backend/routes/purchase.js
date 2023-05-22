const express = require("express");
const { getPremiumMembership } = require("../controllers/purchase");
const { userAuthentication } = require("../middleware/auth");
const router = express.Router();

// purchase
router.get("/", userAuthentication, getPremiumMembership);

module.exports = router;
