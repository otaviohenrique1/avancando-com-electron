const path = require('path');
const Mousetrap = require('mousetrap');
const { remote } = require('electron');
const mainWindow = remote.BrowserWindow.getFocusedWindow();

let minimizar = document.getElementById('minimizar');
minimizar.addEventListener('click', function(e) {
    e.preventDefault();
    mainWindow.minimize();
});

let maximizar = document.getElementById('maximizar');
maximizar.addEventListener('click', function(e) {
    e.preventDefault();
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
        maximizar.textContent = 'maximizar';
    } else {
        mainWindow.maximize();
        maximizar.textContent = 'restaurar';
    }
});

let fullscreen = document.getElementById('fullscreen');
fullscreen.addEventListener('click', function(e) {
    e.preventDefault();
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

let fechar = document.getElementById('fechar');
fechar.addEventListener('click', function(e) {
    e.preventDefault();
    mainWindow.close();
});

let getgif = document.getElementById('getgif');
getgif.addEventListener('click', function(e) {
    e.preventDefault();
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.status == 200) {
            let response = JSON.parse(httpRequest.response);
            let imgUrl = response.data.image_url;
            document.getElementById('showgif').innerHTML = `<img src="${imgUrl}">`;
        }
    }
    httpRequest.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=UiB9kt1kqp4HRzYDmd5v9zJXaFoUzztc');
    httpRequest.send();
});

let notfication = document.getElementById('notification');
notfication.addEventListener('click', function(e) {
    e.preventDefault();
    let notfication = new Notification('Minha notificação', {
        body: 'Esta é uma notificacao do app',
        icon: path.join(__dirname, 'tray.png')
    });

    notfication.onclick = function() {
        alert('clicado com sucesso');
    }
});

Mousetrap.bind('up up down down left right t', function() {
    alert('Erik\s Win');
});

// Abrir developer tools -> ctrl + shift + i
// School of Net -> Programação -> Node.js -> Avançando com Electron -> Diferença entre Node e Webview - Exemplo de requisição ajax