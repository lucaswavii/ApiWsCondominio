module.exports.autentiction = function( application, req, res ){
    
    var crypto = require('crypto');
    var jwt = require('jsonwebtoken');
    
    var dadosForms = req.body;

    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    
    var erros = req.validationErrors();

    if( erros.length > 0 ) {
        return res.status(500).send({auth: false, 'error': erros })
    }

    var senha_criptografada = crypto.createHash("md5").update(req.body.senha).digest("hex");
   
    var usuario = {nome: req.body.nome, senha: senha_criptografada }
    var connection = application.config.dbConnection();
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    usuarioDao.autentiction( usuario, function(error, usuarios){
        if( error ) return res.status(500).send({auth: false, 'error':'Ops! Error:'  + error });        
        
        if( usuarios.length != 1 ) return res.status(404).send({auth: false, 'error':'Ops! Usuário e Senha inválidos.'})

        // create a token      
        var token = jwt.sign({ id: usuarios }, application.config.config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        
        res.status(200).send({ usuarios: usuarios, auth: true, token: token });

    });
}

module.exports.findAll = function( application, req, res ){

    var jwt = require('jsonwebtoken');
    var token = req.headers['x-access-token'];

    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var usuarioDao = new application.app.models.UsuarioDAO(connection);
        
        usuarioDao.findAll(function(error, usuarios){
            
            if( error ) return res.status(500).send({auth: false,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).json({  token : decoded, user: usuarios });                    
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
        var usuarioDao = new application.app.models.UsuarioDAO(connection);
        
        usuarioDao.findById(id, function(error, usuarios){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           

            return res.status(200).send({ usuarios: usuarios, auth: true, token: decoded });
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
    req.assert('senha', 'A senha é obrigatório').notEmpty();       
    req.assert('pessoa', 'O funcionário é obrigatório').notEmpty(); 
    req.assert('ativo', 'Indique se o usuário está ativo informando "S" ou "N"').notEmpty(); 
    req.assert('grupo', 'Informe o grupo do usuário').notEmpty(); 
    req.assert('empresa', 'Informe a empresa do usuário').notEmpty();

    var erros = req.validationErrors();

    if( erros.length > 0 ) {
        return res.status(500).send({auth: false, 'error':erros })
    }

    dadosForms.senha = crypto.createHash("md5").update(req.body.senha).digest("hex");
    
    if (!token) return res.status(401).send({ auth: false, message: 'O token não foi informado.' });

    jwt.verify(token, application.config.config.secret, function(err, decoded) {
    
        if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token de acesso.' });

        var connection = application.config.dbConnection();
        var usuarioDao = new application.app.models.UsuarioDAO(connection);
        
        usuarioDao.save(dadosForms, function(error, usuarios){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).send({ usuarios: usuarios, auth: true, token: decoded });
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
        var usuarioDao = new application.app.models.UsuarioDAO(connection);
        
        usuarioDao.delete(id, function(error, usuarios){
             
            if( error ) return res.status(500).send({'status': 500,'error':'Ops! Error:'  + error });  
            
            connection.end();           
            return res.status(200).send({ usuarios: usuarios, auth: true, token: decoded });
        });
    });    
}