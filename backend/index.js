// Import required modules
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // You can change this port if needed
const serviceRoutes = require('./routes/serviceroute'); // Import your routes file
const path = require('path');

// Pour servir les images depuis /public/images
app.use('/images', express.static(path.join(__dirname, '../public/images')));
// Middleware
app.use(cors()); // Allows cross-origin requests (e.g., from your React frontend)
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api', serviceRoutes); // All service-related routes will be handled by serviceRoutes

// Default route (Optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Inova Dev API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
