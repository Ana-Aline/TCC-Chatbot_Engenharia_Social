// services/whatsappService.js

const axios = require('axios');
const idInstance_atac = process.env.GREEN_INSTANCE_ID_ATACANTE;
const apiTokenInstance_atac = process.env.GREEN_TOKEN_ATACANTE;
const idInstance_vit = process.env.GREEN_INSTANCE_ID_VITIMA;
const apiTokenInstance_vit = process.env.GREEN_TOKEN_VITIMA;
const message = require('../validators/model/chatbotModel');
const apiUrl = "https://api.greenapi.com";
const apiUrlOpen = "https://api.openai.com/v1";
const minutes = 1440;

async function captureLastIncomingMessage(req) {

    const requestUrl = `${apiUrl}/waInstance${idInstance_vit}/lastIncomingMessages/${apiTokenInstance_vit}?minutes=${minutes}`;
    if(req.persona == "ATACANTE"){
        requestUrl = `${apiUrl}/waInstance${idInstance_atac}/sendMessage/${apiTokenInstance_atac}`;
    }  

    try {
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        console.error("Erro ao capturar a última mensagem recebida: service", error);
        throw error;
    }
}

async function sendMessage(req) {
    var requestUrl = `${apiUrl}/waInstance${idInstance_vit}/sendMessage/${apiTokenInstance_vit}`;
    if(req.persona == "ATACANTE"){
        requestUrl = `${apiUrl}/waInstance${idInstance_atac}/sendMessage/${apiTokenInstance_atac}`;
    }  
    console.log("ANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    const headers = {
        'Content-Type': 'application/json'
    };
    const payload = {
        'chatId': `${req.chatId}`,
        'message': `${req.message}`
    };
    
    try {
        const response = await axios.post(requestUrl, payload, { headers });
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar mensagem: controller service", error);
        throw error;
    }
}

async function createThread() {

    const requestUrl = `${apiUrlOpen}/threads`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1'
    };

    try {
        const response = await axios.post(requestUrl, { headers });
        return response.data;
    } catch (error) {
        console.error("Erro ao capturar a última mensagem recebida: controller service", error);
        throw error;
    }
}

module.exports = { captureLastIncomingMessage, sendMessage };
