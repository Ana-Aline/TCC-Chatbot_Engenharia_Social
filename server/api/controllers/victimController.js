const victimService = require('../services/victimService');

async function createVictim(req, res) {
    try {
        const newVictim = await victimService.createVictim(req.body);
        res.status(201).json(newVictim);
    } catch (error) {
        res.status(500).json({ error: "Error creating victim profile" });
    }
}

module.exports = {
    createVictim
};