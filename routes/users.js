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
// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);
router.get('/profile',authenticateToken,userController.profile); 

module.exports = router;
