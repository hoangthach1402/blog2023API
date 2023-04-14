const Category = require('../models/category');
const Post = require('../models/post');

const categoryController = {
  // Lấy danh sách các Category
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  },

  // Lấy thông tin của một Category cụ thể
  getCategoryById: async (req, res) => {
    try {
      // Get the category by id
      const category = await Category.findById(req.params.id);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Get all posts with the category id, limit to 10, and sort by date in descending order
      const posts = await Post.find({ category: req.params.id }).limit(10).sort({ date: -1 });
  
      return res.status(200).json({ category, posts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  // Tạo mới một Category
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.json({ message: 'Tạo mới Category thành công', category: newCategory });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  },

  // Cập nhật thông tin của một Category
  updateCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      const category = await Category.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Không tìm thấy Category' });
      }
      res.json({ message: 'Cập nhật Category thành công', category });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  },

  // Xoá một Category
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      // Xoá tất cả các bài đăng thuộc về Category đó trước khi xoá Category
      await Post.deleteMany({ category: categoryId });
      const category = await Category.findByIdAndDelete(categoryId);
      if (! category) {
        return res.status(404).json({ message: 'Không tìm thấy Category' });
    }
    res.json({ message: 'Xoá Category thành công', category });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
},
};

module.exports = categoryController;
