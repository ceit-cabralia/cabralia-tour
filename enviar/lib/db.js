
//Ligando o Mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
connect();

// Criando as funções de Conectar e desconectar
function connect() {
  var url = 'mongodb://localhost:27017/hospedagens';
  mongoose.connect(url);
}
function disconnect() {
  mongoose.disconnect()
}