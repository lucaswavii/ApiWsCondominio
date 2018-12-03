function UsuarioDAO( connection ){
	this._connection = connection; 
}

UsuarioDAO.prototype.autentiction = function( params, callback) {
	this._connection.query('select * from USUARIO where nome = ? and senha = ?  order by id', [ params.nome, params.senha ], callback);	
}

UsuarioDAO.prototype.findAll = function( callback) {
	this._connection.query('select * from USUARIO order by id', callback);	
}

UsuarioDAO.prototype.findById = function( id, callback) {
	this._connection.query('select * from USUARIO where id = ? order by id', id, callback);	
}

UsuarioDAO.prototype.save = function( usuario, callback) {
	if( !usuario.id ) {
		this._connection.query('insert into USUARIO set ?', usuario, callback);
	} else {
		this._connection.query('update USUARIO set ? where id = ?', [ usuario, usuario.id], callback);	
	}	
}

UsuarioDAO.prototype.delete = function( id, callback) {
	this._connection.query('delete from USUARIO where id = ?', id, callback);
}

module.exports = function(){
	return UsuarioDAO;
};
