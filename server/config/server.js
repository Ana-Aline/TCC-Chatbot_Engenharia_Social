// Configura e inicia o servidor HTTP.
const port = 3000;
const bodyParser = require('body-parser')
const express = require('express');
const server = express();

//Analisa os parâmetros da consulta da URL e converte valores de string para inteiro #002
const queryParser = require('express-query-int');
//permitir que aplicativos web façam solicitações para a sua API a partir de domínios diferentes
const allowCors = require('./cors')

//Essas duas (13-14) configuram o limite do corpo da solicitação. #001
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(queryParser());
server.use(allowCors);
//Permite disponibilizar arquivos para o cliente que acessam a aplicação
server.use(express.static('public'));


server.listen(port, () => {
    console.log(`BACKEND is runner on port ${port}`);
});

module.exports = server