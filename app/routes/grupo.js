module.exports = function(application){
    
    application.get('/api/grupo', function(req, res){
        application.app.controllers.grupo.findAll(application, req, res);
    });

    application.get('/api/grupo/:_id', function(req, res){
        application.app.controllers.grupo.findById(application, req, res);
    });    

    application.post('/api/grupo', function(req, res){
        application.app.controllers.grupo.save(application, req, res);
    });    

    application.post('/api/grupo/:_id', function(req, res){
        application.app.controllers.grupo.delete(application, req, res);
    });  
}