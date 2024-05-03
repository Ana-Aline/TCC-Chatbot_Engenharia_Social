// routes/whatsappRoutes.js

const express = require('express');
const router = express.Router();
const whatsappController = require('../../controllers/chatbotController');

router.get('/last-incoming-message', whatsappController.captureLastIncomingMessage);
router.get('/messageThread', whatsappController.messageThread)

router.post('/send-message', whatsappController.sendMessage);
router.post('/createThread', whatsappController.createThread);
router.post('/createMessage', whatsappController.createMessage);
router.post('/executeThread', whatsappController.executeThread);

module.exports = router;