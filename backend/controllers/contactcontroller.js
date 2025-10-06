const nodemailer = require('nodemailer');
const db = require('../database/database');

exports.createContact = (req, res) => {
  const { nom, email, message } = req.body;

  console.log("📩 Requête reçue :", { nom, email, message });

  if (!nom || !email || !message) {
    console.warn("⚠️ Champs manquants :", { nom, email, message });
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Config transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'innovazen.contact1@gmail.com',
      pass: 'pkvh niku ltid xpkl', // ⚠️ mot de passe d'application Gmail
    },
  });

  const mailOptions = {
    from: 'innovazen.contact1@gmail.com',
    to: 'innovazen.contact1@gmail.com',
    subject: `Nouveau message de ${nom} via le formulaire de contact`,
    text: `Nom: ${nom}\nEmail: ${email}\nMessage:\n${message}`,
  };

  console.log("📨 Tentative d'envoi d'email avec :", mailOptions);

  // Envoi email + ensuite insertion DB
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Erreur d'envoi de l'email:", err);
      return res.status(500).json({ error: "Erreur lors de l'envoi de l'email.", details: err.message });
    }

    console.log("✅ Email envoyé avec succès :", info.response);

    // Si email OK → insérer dans DB
    const sql = 'INSERT INTO contact (nom, email, message) VALUES (?, ?, ?)';
    console.log("🛠️ Exécution SQL :", sql, [nom, email, message]);

    db.query(sql, [nom, email, message], (err, result) => {
      if (err) {
        console.error("❌ Erreur SQL :", err);
        return res.status(500).json({ error: "Erreur serveur lors de l'insertion.", details: err.message });
      }

      console.log("✅ Message inséré en DB avec ID :", result.insertId);
      return res.status(200).json({ message: "Message envoyé et stocké avec succès" });
    });
  });
};
