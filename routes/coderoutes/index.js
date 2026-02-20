const express = require('express');
const { InfoController, UserController } = require('../../controllers');
const userRoute = require('./user.route');
const postRoute = require('./post.route');
const commentRoute = require('./comment.route');
const likeRoute = require('./like.route');
const friendRequestRoute = require('./friendRequest.route');
const otpRoute = require('./otp.route');

const router = express.Router();

router.get('/info', InfoController.info);
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);
router.use('/likes/toggle', likeRoute);
router.use('/friend-requests', friendRequestRoute);
router.use('/otp', otpRoute);

module.exports = router;