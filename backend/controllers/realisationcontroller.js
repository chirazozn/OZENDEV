// backend/controllers/realisationcontroller.js
const db = require('../database/database.js');

// Modifier le contrôleur pour transformer les données
exports.getAllRealisations = (req, res) => {
    const sql = 'SELECT id, name, realisation FROM service';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur récupération des réalisations :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      // On transforme les données dans le format attendu par le frontend
      let allRealisations = [];
      results.forEach(service => {
        try {
          const realisationsData = JSON.parse(service.realisation);
          // On transforme chaque réalisation pour avoir le bon format
          const transformedRealisations = realisationsData.map(item => ({
            title: item.titre,
            image_url: item.image,
            description: item.description
          }));
          allRealisations = [...allRealisations, ...transformedRealisations];
        } catch (e) {
          console.error('Erreur parsing JSON:', e);
        }
      });
  
      res.json(allRealisations);
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
