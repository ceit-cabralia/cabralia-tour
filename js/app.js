// chamada da opção Hospedagens
document.querySelector('#btn-hospedagem').addEventListener('click', function () {
    document.querySelector('#list-hospedagem').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-buttons-back').addEventListener('click', function () {
    document.querySelector('#list-hospedagem').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

// chamada da opção restaurantes
document.querySelector('#btn-restaurante').addEventListener('click', function () {
    document.querySelector('#list-restaurantes').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-buttons-back1').addEventListener('click', function () {
    document.querySelector('#list-restaurantes').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

// chamada da opção pontos turisticos
document.querySelector('#btn-pontostour').addEventListener('click', function () {
    document.querySelector('#list-pontosturisticos').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-buttons-back2').addEventListener('click', function () {
    document.querySelector('#list-pontosturisticos').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});

// chamada da opção Transportes
document.querySelector('#btn-transporte').addEventListener('click', function () {
    document.querySelector('#list-transportes').className = 'current';
    document.querySelector('[data-position="current"]').className = 'left';
});

document.querySelector('#btn-buttons-back3').addEventListener('click', function () {
    document.querySelector('#list-transportes').className = 'right';
    document.querySelector('[data-position="current"]').className = 'current';
});