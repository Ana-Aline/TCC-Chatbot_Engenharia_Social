const attackerService = require('../services/attackerService');

async function createAttacker(req, res) {
    try {
        const newAttacker = await attackerService.createAttacker(req.body);
        res.status(201).json(newAttacker);
    } catch (error) {
        console.error("Error creating attacker profile:", error);
        res.status(500).json({ error: "Error creating attacker profile" });
    }
}

module.exports = {
    createAttacker
};