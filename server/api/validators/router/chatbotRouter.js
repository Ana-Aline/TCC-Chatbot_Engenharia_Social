// routes/whatsappRoutes.js

const express = require('express');
const router = express.Router();
const whatsappController = require('../../controllers/chatbotController');

console.log("Cheguei aqui")
router.get('/last-incoming-message', whatsappController.captureLastIncomingMessage);
router.post('/send-message', whatsappController.sendMessage);
router.post('/createThread', whatsappController.createThread);

module.exports = router;