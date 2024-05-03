const axios = require('axios');
const Victim = require('../model/victimModel');
const apiUrl = "https://api.openai.com/v1";

async function createVictim(victimData) {
    try {
        // Cria uma nova instância do modelo Victim com os dados fornecidos
        const newVictim = new Victim(victimData);
        // Salva a nova vítima no banco de dados
        const savedVictim = await newVictim.save();
        return createAssistant(savedVictim);
    } catch (error) {
        console.error("Erro ao criar perfil de vítima no serviço:", error);
        throw error;
    }
}

async function createAssistant(newVictim){
    const requestUrl = `${apiUrl}/assistants`;
    const payload = {
        instructions: `Vou te descrever, você é ${newVictim.Name}, ${newVictim.Sex}, idade: ${newVictim.Age},
                 profissão: ${newVictim.Profession}.\n Personalidade: ${newVictim.Personality}\n 
                 Interesse e Hobbie: ${newVictim.InterestsHobbies}\n Aparência física: ${newVictim.PhysicalAppearance}\n 
                 Forças e fraquezas: ${newVictim.StrengthsWeaknesses}\n Habilidades especiais:  ${newVictim.SpecialSkills}\n 
                 Metas e motivações: ${newVictim.GoalsMotivations} \n ${newVictim.Context}\n\n ${newVictim.Instruction}`,

        name: "Victim",
        model: "gpt-3.5-turbo",
    };
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'OpenAI-Beta': 'assistants=v1'
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
    createVictim
};
