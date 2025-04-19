// Import required modules
const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'ozendev-qgja-git-main-chirazs-projects-a8d77e4c.vercel.app' // remplace avec ton vrai lien Vercel
}));
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '../public/images')));

//const port = 3001; // You can change this port if needed
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows cross-origin requests (e.g., from your React frontend)
app.use(express.json()); // Parses incoming JSON requests

// Routes
const serviceRoutes = require('./routes/serviceroute'); // Import your routes file
app.use('/api', serviceRoutes); // All service-related routes will be handled by serviceRoutes

// Default route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Inova Dev API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
