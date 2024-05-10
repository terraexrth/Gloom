const {verifyAccessToken} = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const inviteController = require('../controller/invite');

router.post('/sendInvite', verifyAccessToken, inviteController.sendInvite);


module.exports = router;
