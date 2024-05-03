const whatsappService = require('../services/chatbotService');

async function captureLastIncomingMessage(req, res) {
    try {
        const lastIncomingMessage = await whatsappService.captureLastIncomingMessage(req);
        res.status(200).json(lastIncomingMessage);
    } catch (error) {
        res.status(500).json({ error: "Error capturing the last received message control response" });
    }
}

async function sendMessage(req, res) {
    try {
        const message = await whatsappService.sendMessage(req.body);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error sending message to controller console" });
    }
}

async function createThread(req, res){
    try {
        const thread = await whatsappService.createThread();
        res.status(200).json(thread);
    } catch (error) {
        res.status(500).json({ error: "Error creating thread" }); 
    }
}

async function createMessage(req, res){
    try {
        const message = await whatsappService.createMessage(req);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error creating message" });  
    }
}

async function executeThread(req, res){
    try {
        const statusExecute = await whatsappService.executeThread(req);
        res.status(200).json(statusExecute);
    } catch (error) {
        res.status(500).json({ error: "Error executing the thread"});
    }
}

async function messageThread(req, res){
    try {
        const message = await whatsappService.messageThread(req);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error capturing response"});
    }
}

module.exports = { captureLastIncomingMessage, sendMessage, createThread, createMessage, executeThread, messageThread };
