
// buscando a pasta da ligação do banco de dados
var db = require('../lib/db');


// Modelando os esquemas
var NotaSchema = new db.Schema({
  nome: {type: String, unique: true},
  endereco: String,
  telefone: String,
  descricao:String
})

// Criamos uma variavel para armazenar os dados do esquemas
var MinhaNota = db.mongoose.model('Nota', NotaSchema);


module.exports.gravarNota = gravarNota;


//Criando a função para instanciar Os dados que serão enviados para o DB
function gravarNota(nome,endereco,telefone, descricao, callback) {
  var instance = new MinhaNota();
  instance.nome = nome;
  instance.endereco = endereco;
  instance.telefone = telefone;
  instance.descricao = descricao;
  instance.save(function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, instance);
    }
  });
}
