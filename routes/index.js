var express = require('express');
var router = express.Router();
var Category = require('./category.route')
var PostRoute = require('./post.route')
var commentRouter = require('./comment.route')
const userController = require('../controllers/userController');
const userRouter = require('./users')
/* GET home page. */
router.get('/', function(req, res, next) {
 res.send('Welcome Blog2023 API products Of ThachVu using ChatGPT')
});
router.use('/user',userRouter) ;
router.use('/category/',Category);
router.use('/post',PostRoute); 
router.use('/comment',commentRouter); 

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;
