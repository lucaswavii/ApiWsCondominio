var app = require('./config/server');
var port = 8080;
app.listen(8080, function(){
	console.log("Web Service On-line na Porta " + port );	
});