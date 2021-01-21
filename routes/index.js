var express = require('express');
var router = express.Router();
const user = require('./User');

router.use("/user",user);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
