//Url padrão da nossa api

var apiUrl ='http://hayoapi.herokuapp.com/';
//Funções da aplicação
var app = {
  init: function () {
        
    //iniciamos o loader
    helpers.loader.show();

    //Iniciamos o request para a nossa api
    qwest.get(apiUrl)
      .success(function (response) {
        helpers.getTemplate('menu-list-template', {
          categoria: response
        }, 'menu-list');
      })
      .error(function (message) {
        //tratamos o erro
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
      temp = Handlebars.compile(source);
   

    var content = temp(data),
      dest = document.getElementById(destination);

    dest.innerHTML = content;

    //Adicionamos click nos itens do menu
    var menuLinks = document.querySelectorAll('.menu-item');
    for (var i = 0, l = menuLinks.length; i < l; i++) {
      var item = menuLinks[i];
      item.addEventListener('click', helpers.goTo);
    }

    //Adicionamos click nos itens do menu
    var menuLinks = document.querySelectorAll('.item-list');
    for (var i = 0, l = menuLinks.length; i < l; i++) {
      var item = menuLinks[i];
      item.addEventListener('click', helpers.goDetalhe);
    }
  

    //Adicionamos click nos botões voltar
    var back = document.querySelectorAll('.go-back');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack);
    }

  },

  // chama a tela de listagem da OPÇÃO selecionado
  goTo: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    //Inserimos o novo titulo na pagina de listas
    // chama a tela de listagem, fazendo a transição 
    document.getElementById('list-item-page').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';

    helpers.setTitle(title);

    //Mostramos o loader
    helpers.loader.show();

    //Fazemos o get da url de itens passando a categoria
    qwest.get(apiUrl + categoria)
      .success(function (response) {
        helpers.getTemplate('item-list-template', {
          itens: response
        }, 'item-list');

        
      })
      .error(function (message) {
        //tratamos o erro
      })
      .complete(function (message) {
        //escondemos o loader
        helpers.loader.hide();
      });
  },

  goDetalhe: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    var colection = this.getAttribute('data-colection');
    var id = this.getAttribute('data-id');
    


    //Inserimos o novo titulo na pagina de listas
    // chama a tela de listagem, fazendo a transição 
    document.getElementById('detalhe-item-page').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';

    helpers.setTitle(title);

    //Mostramos o loader
    helpers.loader.show();

    //Fazemos o get da url de itens passando a categoria
    qwest.get(apiUrl + colection)
      .success(function (response) {
         helpers.getTemplate('detalhe-tela-template', {
          detalhe:  response 
        }, 'detalhe-list');

        
      })
      .error(function (message) {
        //tratamos o erro
      })
      .complete(function (message) {
        //escondemos o loader
        helpers.loader.hide();
      });
  },

  // chama a tela de Detalhe do ITEM selecionado
  

  goBack: function () {
    document.getElementById('list-item-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },
  setTitle: function (title) {
    var listTitle = document.getElementById('item-list-title');
    listTitle.textContent = title;
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

app.init();