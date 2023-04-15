const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, user, post, replies } = req.body;
    const comment = new Comment({ content, user, post, replies });
    await comment.save();
    return res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, user, post, replies } = req.body;
    const comment = await Comment.findByIdAndUpdate(id, { content, user, post, replies }, { new: true });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Comment updated successfully', comment });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete comment' });
  }
};


