// Import required modules
const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'https://inovadev.vercel.app' // remplace avec ton vrai lien Vercel
}));
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '../public/images')));
const port = process.env.PORT || 3001;
app.use(cors()); // Allows cross-origin requests (e.g., from your React frontend)
app.use(express.json()); // Parses incoming JSON requests





// Routes
const serviceRoutes = require('./routes/serviceroute'); 
app.use('/api', serviceRoutes); 
const contactRoutes = require('./routes/contactroute');
app.use('/api', contactRoutes);









// Default route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Inova Dev API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
