const db = require('../database/database');

exports.createContact = (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const sql = 'INSERT INTO contact (nom, email, message) VALUES (?, ?, ?)';
  db.query(sql, [nom, email, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Message envoyé avec succès' });
  });
};
