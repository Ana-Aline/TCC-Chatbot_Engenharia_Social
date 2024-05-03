//Definição das rotas da API
require('dotenv').config()
const express = require('express')

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' + `${token} e ${process.env.TOKEN_SECRET} e ${decoded.id}`});

        req.userId = decoded.id;
        next();
    });
}


module.exports = function (server) {
    const protectedApi = express.Router();
    server.use('/api', protectedApi);

    server.use('/status', (res) =>
        res.send(`BACKEND do TCC is runner.`)

    );

    const authRouter = require('../api/validators/routers/authRouter');
    protectedApi.use('/', authRouter);

    protectedApi.use(verifyToken);

    const whatsappRouter = require('../api/validators/routers/chatbotRouter');
    protectedApi.use('/chatbot', whatsappRouter);

    const victimRouter = require('../api/validators/routers/victimRouter');
    protectedApi.use('/victim', victimRouter);

    const attackerRouter = require('../api/validators/routers/attackerRouter');
    protectedApi.use('/attacker', attackerRouter);

    //configura o servidor para servir arquivos estáticos localizados no diretório public
    server.use(express.static(require('path').join(__dirname, '../public')));
}