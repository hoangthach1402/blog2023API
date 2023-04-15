var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { authenticateToken, isAdmin } = require('../middeware/authenticateMiddleware');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', authenticateToken, function(req, res, next) {
  // res.send('respond with a resource');
  User.find()
  .then(users=>res.send(users))
  .catch(err=>res.status(500).json({error:err.message}));
});

// Route for user registration
router.get('/test', function(req, res){
  res.send('test admin');
});

// Route for user login
// router.get('/profile',authenticateToken, userController.getUserPostComment);

router.get('/:userId', userController.getUserById);
router.get('/:userId/posts-comments', authenticateToken,userController.getUserPostComment);

router.get('/:userId/posts', userController.showAllPostsByUserId);

module.exports = router;