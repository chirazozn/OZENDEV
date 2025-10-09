const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route POST /api/chat
router.post('/', chatController.handleChat);

module.exports = router;
