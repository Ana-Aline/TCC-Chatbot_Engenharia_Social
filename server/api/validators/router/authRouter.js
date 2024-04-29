const express = require('express');
const { postAuth } = require('../../controllers/authController');

const router = express.Router();

// Rota de autenticação
router.post('/auth', postAuth);

module.exports = router;
