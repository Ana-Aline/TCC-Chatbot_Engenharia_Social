const express = require('express');
const router = express.Router();
const victimController = require('../controllers/victimController');

router.post('/createVictim', victimController.createVictim);

module.exports = router;