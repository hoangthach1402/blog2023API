const express = require('express');
const router = express.Router();
const {  authenticateToken,isAdmin} = require('../middeware/authenticateMiddleware');
const postController = require('../controllers/postController');

// Route for creating a new post
router.post('/', authenticateToken, postController.createPost);

// Route for getting all posts
router.get('/', postController.getAllPosts);

// Route for getting a specific post by ID
router.get('/:id', postController.getPostById);


// Route for updating a post by ID
router.put('/:id', authenticateToken, postController.updatePost);

// Route for deleting a post by ID
router.delete('/:id', authenticateToken, postController.deletePost);

module.exports = router;