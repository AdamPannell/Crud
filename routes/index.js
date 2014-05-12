var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'User Page' });
});

router.get('/hobbies', function(req, res) {
  res.render('welcome', { title: 'Hobbies' });
});

router.get('/photos', function(req, res) {
  res.render('photos', { title: 'Photos' });
});

router.get('/about_me', function(req, res) {
  res.render('about_me', { title: 'About Me' });
});

module.exports = router;
