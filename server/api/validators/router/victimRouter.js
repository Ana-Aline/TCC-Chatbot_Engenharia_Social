const express = require('express');
const router = express.Router();
const victimConstroller = require('../../controllers/victimController');

//console.log("Cheguei aqui")

router.post('/createVictim', victimConstroller.createVictim);

module.exports = router;