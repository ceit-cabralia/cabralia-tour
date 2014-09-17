///Url padrão da nossa api

var apiUrl ='localhost/3000';
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

    //Adicionamos click nos itens das telas de listagem
    var menuLinks = document.querySelectorAll('.item-list');
    for (var i = 0, l = menuLinks.length; i < l; i++) {
      var item = menuLinks[i];
      item.addEventListener('click', helpers.goDetalhe);
    }
  
    //Adicionamos click nos botões voltar das telas de listagem
    var back = document.querySelectorAll('.go-back');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack);
    }

    //Adicionamos click nos botões voltar das telas de detalhes
    var back = document.querySelectorAll('.go-back_D');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack_D);
    }

    //Adicionamos click nos botões voltar da tela Sobre Cabrália
    var back = document.querySelectorAll('.go-back_S');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack_S);
    }

  },

  // chama a tela de listagem da OPÇÃO selecionado
  goTo: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    //Inserimos o novo titulo na pagina de listas
    
    helpers.setTitle(title);
  
    
    if (categoria == 'sobre') {

      // chama a tela Sobre Cabrália
      document.getElementById('sobre-cabralia-page').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left'; 
    
    } else {

      //Mostramos o loader
      helpers.loader.show();
 
      qwest.get(apiUrl + categoria)
      .success(function (response) {
        helpers.getTemplate('item-list-template', {
          itens: response
        }, 'item-list');

      // chama a tela de listagem, fazendo a transição 
      document.getElementById('list-item-page').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left';    
        
      })
      .error(function (message) {
        //tratamos o erro
      })
      .complete(function (message) {
        //escondemos o loader
        helpers.loader.hide();
    });
  }
 
  },

  goDetalhe: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    var colection = this.getAttribute('data-colection');
    var id = this.getAttribute('data-id');
    
    //Inserimos o novo titulo na pagina de listas
    helpers.setTitle(title);

    //Mostramos o loader
    helpers.loader.show();

    //Fazendo o get da url de itens passando a categoria
    qwest.get(apiUrl + colection + id)
      .success(function (response) {  

         // converte o objeto JSON e strint
         var lixo = JSON.stringify(response);
         // acrescenta '[' ']' na string para leitura corrreta no helpers
         lixo='['+lixo+']';
         // converte a string modificada em objegto JSON novamente 
         response = JSON.parse(lixo);      

         helpers.getTemplate('detalhe-tela-template', {
          detalhe:  response 
        }, 'detalhe-list');  

        // chama a tela de listagem, fazendo a transição 
        document.getElementById('detalhe-item-page').className = 'current';
        document.querySelector('[data-position="current"]').className = 'left'; 
      })
      .error(function (message) {
        //tratamos o erro
      })
      .complete(function (message) {
         //escondemos o loader
         helpers.loader.hide();

         document.querySelector('#telef').addEventListener('click', helpers.goCall);
      });

     
  },

  // chama a tela de Detalhe do ITEM selecionado
  goBack: function () {
    document.getElementById('list-item-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  // chama a tela de Detalhe do ITEM selecionado
  goBack_D: function () {
    document.getElementById('detalhe-item-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  goBack_S: function () {
    document.getElementById('sobre-cabralia-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  goCall: function () {
    //alert('Pegou o click do telefone');

    var numero = this.getAttribute('data-tel');
    
    var call = new MozActivity({
    name: "dial",
    data: {
        number: numero
    }
    });

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

addEventListener(document.querySelector('telef'), 'click', function () {
    alert('Testando o clique do telefone');
});
