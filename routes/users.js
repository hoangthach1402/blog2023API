var express = require('express');
var router = express.Router();
const User = require('../models/user')
const { authenticateToken, isAdmin } = require('../middeware/authenticateMiddleware');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  User.find()
  .then(users=>res.send(users))
  .catch(err=>res.status(500).json({error:err.message}))
});
router.get('/:userId',userController.getUserById)
router.get('/:userId/posts',userController.showAllPostsByUserId)
// Route for user registration
router.get('/test', function(req,res){
  res.send('test admin')
});
// Route for user login
router.get('/profile',userController.profile); 

module.exports = router;
