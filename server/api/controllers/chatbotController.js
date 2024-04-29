// controllers/whatsappController.js

const whatsappService = require('../services/chatbotSevice');

async function captureLastIncomingMessage(req, res) {
    try {
        const lastIncomingMessage = await whatsappService.captureLastIncomingMessage(req);
        console.log("Cheguei aqui para mostrar a mensagem")
        res.status(200).json(lastIncomingMessage);
    } catch (error) {
        console.error("Erro ao capturar a última mensagem recebida controller console:", error);
        res.status(500).json({ error: "Erro ao capturar a última mensagem recebida controler response" });
    }
}

async function sendMessage(req, res) {
    try {
        const message = await whatsappService.sendMessage(req.body);
        console.log("Enviandoooooo");
        res.status(200).json(message);
    } catch (error) {
        console.error("Erro ao eviar mensagem controller console:", error);
        res.status(500).json({ error: "Erro ao eviar mensagem controller console" });
    }
}

async function createThread(req, res){
    try {
        const thread = await whatsappService.createThread();
        res.status(200).json(thread);
    } catch (error) {
        console.error("Erro criar thread:", error);
        res.status(500).json({ error: "Erro criar thread" }); 
    }
}

module.exports = { captureLastIncomingMessage, sendMessage, createThread };