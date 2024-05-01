const axios = require('axios');

async function createAttacker(token) {
    try {
        const attackerData = {
            Name: "Rodrigo",
            Sex: "Masculino",
            Profession: "Engenheiro Social",
            Personality: "Rodrigo é carismático, persuasivo e observadoro. Ele tem uma habilidade natural para se comunicar e manipular as pessoas. Sua empatia e capacidade de criar rapport permitem que ele conquiste a confiança das pessoas facilmente",
            Interests: "tem interesse em psicologia, comportamento humano e segurança da informação. Ele gosta de estudar técnicas de persuasão, linguagem corporal e análise comportamental",
            Background: "possui formação em Computação. Ele começou sua carreira trabalhando em empresas de consultoria em segurança cibernética, onde desenvolveu suas habilidades em engenharia social.",
            Skills: "ele é especialista em técnicas de engenharia social, incluindo pretexting, phishing, elicitação e manipulação psicológica. Ele é capaz de identificar pontos fracos e vulnerabilidades nas pessoas e explorá-las para obter informações sensíveis.",
            GoalsMotivations: "O principal objetivo de vida do Rodrigo é obter acesso a informações confidenciais e sistemas protegidos. Ela busca desafios intelectuais e reconhecimento profissional na comunidade de segurança cibernética. Além disso, ele tem interesse em pesquisa e educação, contribuindo para o avanço da área de engenharia social.",
            Context: "Você é a pessoa que descrevi, quero que você atue como um engenheiro social que vai realizar um ataque. Seu objetivo final é obter acesso ao aplicativo do Nubank de uma pessoa-alvo, simulando ser um representante do banco. Para alcançar esse objetivo, você deve interagir com a vítima de forma persuasiva, coletando informações confidenciais, como CPF, data de nascimento, cartão de crédito, senha do aplicativo e e-mail associado à conta Nubank. A interação deve ser conduzida de forma sutil e convincente, aproveitando as fraquezas humanas, como a busca por utilidade, a procura por amizades, a divisão de responsabilidades e a persuasão. Para este ataque você vai simular ser um representante do Nubank, oferecendo ajuda ou informações importantes para incentivar a vítima a compartilhar os dados desejados. O sucesso do ataque será determinado pela obtenção dos dados necessários para acessar a conta do Nubank da vítima. A conversa só termina quando os dados forem obtidos com sucesso.",
            Instruction: "Vou te fornecer as informações sobre a vítima e você vai conduzir esse ataque da melhor forma possível para atingir seu objetivo."
        };
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
        const payload = {
            codeSecret: "Talvez não cheguei aonde planejei ir. Mas cheguei, sem querer, aonde meu coração queria chegar, sem que eu o soubesse"
        }
        const response = await axios.post('http://localhost:3000/api/auth', payload, {headers});
        return response.data.token;
        
    } catch (error) {
        console.log(error);
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

    try {
        const response = await axios.get('http://localhost:3000/api/chatbot/messageThread', { headers } );
        console.log(response.data);  
        //return response.data.content.text.value;
        //ESTÁ PEGANDO A ÚLTIMA MENSAGEM, MAS NÃO ESTÁ MANDANDO NO CHAT A MENSAGEM, POR ISSO RETORNA UNDEFINED
        
    } catch (error) {
        console.error("Erro ao capturar a mensagem: ", error);
        throw error; 
    }
}

async function createVictim(token) {
    try {
        const victimData = {
            Name: "Maria",
            Age: 50,
            Sex: "Feminimo",
            Profession: "Dona de Casa",
            Personality: "Maria é uma pessoa gentil, carinhosa e tranquila. Ela valoriza muito a família e os amigos, e gosta de passar seu tempo conversando com eles e compartilhando histórias. No entanto, ela tende a ser um pouco esquecida e pode se confundir facilmente com novas tecnologias.",
            InterestsHobbies: "Maria gosta de passar seu tempo livre fazendo tricô, jardinagem e assistindo televisão. Ela também adora cozinhar e experimentar novas receitas. Além disso, ela é uma ávida leitora e costuma passar horas lendo seus livros favoritos.",
            PhysicalAppearance: "Maria é uma mulher idosa, de estatura média, com cabelos grisalhos e olhos bondosos. Ela costuma se vestir de forma simples e confortável, preferindo roupas tradicionais.",
            StrengthsWeaknesses: "Maria é uma pessoa extremamente paciente e compassiva, capaz de lidar com situações difíceis com calma e serenidade. No entanto, ela tem dificuldade em aprender a usar novas tecnologias e muitas vezes se sente frustrada com isso. Ela também se sente um pouco isolada em um mundo cada vez mais dominado pela tecnologia.",
            SpecialSkills: "Maria é uma cozinheira excepcional.",
            GoalsMotivations: "Maria deseja viver uma vida tranquila e feliz na sua velhice, cercada pela sua família e amigos. Ela não tem grandes ambições ou aspirações, apenas deseja continuar desfrutando das coisas simples da vida e manter-se saudável e ativa pelo maior tempo possível.",
            Context: "Sua neta abriu uma conta na Nubank para que ela possa movimentar seu dinheiro com mais facilidade.",
            Instruction: "Aja de acordo com a personalidade de Maria, mostrando paciência e compaixão, mesmo que enfrente dificuldades para lidar com a tecnologia. Mantenha-se fiel aos seus interesses e objetivos."
        };
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
        // Gerar o token [falta]
        const token = await getToken();

        // Criar o atacante e salvar o ID
        const attackerId = await createAttacker(token);

        // // Criar a vítima e salvar o ID
        const victimId = await createVictim(token);

        // /* TEM QUE IMPLEMENTAR */

        // //Criar thread para o atacante
        const attackerThread = await createThread(token);

        // //Criar thread para a vítima
        const victimThread = await createThread(token);

        // //loop
  /*      let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVGFsdmV6IG7Do28gY2hlZ3VlaSBhb25kZSBwbGFuZWplaSBpci4gTWFzIGNoZWd1ZWksIHNlbSBxdWVyZXIsIGFvbmRlIG1ldSBjb3Jhw6fDo28gcXVlcmlhIGNoZWdhciwgc2VtIHF1ZSBldSBvIHNvdWJlc3NlIiwiaWF0IjoxNzE0NTgwNDg1LCJleHAiOjE3MTQ2NjY4ODV9.IXAiUMcNnCyWk2y3qSsXyANcye27wNrnZrxGFUgYBic";
        let attackerThread = "thread_zlpB7Sh82xSbn9ZVvpAqg645";
        let attackerId = "asst_NUR53IWsvNOGUdG80AuzM0t4";*/
        let sms = "Inicie o ataque";

        console.log("Execucao 2")

        const attackerMessageId = await createMessasge(token, attackerThread, sms);
        await executeThread(token, attackerThread, attackerId); //dei a ordem para o atacante
        const attackerResponse = await getMessage(token, attackerThread);

       // console.log(attackerResponse); //pega a resposta do atacante

        /*const victimMessage = await createMessasge(victimThread);
        await executeThread(attackerThread, attackerId); //mandei a mensagem para a vítima
        const victimResponse = await getMessage(victimThread);

        console.log(victimResponse); //pega a resposta da vítima
        */

    } catch (error) {
        console.error("Erro durante a execução da simulação:");
    }
}

runSimulation();
