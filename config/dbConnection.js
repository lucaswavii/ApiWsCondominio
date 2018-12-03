var mysql = require('mysql');
// Configuração do banco de dados
var connMysql = function() {
	

	
	return mysql.createConnection({
		host : 'localhost',
		user: 'root',
		password: 'Wa180279',
		database: 'wscondominio'
	});
}

module.exports = function(){
	return connMysql;
}
