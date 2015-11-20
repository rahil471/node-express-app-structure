var express = require('express')
  , router = express.Router();

  
router.get('/', function(req, res) {
	res.json({'users':'ALL'}); 
});

router.get('/:id', function(req, res) {
	res.json({'user_id':req.params.id}); 
});

module.exports = router;