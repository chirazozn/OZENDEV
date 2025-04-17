const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/servicecontroller');

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
module.exports = router;
