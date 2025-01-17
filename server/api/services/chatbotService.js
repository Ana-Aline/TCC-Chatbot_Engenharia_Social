// services/whatsappService.js

const axios = require('axios');
const idInstance_atac = process.env.GREEN_INSTANCE_ID_ATACANTE;
const apiTokenInstance_atac = process.env.GREEN_TOKEN_ATACANTE;
const idInstance_vit = process.env.GREEN_INSTANCE_ID_VITIMA;
const apiTokenInstance_vit = process.env.GREEN_TOKEN_VITIMA;
const message = require('../validators/models/chatbotModel.js');
const apiUrl = "https://api.greenapi.com";
const apiUrlOpen = "https://api.openai.com/v1";
const minutes = 1440;

async function captureLastIncomingMessage(req) {

    let requestUrl = `${apiUrl}/waInstance${idInstance_vit}/lastIncomingMessages/${apiTokenInstance_vit}?minutes=${minutes}`;
    if(req.persona == "ATACANTE"){
        requestUrl = `${apiUrl}/waInstance${idInstance_atac}/sendMessage/${apiTokenInstance_atac}`;
    }  

    try {
        const response = await axios.get(requestUrl);
        return response.data;
    } catch (error) {
        console.error("Error capturing the last received message: service", error);
        throw error;
    }
}

async function sendMessage(req) {
    let requestUrl = `${apiUrl}/waInstance${idInstance_vit}/sendMessage/${apiTokenInstance_vit}`;
    if(req.persona == "ATACANTE"){
        requestUrl = `${apiUrl}/waInstance${idInstance_atac}/sendMessage/${apiTokenInstance_atac}`;
    }  
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
        console.error("Error sending message: service.", error);
        throw error;
    }
}

async function createThread() {
    
    const requestUrl = `${apiUrlOpen}/threads`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
    };

    try {
        const response = await axios.post(requestUrl, {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating thread: service", error);
        throw error;
    }
}

async function createMessage(req) {

    const requestUrl = `${apiUrlOpen}/threads/${req.body.thread}/messages`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
    };
    const payload = {
        'role': `${req.body.role}`,
        'content': `${req.body.content}`
    }
    
    try {
        const response = await axios.post(requestUrl, payload, { headers });
        return response.data;
    } catch (error) {
        console.error("Error creating message: service", error);
        throw error;
    }
}

async function executeThread(req){
    const requestUrl = `${apiUrlOpen}/threads/${req.body.thread}/runs`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
    };
    const payload = {
        'assistant_id': `${req.body.assistant_id}`
    }
    try {
        const response = await axios.post(requestUrl, payload, { headers });
        return response.data;
        
    } catch (error) {
        console.error("Error creating message: service", error);
        throw error;
    }
}

async function messageThread(req){
    const requestUrl = `${apiUrlOpen}/threads/${req.headers.thread}/messages?limit=1&order=desc`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
    };
    try {
        const response = await axios.get(requestUrl, { headers });
        return response.data;
        
    } catch (error) {
        console.error("Error creating message: service", error);
        throw error;
    }
}

module.exports = { captureLastIncomingMessage, sendMessage, createThread, createMessage, executeThread, messageThread };
