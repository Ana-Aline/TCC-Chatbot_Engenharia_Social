// whatsappBot.js
//Parece que não é usado

require('dotenv').config()
const WhatsAppBot = require('@green-api/whatsapp-bot');

const bot = new WhatsAppBot({
    idInstance: process.env.GREEN_INSTANCE_ID,
    apiTokenInstance: process.env.GREEN_TOKEN
});

bot.on('message', (ctx) => {
    console.log('Nova mensagem recebida:', ctx.message.text);
    ctx.reply('Hello world!');
});

bot.launch();
