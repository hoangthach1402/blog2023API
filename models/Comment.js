const mongoose = require('mongoose');

// Định nghĩa schema cho comments
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model for user who posted the comment
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post model for the post that the comment belongs to
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // Array of Comment references for storing reply commentsường dẫn ảnh (không bắt buộc)
}, { timestamps: true , strictPopulate: false }); // Thêm timestamps cho created_at và updated_at

// Tạo model Comment từ schema đã định nghĩa
const Comment = mongoose.model('Comment', commentSchema);

// Export model Comment để sử dụng ở những nơi khác trong ứng dụng
module.exports = Comment;