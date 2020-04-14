var express = require('express');
var router = express.Router();

/* test home page. */
router.post('/', function(req, res, next) {
  res.send('hello');
  console.log('hl');
});

module.exports = router;
