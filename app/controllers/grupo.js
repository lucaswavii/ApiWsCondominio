module.exports.findAll = function( application, req, res ){

    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var grupoDao = new application.app.models.GrupoDAO(connection);
        
        grupoDao.findAll(function(error, grupos){
            
            if( error ) return res.status(500).send({auth: false,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).json({  token : decoded, user: grupos });                    
        });
    });
}

module.exports.findById = function( application, req, res ){

    var id = req.params._id;

    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var grupoDao = new application.app.models.GrupoDAO(connection);
        
        grupoDao.findById(id, function(error, grupos){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           

            return res.status(200).send({ grupos: grupos, auth: true, token: decoded });
        });
    });
}

module.exports.save = function( application, req, res ){

    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });
   
    var dadosForms = req.body;
    
    req.assert('nome', 'O nome é obrigatório').notEmpty();
    req.assert('nome', 'O nome deve ser menor que 60 caracteres.').isLength({ max: 60 })
   
    var erros = req.validationErrors();

    if( erros.length > 0 ) {
        return res.status(500).send({auth: false, 'error':erros })
    }

    
    
    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var grupoDao = new application.app.models.GrupoDAO(connection);
        
        grupoDao.save(dadosForms, function(error, grupos){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).send({ grupos: grupos, auth: true, token: decoded });
        });
    });
}

module.exports.delete = function( id, application, req, res ){

    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });
   
    var id = req.params.id;
    
  
    if( !id ) {
        return res.status(500).send({auth: false, 'error':'Informe o id para exclusão.' })
    }
        
    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var grupoDao = new application.app.models.GrupoDAO(connection);
        
        grupoDao.delete(id, function(error, grupos){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).send({ grupos: grupos, auth: true, token: decoded });
        });
    });    
}