const attackerService = require('../services/attackerService');

async function createAttacker(req, res) {
    try {
        const newAttacker = await attackerService.createAttacker(req.body);
        res.status(201).json(newAttacker);
    } catch (error) {
        console.error("Erro ao criar perfil do atacante:", error);
        res.status(500).json({ error: "Erro ao criar perfil do atacante" });
    }
}

module.exports = {
    createAttacker
};