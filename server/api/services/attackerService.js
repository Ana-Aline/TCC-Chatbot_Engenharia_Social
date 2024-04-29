const axios = require('axios');
const Attacker = require('../validators/model/attackerModel');
const apiUrl = "https://api.openai.com/v1";

async function createAttacker(attackerData) {
    try {
        // Cria uma nova instância do modelo attacker com os dados fornecidos
        const newAttacker = new Attacker(attackerData);
        // Salva a nova vítima no banco de dados
        const savedAttacker = await newAttacker.save();
        return createAssistant(savedAttacker);
    } catch (error) {
        console.error("Erro ao criar perfil de vítima no serviço:", error);
        throw error;
    }
}

async function createAssistant(newAttacker){
    const requestUrl = `${apiUrl}/assistants`;
    const payload = {
        instructions: `Vou te descrever, você é ${newAttacker.Name}, sexo: ${newAttacker.Sex},
                 profissão: ${newAttacker.Profession}, personalidade: ${newAttacker.Personality}, 
                 Interesse: ${newAttacker.Interests}, experiência: ${newAttacker.Background}, 
                 habilidades: ${newAttacker.Skills}, metas e motivações: ${newAttacker.GoalsMotivations}.\n
                 ${newAttacker.Context}\n\n ${newAttacker.Instruction}`,
        name: "Attacker",
        model: "gpt-3.5-turbo",
    };
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v2'
    };

    try {
        const response = await axios.post(requestUrl, payload, { headers });
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar mensagem: controller service", error);
        throw error;
    }
}

module.exports = {
    createAttacker
};
