const express = require('express');
const { OtpController } = require('../../controllers');

const router = express.Router();

router.post('/send',OtpController.sendOtp);
router.post('/verify',OtpController.verifyOtp);
router.post('/reset-password', OtpController.resetPassword);

module.exports = router;