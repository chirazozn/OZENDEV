const db = require('../database/database.js');

// Get all services (names + IDs)
exports.getAllServices = (req, res) => {
  db.query('SELECT id, name FROM service', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
// Get realisations of a specific service
exports.getRealisationsByService = (req, res) => {
    const id = req.params.serviceId;
    const sql = 'SELECT realisation FROM service WHERE id = ?';
  
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (result.length === 0) return res.status(404).json({ error: 'Not found' });
  
      let realisations = result[0].realisation;
  
      // 🔍 Debug : afficher le type
      console.log('Type of realisation:', typeof realisations);
  
      try {
        // ✅ Ne parser que si c’est une string
        if (typeof realisations === 'string') {
          realisations = JSON.parse(realisations);
        }
  
        res.json(realisations);
      } catch (e) {
        console.error('JSON parsing error:', e);
        res.status(500).json({ error: 'Invalid JSON format in DB' });
      }
    });
  };
  