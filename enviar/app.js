// ligando os modulos
var express = require('express')
  , routes = require('./routes')
  , fs = require('fs')
  ,NotaModel = require('./models/NotaModels.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
 // app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
 // app.use(express.static(__dirname + '/public'));
});

// Buscamos o diretorio dos nossos formularios
app.get('/', function(req, res) {
  fs.readFile('./public/index.html', function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

// Função de gravar no banco de dados

app.post('/cadastrar', function(req, res) {
  var nome = req.body.nome;
  var endereco = req.body.endereco;
  var telefone = req.body.telefone;
  var descricao = req.body.descricao;
  NotaModel.gravarNota(nome,endereco,telefone, descricao, function(err, user) {
    if (err) throw err;
      res.redirect('/');
  });
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// endereco das rotas (no caso o INDEX)

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
