var express = require('express');
var router = express.Router();
var Category = require('./category.route')
var PostRoute = require('./post.route')
/* GET home page. */
router.get('/', function(req, res, next) {
 res.send('Welcome Blog2023 API products Of ThachVu using ChatGPT')
});
router.use('/category/',Category);
router.use('/post',PostRoute)

module.exports = router;
