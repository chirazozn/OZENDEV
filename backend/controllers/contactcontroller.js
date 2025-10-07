const axios = require('axios');
const db = require('../database/database');

exports.createContact = async (req, res) => {
  const { nom, email, message } = req.body;

  console.log("📩 Requête reçue :", { nom, email, message });

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // 1️⃣ Envoi de l’email via l’API Brevo
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: "innovazen.contact1@gmail.com", name: "Innovazen Website" },
        to: [{ email: "innovazen.contact1@gmail.com" }],
        subject: `Nouveau message de ${nom} via le formulaire de contact`,
        textContent: `Nom: ${nom}\nEmail: ${email}\nMessage:\n${message}`,
      },
      {
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    console.log("✅ Email envoyé via Brevo :", response.data);

    // 2️⃣ Insertion dans la base de données
    const sql = 'INSERT INTO contact (nom, email, message) VALUES (?, ?, ?)';
    db.query(sql, [nom, email, message], (err, result) => {
      if (err) {
        console.error("❌ Erreur SQL :", err);
        return res.status(500).json({ error: "Erreur serveur lors de l'insertion." });
      }
      console.log("✅ Message inséré en DB avec ID :", result.insertId);
      return res.status(200).json({ message: "Message envoyé et stocké avec succès" });
    });

  } catch (error) {
    console.error("❌ Erreur API Brevo :", error.response?.data || error.message);
    return res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
};
