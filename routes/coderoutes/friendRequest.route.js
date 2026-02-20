const express = require('express');
const { friendRequestController } = require('../../controllers');
const  authenticate  = require('../../middlewares/auth');

const router = express.Router();

router.post('/send', authenticate, friendRequestController.sendFriendRequest);
router.post('/response-to-request/:requestId', authenticate, friendRequestController.acceptFriendRequest);
router.get('/get-pending-requests', authenticate, friendRequestController.getAllFriendRequests);
router.get('/get-friends/:userId',authenticate, friendRequestController.getAllFriend);

module.exports = router;