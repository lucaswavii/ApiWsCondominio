module.exports = function(application){
    
    application.post('/api/login', function(req, res){
        application.app.controllers.usuario.autentiction(application, req, res);
    });

    application.get('/api/usuario', function(req, res){
        application.app.controllers.usuario.findAll(application, req, res);
    });

    application.get('/api/usuario/:_id', function(req, res){
        application.app.controllers.usuario.findById(application, req, res);
    });    
}