const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactcontroller');

router.post('/contact', contactController.createContact);

module.exports = router;
