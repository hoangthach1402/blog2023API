const mongoose = require('mongoose')

const commentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  // Add other comment-specific fields as needed
});
  
  const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;