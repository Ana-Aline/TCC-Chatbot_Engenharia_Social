const victimService = require('../services/victimSevices');

async function createVictim(req, res) {
    try {
        const newVictim = await victimService.createVictim(req.body);
        res.status(201).json(newVictim);
    } catch (error) {
        console.error("Erro ao criar perfil de vítima:", error);
        res.status(500).json({ error: "Erro ao criar perfil de vítima" });
    }
}

module.exports = {
    createVictim
};