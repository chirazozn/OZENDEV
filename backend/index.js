// Import required modules
const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({ origin: "*"}));
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '../public/images')));
const port = process.env.PORT || 3001;
app.use(cors()); // Allows cross-origin requests (e.g., from your React frontend)
app.use(express.json()); // Parses incoming JSON requests


const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);




// Santé
app.get('/api/health', (req, res) => res.json({ ok: true }));



// Routes
const serviceRoutes = require('./routes/serviceroute'); 
app.use('/api', serviceRoutes); 
const contactRoutes = require('./routes/contactroute');
app.use('/api', contactRoutes);
const realisationRoute = require('./routes/realisationroute');//HOME
app.use('/api/realisations', realisationRoute);
const realisationTRoute = require('./routes/realisationtroute'); //voir tt DANS REALISATION PAGE 
app.use('/api/realisation', realisationTRoute);








// Default route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Inova Dev API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
