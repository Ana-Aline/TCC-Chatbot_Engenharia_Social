const express = require('express');
const router = express.Router();
const attackerController = require('../../controllers/attackerController');


router.post('/createAttacker', attackerController.createAttacker);

module.exports = router;