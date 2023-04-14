const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {  authenticateToken,isAdmin} = require('../middeware/authenticateMiddleware');

// API lấy danh sách các Category
router.get('/', categoryController.getAllCategories);

// API lấy thông tin của một Category cụ thể
router.get('/:id', categoryController.getCategoryById);

// API tạo mới một Category
router.post('/',authenticateToken,isAdmin, categoryController.createCategory);

// API cập nhật thông tin của một Category
router.put('/:id',isAdmin, categoryController.updateCategory);

// API xoá một Category
router.delete('/:id',isAdmin, categoryController.deleteCategory);

module.exports = router;