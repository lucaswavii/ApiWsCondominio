module.exports = function(application){

    application.get('/', function(req, res){
        res.send('<h1>Seja Bem Vindo API WsClinica</h1>')
    });    

    application.get('/api', function(req, res){
        res.send('<h1>Seja Bem Vindo API WsClinica</h1>')
    });

}