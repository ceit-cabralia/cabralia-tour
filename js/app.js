var apiUrl ='localhost/3000';

var app = {
  init: function () {
        
    helpers.loader.show();

    qwest.get(apiUrl)
      .success(function (response) {
        helpers.getTemplate('menu-list-template', {
          categoria: response
        }, 'menu-list');
      })
      .error(function (message) {
      })
      .complete(function (message) {

        helpers.loader.hide();
      });
  }
};


var helpers = {
  getTemplate: function (template, data, destination) {
    var source = document.getElementById(template).innerHTML,
      temp = Handlebars.compile(source);
   

    var content = temp(data),
      dest = document.getElementById(destination);

    dest.innerHTML = content;


    var menuLinks = document.querySelectorAll('.menu-item');
    for (var i = 0, l = menuLinks.length; i < l; i++) {
      var item = menuLinks[i];
      item.addEventListener('click', helpers.goTo);
    }


    var menuLinks = document.querySelectorAll('.item-list');
    for (var i = 0, l = menuLinks.length; i < l; i++) {
      var item = menuLinks[i];
      item.addEventListener('click', helpers.goDetalhe);
    }
  

    var back = document.querySelectorAll('.go-back');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack);
    }


    var back = document.querySelectorAll('.go-back_D');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack_D);
    }


    var back = document.querySelectorAll('.go-back_S');
    for (var i = 0, l = back.length; i < l; i++) {
      var item = back[i];
      item.addEventListener('click', helpers.goBack_S);
    }

  },


  goTo: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    helpers.setTitle(title);
  
    
    if (categoria == 'sobre') {

      document.getElementById('sobre-cabralia-page').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left'; 
    
    } else {

      helpers.loader.show();
 
      qwest.get(apiUrl + categoria)
      .success(function (response) {
        helpers.getTemplate('item-list-template', {
          itens: response
        }, 'item-list');

      document.getElementById('list-item-page').className = 'current';
      document.querySelector('[data-position="current"]').className = 'left';    
        
      })
      .error(function (message) {
      })
      .complete(function (message) {
        helpers.loader.hide();
    });
  }
 
  },

  goDetalhe: function (e) {
    var categoria = this.getAttribute('data-categoria'),
    title = this.getAttribute('data-title');

    var colection = this.getAttribute('data-colection');
    var id = this.getAttribute('data-id');
    
    helpers.setTitle(title);

    helpers.loader.show();

    qwest.get(apiUrl + colection + id)
      .success(function (response) {  

         var lixo = JSON.stringify(response);

         lixo='['+lixo+']';

         response = JSON.parse(lixo);      

         helpers.getTemplate('detalhe-tela-template', {
          detalhe:  response 
        }, 'detalhe-list');  

        document.getElementById('detalhe-item-page').className = 'current';
        document.querySelector('[data-position="current"]').className = 'left'; 
      })
      .error(function (message) {

      })
      .complete(function (message) {

         helpers.loader.hide();

         document.querySelector('#telef').addEventListener('click', helpers.goCall);
      });

  },

  goBack: function () {
    document.getElementById('list-item-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  goBack_D: function () {
    document.getElementById('detalhe-item-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  goBack_S: function () {
    document.getElementById('sobre-cabralia-page').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
  },

  goCall: function () {

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
