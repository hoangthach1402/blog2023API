const Comment = require('../models/comment');
const User = require('../models/user');

// Controller cho user restful API


// Cài đặt các module cần thiết


// Controller cho user restful API
const commentController = {
  // Lấy danh sách tất cả comments
  getAllComments: async (req, res) => {
    // Kiểm tra xác thực người dùng
    if (!req.user) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    // Lấy danh sách comments từ database
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
    }
  },

  // Tạo mới comment
  createComment: async (req, res) => {
    // Kiểm tra xác thực người dùng
    if (!req.user) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    // Lấy thông tin từ request body
    const { content, post } = req.body;
    
    // Kiểm tra nội dung comment
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Nội dung comment không được bỏ trống' });
    }

    // Tạo mới comment
    const comment = new Comment({
      content,
      user: req.user._id,
      post
    });

    // Lưu comment vào database
    try {
      await comment.save();
      res.status(201).json({ message: 'Comment đã được tạo mới thành công', comment });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
    }
  },

  // Chỉnh sửa comment
  editComment: async (req, res) => {
    // Kiểm tra xác thực người dùng
    if (!req.user) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    // Lấy thông tin từ request body
    const { content } = req.body;

    // Kiểm tra nội dung comment
    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Nội dung comment không được bỏ trống' });
    }

    // Tìm comment theo id
    try {
      const comment = await Comment.findById(req.params.id);

      // Kiểm tra người dùng có quyền chỉnh sửa comment không
      if (!comment || comment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa comment này' });
      }

      // Cập nhật nội dung comment
      comment.content = content;

      // Lưu comment đã chỉnh sửa vào database
      await comment.save();

      res.json({ message: 'Comment đã được chỉnh sửa thành công', comment });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
    }
  },
// Node.js
deleteComment: async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    } 
    // Tìm comment theo id
try {
    const comment = await Comment.findById(req.params.id);
  
    // Kiểm tra người dùng có quyền xóa comment không
    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa comment này' });
    }
  
    // Xóa comment khỏi database
    await Comment.findByIdAndDelete(req.params.id);
  
    res.json({ message: 'Comment đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
  }    
}

}

module.exports = commentController;
    
    

// Cài đặt các module cần thiết


// module.exports = commentController;
  