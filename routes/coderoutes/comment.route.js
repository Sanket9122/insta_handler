const express = require('express');

const { commentController } = require('../../controllers');
const  authenticate  = require('../../middlewares/auth');
const router = express.Router();

router.post('/:postId', authenticate, commentController.createComment);
router.get('/:postId', commentController.getAllCommentsOfPost);
router.delete('/:commentId', authenticate, commentController.deleteComment);
router.put('/:commentId', authenticate, commentController.updateComment);

module.exports = router;