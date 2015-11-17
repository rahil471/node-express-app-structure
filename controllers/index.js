var express = require('express')
  , router = express.Router();
  
router.use('/users', require('./users'));
  
module.exports = router;