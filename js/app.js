//Url padrão da nossa api
var apiUrl = 'http://cabralia.herokuapp.com/api/';

//Funções da aplicação
var app = {
  init: function () {
    //iniciamos o loader
    helpers.loader.show();

    //Iniciamos o request para a nossa api
    qwest.get(apiUrl + 'categoria')
      .success(function (response) {
        helpers.getTemplate('menu-list-template', { categoria: response }, 'menu-list');
      })
      .error(function (message) {
        console.log(message);
      })
      .complete(function (message) {
        //escondemos o loader
        helpers.loader.hide();
      });
  }
};

//Funções auxiliares
var helpers = {
  getTemplate: function (template, data, destination) {
     var source = document.getElementById(template).innerHTML,
          temp  = Handlebars.compile(source);

     var content = temp(data),
         dest    = document.getElementById(destination);

     dest.innerHTML = content;
  },
  loader: {
    show: function () {
      var loader = document.getElementById('loader');
      loader.classList.remove('hide');
    },
    hide: function () {
      var loader = document.getElementById('loader');
      loader.classList.add('hide');
    }
  }
};


//Iniciamos o app
app.init();
