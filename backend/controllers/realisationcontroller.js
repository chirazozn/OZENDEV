// backend/controllers/realisationcontroller.js
const db = require('../database/database.js');

// Obtenir toutes les réalisations (de tous les services)
exports.getAllRealisations = (req, res) => {
  const sql = 'SELECT id, name, realisation FROM service';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur récupération des réalisations :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    // On parse les JSON pour faciliter l'affichage côté frontend
    const realisations = results.map(service => ({
      id: service.id,
      name: service.name,
      realisation: JSON.parse(service.realisation)
    }));

    res.json(realisations);
  });
};

// Obtenir les réalisations d’un service spécifique (par ID)
exports.getRealisationsByServiceId = (req, res) => {
  const serviceId = req.params.id;
  const sql = 'SELECT realisation FROM service WHERE id = ?';

  db.query(sql, [serviceId], (err, results) => {
    if (err) {
      console.error('Erreur récupération des réalisations par service :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    const realisationData = JSON.parse(results[0].realisation);
    res.json(realisationData);
  });
};
