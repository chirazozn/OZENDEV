const nodemailer = require('nodemailer');
const db = require('../database/database');

exports.createContact = (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Configuration du transporteur Nodemailer pour Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'inovadev.contact1@gmail.com', // Remplace par ton adresse Gmail
      pass: 'xgnh gosd mbtb idrh', // Remplace par ton mot de passe (ou mot de passe d’application)
    },
  });

  // Configuration du message à envoyer
  const mailOptions = {
    from: 'inovadev.contact1@gmail.com',
    to: 'inovadev.contact1@gmail.com', // Ton adresse email où le message sera envoyé
    subject: `Nouveau message de ${nom} via le formulaire de contact`,
    text: `Nom: ${nom}\nEmail: ${email}\nMessage:\n${message}`,
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erreur d\'envoi de l\'email:', err);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
    }
    console.log('Email envoyé:', info.response);
  });

  // Insertion dans la base de données
  const sql = 'INSERT INTO contact (nom, email, message) VALUES (?, ?, ?)';
  db.query(sql, [nom, email, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Message envoyé avec succès' });
  });
};
