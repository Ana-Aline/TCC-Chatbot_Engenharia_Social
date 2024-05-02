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
        console.log("Atacante criado com sucesso. ID:", attackerId);
        return attackerId;
    } catch (error) {
        console.error("Erro ao criar o atacante:", error);
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
        console.error(error);
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
        console.log("Thread criada com sucesso. ID:", threadId);
        return threadId;
    } catch (error) {
        console.error("Erro ao criar a thread:", error);
        throw error;
    }
}
async function createMessasge(token, thread, sms) {
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
        console.log("Mensagem criada com sucesso. ID:", message);

        return message;
    } catch (error) {
        console.error("Erro ao criar a mensagem:", error);
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
        console.log("thread executada com sucesso. ID:", response.data.id);
        if(response.status !== 200){
            return false;
        }
        return true;

    } catch(error) {
        console.error("Erro ao executar a thread: ", error);
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
               // console.log(`Olha aqui: ${role}`)
              //  console.log(response.data.data[0].content[0].text.value); 
            } 
            //return response.data.content.text.value;
            //ESTÁ PEGANDO A ÚLTIMA MENSAGEM, MAS NÃO ESTÁ MANDANDO NO CHAT A MENSAGEM, POR ISSO RETORNA UNDEFINED
    
        } catch (error) {
            console.error("Erro ao capturar a mensagem: ", error);
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
        console.log("Enviado com sucesso");
        return true;

    } catch(error) {
        console.error("Erro ao enviar no whats: ", error);
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
        console.log("Vítima criada com sucesso. ID:", victimId);
        return victimId;
    } catch (error) {
        console.error("Erro ao criar a vítima:", error);
        throw error;
    }
}

async function runSimulation() {
    try {
        const attackerChat = dados.whatId.attacker;
        const victimChat = dados.whatId.victim;
        // Gerar o token [falta]
        const token = await getToken();

        // Criar o atacante e salvar o ID
        const attackerId = await createAttacker(token);

        // // Criar a vítima e salvar o ID
        const victimId = await createVictim(token);

        // //Criar thread para o atacante
        const attackerThread = await createThread(token);

        // //Criar thread para a vítima
        const victimThread = await createThread(token);

        // //loop
        /*let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVGFsdmV6IG7Do28gY2hlZ3VlaSBhb25kZSBwbGFuZWplaSBpci4gTWFzIGNoZWd1ZWksIHNlbSBxdWVyZXIsIGFvbmRlIG1ldSBjb3Jhw6fDo28gcXVlcmlhIGNoZWdhciwgc2VtIHF1ZSBldSBvIHNvdWJlc3NlIiwiaWF0IjoxNzE0NTgwNDg1LCJleHAiOjE3MTQ2NjY4ODV9.IXAiUMcNnCyWk2y3qSsXyANcye27wNrnZrxGFUgYBic";
        let attackerThread = "thread_zlpB7Sh82xSbn9ZVvpAqg645";
        let attackerId = "asst_NUR53IWsvNOGUdG80AuzM0t4";*/
        let sms = "Inicie o ataque enviando a primeria mensagem para sua vítima";

        console.log("Execucao 2");

        let count = 0;
        while(count < 10){
            console.log(count);
            await createMessasge(token, attackerThread, sms);
            await executeThread(token, attackerThread, attackerId); //dei a ordem para o atacante
            sms = await getMessage(token, attackerThread);

        
            //enviar a mensagem do atacante para a vítima no whatsapp
            await sendWhats(token, victimChat, sms, "ATACANTE"); //O atacante envia a mensagem para a vítima


            await createMessasge(token, victimThread, sms);
            await executeThread(token, victimThread, victimId); //mandei a mensagem para a vítima
            sms = await getMessage(token, victimThread);

            await sendWhats(token, attackerChat, sms, "VITIMA");
            count++;
        }


    } catch (error) {
        console.error("Erro durante a execução da simulação:");
    }
}

runSimulation();
