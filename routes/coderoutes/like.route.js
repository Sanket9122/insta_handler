const express = require('express');
const { likeController } = require('../../controllers');
const  authenticate  = require('../../middlewares/auth');

const router = express.Router();

router.post('/:commentId', authenticate, likeController.likeComment);
router.post('/:postId', authenticate, likeController.likePost);
router.delete('/:likeId', authenticate, likeController.deleteLike);

module.exports = router;