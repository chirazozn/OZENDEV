// backend/controllers/realisationcontroller.js
const db = require('../database/database.js');

// Modifier le contrôleur pour transformer les données
exports.getAllRealisations = (req, res) => {
    console.log('API /api/realisations appelée');
    const sql = 'SELECT id, name, realisation FROM service';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Erreur récupération des réalisations :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
  
      console.log('Résultats bruts de la BD:', results);
      
      try {
        // On parse les JSON pour faciliter l'affichage côté frontend
        const realisations = results.map(service => {
          try {
            const parsedRealisation = typeof service.realisation === 'string' 
              ? JSON.parse(service.realisation) 
              : service.realisation;
              
            return {
              id: service.id,
              name: service.name,
              realisation: parsedRealisation
            };
          } catch (parseError) {
            console.error('Erreur parsing JSON pour service id', service.id, parseError);
            return {
              id: service.id,
              name: service.name,
              realisation: [] // Valeur par défaut en cas d'erreur
            };
          }
        });
  
        console.log('Données transformées envoyées au frontend:', realisations);
        res.json(realisations);
        
      } catch (e) {
        console.error('Erreur générale:', e);
        res.status(500).json({ error: 'Erreur serveur lors du traitement des données' });
      }
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
