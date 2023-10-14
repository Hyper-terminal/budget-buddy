const express = require('express');
const { premiumUser } = require('../middleware/premium');
const { getLeaderBoard } = require('../controllers/premium');
const { userAuthentication } = require('../middleware/auth');

const router = express.Router();


router.get('/', userAuthentication, premiumUser, getLeaderBoard);

module.exports = router;