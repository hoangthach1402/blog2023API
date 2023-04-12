const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');

// Define routes for admin functionality

// Example route for fetching all users
router.get('/users', authenticateMiddleware.isAdmin, adminController.getAllUsers);

// Example route for updating a user's role
router.put('/users/:userId/role', authenticateMiddleware.isAdmin, adminController.updateUserRole);

// Export the router
module.exports = router;