var mysql = require('mysql');
// Configuração do banco de dados
var connMysql = function() {
	

	
	return mysql.createConnection({
		host : '18.231.55.219',
		user: 'root',
		password: 'Wa180279',
		database: 'wsclinica'
	});
}

module.exports = function(){
	return connMysql;
}
