// backend/routes/realisationroute.js
const express = require('express');
const router = express.Router();
const realisationController = require('../controllers/realisationcontroller');

// Route pour toutes les réalisations de tous les services
router.get('/', realisationController.getAllRealisations);

// Route pour les réalisations d’un service spécifique (par ID)
router.get('/:id', realisationController.getRealisationsByServiceId);

module.exports = router;
