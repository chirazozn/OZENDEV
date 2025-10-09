const axios = require('axios');

exports.handleChat = async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    // Appel à OpenAI (ou autre IA)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          ...messages
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    const assistantMessage = response.data.choices[0].message;
    res.json({ assistant: assistantMessage });

  } catch (err) {
    console.error("Erreur Chat :", err.response?.data || err.message);
    res.status(500).json({ error: "Erreur serveur Chat" });
  }
};
