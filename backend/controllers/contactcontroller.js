const nodemailer = require('nodemailer');
const db = require('../database/database');

exports.createContact = (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Config transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'innovazen.contact1@gmail.com',
      pass: 'pkvh niku ltid xpkl', // mot de passe d'application Gmail
    },
  });

  const mailOptions = {
    from: 'innovazen.contact1@gmail.com',
    to: 'innovazen.contact1@gmail.com',
    subject: `Nouveau message de ${nom} via le formulaire de contact`,
    text: `Nom: ${nom}\nEmail: ${email}\nMessage:\n${message}`,
  };

  // Envoi email + ensuite insertion DB
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Erreur d'envoi de l'email:", err);
      return res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
    }

    console.log('Email envoyé:', info.response);

    // Si email OK → insérer dans DB
    const sql = 'INSERT INTO contact (nom, email, message) VALUES (?, ?, ?)';
    db.query(sql, [nom, email, message], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }

      // ✅ Réponse envoyée UNE SEULE FOIS ici
      return res.status(200).json({ message: 'Message envoyé avec succès' });
    });
  });
};
