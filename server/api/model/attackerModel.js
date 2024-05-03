const beautifyUnique = require('mongoose-beautiful-unique-validation')
const restful = require('node-restful')
const mongoose = restful.mongoose

const attackerSchema = new mongoose.Schema({
    Id: { type: String, required: false },
    Name: { type: String, required: true },
    Sex: {type: String, required: true},
    Profession: { type: String, required: true },
    Personality: { type: String, required: true },
    Interests: { type: String, required: true },
    Background: { type: String, required: true },
    Skills: { type: String, required: true },
    GoalsMotivations: { type: String, required: true },
    Context: {type: String, required: false},
    Instruction: {type: String, required: false}
 })
 
 attackerSchema.plugin(beautifyUnique);
 
 module.exports = restful.model('Attacker', attackerSchema);