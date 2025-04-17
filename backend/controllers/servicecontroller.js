const db = require('../database/database.js');

exports.getAllServices = (req, res) => {
  const sql = 'SELECT * FROM service';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
// Dans ton serviceController.js :
exports.getServiceById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM service WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Service non trouvé' });
      res.json(results[0]);
    });
  };
  

  