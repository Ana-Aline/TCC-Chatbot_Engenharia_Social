const beautifyUnique = require('mongoose-beautiful-unique-validation')
const restful = require('node-restful')
const mongoose = restful.mongoose

const victimSchema = new mongoose.Schema({
    Id: { type: String, required: false },
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Sex: {type: String, required: true},
    Profession: { type: String, required: true },
    Personality: { type: String, required: true },
    InterestsHobbies: { type: String, required: true },
    PhysicalAppearance: { type: String, required: true },
    StrengthsWeaknesses: { type: String, required: true },
    SpecialSkills: { type: String, required: true },
    GoalsMotivations: { type: String, required: true },
    Context: {type: String, required: false},
    Instruction: {type: String, required: false}
 })
 
 victimSchema.plugin(beautifyUnique);
 
 module.exports = restful.model('Victim', victimSchema);