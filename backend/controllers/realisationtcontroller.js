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
  const serviceId = req.params.serviceId;

  db.query('SELECT realisation FROM service WHERE id = ?', [serviceId], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) return res.status(404).json({ message: 'Service not found' });

    const realisations = JSON.parse(results[0].realisation);
    res.json(realisations);
  });
};
