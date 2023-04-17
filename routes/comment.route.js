const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const {  authenticateToken,isAdmin} = require('../middeware/authenticateMiddleware');

router.get('/', commentController.getAllComments);
// Create a new comment
router.post('/', authenticateToken,commentController.createComment);

// Update a comment
router.put('/:id',authenticateToken, commentController.updateComment);

// Delete a comment
router.delete('/:id',authenticateToken, commentController.deleteComment);

module.exports = router;