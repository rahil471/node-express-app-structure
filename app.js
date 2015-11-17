var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 

app.use(bodyParser.json());  
app.use(require('./controllers'));


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){
	console.log('listning to 3000');
});