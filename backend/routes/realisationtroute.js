const express = require('express');
const router = express.Router();
const realisationTController = require('../controllers/realisationtcontroller');

router.get('/services', realisationTController.getAllServices); // noms services
router.get('/realisations/:serviceId', realisationTController.getRealisationsByService);

module.exports = router;
