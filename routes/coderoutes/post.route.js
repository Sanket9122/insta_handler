const express = require('express');
const  {postController}  = require('../../controllers');
const  authenticate  = require('../../middlewares/auth');

const router = express.Router();

router.post('/', authenticate, postController.createPost);
router.get('/', authenticate, postController.getPostsOfUser); 
router.get('/all',postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', authenticate, postController.deletePost); 
router.put('/:id', authenticate, postController.updatePost); 

module.exports = router;