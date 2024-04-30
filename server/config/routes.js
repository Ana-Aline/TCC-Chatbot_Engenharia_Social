//Definição das rotas da API
//nesse projeto vou usar o express
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' + `${token} e ${process.env.TOKEN_SECRET} anaaaa ${decoded.id}`});

        // Se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

//exporta o módulo principal do arquivo. Recebe um parâmetro que é a instância do servidor 
module.exports = function (server) {
    //cria um roteador express
    const protectedApi = express.Router();
    //diz que vou usar o roteador para definir as rotas
    server.use('/api', protectedApi);

    //definindo a rota de status
    server.use('/status', (req, res) =>
        res.send(`BACKEND do TCC is runner.`)

    );

    //AQUI POSSO DEFINIR ROTAS ESPECÍFICAS DO CHATBOT
    // Rota de autenticação
    /*const authRouter = require('../api/auth/authService')
    authRouter.register(protectedApi, '/auth');*/

    const authRouter = require('../api/validators/router/authRouter')
    protectedApi.use('/', authRouter);

    protectedApi.use(verifyToken);

    console.log("Cheguei no routes")

    const whatsappRouter = require('../api/validators/router/chatbotRouter');
    protectedApi.use('/chatbot', whatsappRouter);

    const victimRouter = require('../api/validators/router/victimRouter');
    protectedApi.use('/victim', victimRouter);

    const attackerRouter = require('../api/validators/router/attackerRouter');
    protectedApi.use('/attacker', attackerRouter);

    /*// Testando validação
    server.use('/teste', verifyToken, (req, res) =>
        res.send(`BACKEND do TCC is runner with token.`)
    );*/

    //configura o servidor para servir arquivos est[aticos localizados no diretório public]
    server.use(express.static(require('path').join(__dirname, '../public')));
}