const express = require("express");
const { getPremiumMembership, updatePremiumStatus} = require("../controllers/purchase");
const { userAuthentication } = require("../middleware/auth");
const router = express.Router();

// purchase
router.get("/", userAuthentication, getPremiumMembership);
router.post("/", userAuthentication, updatePremiumStatus);

module.exports = router;
