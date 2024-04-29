const beautifyUnique = require('mongoose-beautiful-unique-validation')
const restful = require('node-restful')
const mongoose = restful.mongoose


const authSchema = new mongoose.Schema({
    codeSecret: { type: String, required: true }
 })
 
 authSchema.plugin(beautifyUnique);
 
 module.exports = restful.model('Auth', authSchema);