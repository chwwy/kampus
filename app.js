const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Enable CORS
app.use(cors({
  origin: '*' // Adjust as needed for production
}));

// Parse JSON request bodies
app.use(express.json());

// Mount routes (must be CommonJS-style exports)
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const scanRoutes = require('./routes/scanRoutes');

app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/scan', scanRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
