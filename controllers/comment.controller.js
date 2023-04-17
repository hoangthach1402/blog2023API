const Comment = require('../models/Comment');



 exports.getAllComments = async (req, res) => {
  try {
    // Use Mongoose's find() method to retrieve all comments from the Comment model
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// Create a new comment

  exports.createComment = async (req, res) => {
    try {
      const { user, content, replyTo, post } = req.body; // Extract replyTo field from request body
      let comment;
      if (replyTo) {
        // If a replyTo field is present, it means this is a reply to an existing comment
        comment = new Comment({ content, user, post });
        const parentComment = await Comment.findById(replyTo); // Find the parent comment to reply to
        parentComment.replies.push(comment); // Push the new comment to the replies array of the parent comment
        await parentComment.save(); // Save the parent comment with the new reply
      } else {
        // If no replyTo field is present, it means this is a new comment
        comment = new Comment({ content, user, post, replies: [] }); // Initialize an empty replies array for new comments
      }
      await comment.save(); // Save the new comment
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
    // Remove newline character from id
    const commentId = id.replace(/\n/g, '');
    console.log(`delete method ${commentId}`);
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to delete comment' });
  }
};


