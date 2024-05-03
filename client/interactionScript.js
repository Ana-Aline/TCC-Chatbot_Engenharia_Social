const axios = require('axios');
const { delay } = require('bluebird');
const dados = require('./dados.json');

async function createAttacker(token) {
    try {
        const attackerData = dados.attacker;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        const response = await axios.post('http://localhost:3000/api/attacker/createAttacker', attackerData, { headers });
        const attackerId = response.data.id;
        console.log("Attacker successfully created. ID:", attackerId);
        return attackerId;
    } catch (error) {
        console.error("Error creating the attacker: ");
        throw error;
    }
}

async function getToken(){
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const payload = dados.secret
        const response = await axios.post('http://localhost:3000/api/auth', payload, {headers});
        return response.data.token;
        
    } catch (error) {
        console.error("Error retrieving token: ");
        throw error;
    }
}

async function createThread(token){
    try{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        const response = await axios.post('http://localhost:3000/api/chatbot/createThread',{}, { headers });
        const threadId = response.data.id;
        console.log("Thread successfully created. ID:", threadId);
        return threadId;
    } catch (error) {
        console.error("Error creating the thread: ");
        throw error;
    }
}
async function createMessage(token, thread, sms) {
    try{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        const payload = {
            thread: thread,
            role: "user",
            content: sms
        }
        const response = await axios.post('http://localhost:3000/api/chatbot/createMessage', payload, { headers });
        const message = response.data.id;
        console.log("Message successfully created. ID:", message);

        return message;
    } catch (error) {
        console.error("Error creating the message: ");
        throw error;
    }

}
async function executeThread(token, thread, personId) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    const payload = {
        assistant_id: personId,
        thread: thread
    }
    try{
        const response = await axios.post('http://localhost:3000/api/chatbot/executeThread', payload, { headers });  
        console.log("Thread executed successfully. ID: ", response.data.id);
        
        return (response.status === 200);

    } catch(error) {
        console.error("Error executing the thread: ");
        throw error;
    }
}

async function getMessage(token, thread){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
        'thread': thread
    };

    let response = '';
    let role = '';
    
    while (role !== 'assistant' ){
        try {
            response = await axios.get('http://localhost:3000/api/chatbot/messageThread', { headers } );
            
            if(response !== undefined){
                role = response.data.data[0].role;
            } 
    
        } catch (error) {
            console.error("Error capturing the message: ");
            throw error; 
        }
        await delay(3000);
    }
    return response.data.data[0].content[0].text.value;
}

async function sendWhats(token, chatId, message, persona){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    };
    const payload = {
        persona: persona,
        chatId: chatId,
        message: message
    }
    try{
        const response = await axios.post('http://localhost:3000/api/chatbot//send-message', payload, { headers });  
        if(response.status !== 200){
            return false;
        }
        console.log("Sent successfully");
        return true;

    } catch(error) {
        console.error("Error sending on WhatsApp: ");
        throw error;
    }
}

async function createVictim(token) {
    try {
        const victimData = dados.victim;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        const response = await axios.post('http://localhost:3000/api/victim/createVictim', victimData, { headers });
        const victimId = response.data.id;
        console.log("Victim successfully created. ID:", victimId);
        return victimId;
    } catch (error) {
        console.error("Error creating the victim: ");
        throw error;
    }
}

async function runSimulation() {
    try {
        const attackerChat = dados.whatId.attacker;
        const victimChat = dados.whatId.victim;

        //Before the attack.
        const token = await getToken();
        const attackerId = await createAttacker(token);
        const victimId = await createVictim(token);
        const attackerThread = await createThread(token);
        const victimThread = await createThread(token);

        let sms = "Inicie o ataque enviando a primeira mensagem para sua vítima";

        //Messages exchange during the attack
        let count = 0;
        while(count < 10){
            console.log(count);

            await createMessage(token, attackerThread, sms);
            await executeThread(token, attackerThread, attackerId); 

            sms = await getMessage(token, attackerThread);
            await sendWhats(token, victimChat, sms, "ATACANTE");

            await createMessage(token, victimThread, sms);
            await executeThread(token, victimThread, victimId);

            sms = await getMessage(token, victimThread);
            await sendWhats(token, attackerChat, sms, "VITIMA");

            count++;
        }


    } catch (error) {
        console.error("Error during simulation execution: ", error);
    }
}

runSimulation();
