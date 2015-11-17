var express = require('express')
  , router = express.Router();
var multer = require('multer');
var xlsxj = require("xlsx-to-json");
 
var datetimestamp = "";  
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
	console.log(file);
	datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})
var upload = multer({ storage: storage });
  
router.get('/', function(req, res) {
	res.json({'users':'ALL'}); 
});

router.get('/:id', function(req, res) {
	res.json({'user_id':req.params.id}); 
});

router.post('/picture', upload.single('userPhoto'), function(req, res) {
	console.log('uploads/'+req.file.fieldname + '-' + datetimestamp + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length -1]);
	xlsxj({
		input: './uploads/'+req.file.fieldname + '-' + datetimestamp + '.' + req.file.originalname.split('.')[req.file.originalname.split('.').length -1], 
		output: "output.json"
	}, function(err, result) {
		if(err) {
			console.error(err);
			res.json({'error_code':'1'}); 
		}else {
			console.log(result);
			res.json({'error_code':'0'}); 
		}
	});
});

module.exports = router;