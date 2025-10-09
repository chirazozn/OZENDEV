const express = require("express");
const router = express.Router();
const { handleChat } = require("../controllers/chatController");

// Route POST vers ton contrôleur
router.post("/", handleChat);

module.exports = router;
