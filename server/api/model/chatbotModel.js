const beautifyUnique = require('mongoose-beautiful-unique-validation')
const restful = require('node-restful');
const mongoose = restful.mongoose


const chatSchema = new mongoose.Schema({
    persona: { type: String, required: false },
    chatId: { type: String, required: true },
    message: { type: String, required: true }
 })
 
 chatSchema.plugin(beautifyUnique);
 
 module.exports = restful.model('Chat', chatSchema);