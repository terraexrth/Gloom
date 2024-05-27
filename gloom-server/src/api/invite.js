const {verifyAccessToken} = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const inviteController = require('../controller/invite');

router.post('/send', verifyAccessToken, inviteController.sendInvite);
router.get('/get', verifyAccessToken, inviteController.getInvite)
router.get('/notification', inviteController.notification)
router.get('/get/pending', inviteController.getMember )
router.put('/update', verifyAccessToken,inviteController.updateInvite)
module.exports = router;
