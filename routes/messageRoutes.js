const express = require('express');
const router = express.Router();
const {addMessage, getMessages, getMessageByThreadId} = require('../controllers/messageController')
const {chatwithAi} = require('../AI/Aibot')

router.post('/ai_message', chatwithAi)
router.get('/', getMessages);
router.post("/", addMessage);
router.get('/:searchId', getMessageByThreadId); 


module.exports = router;