const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const cors = require('cors');

app.use(cors({
  origin: '*' // or '*' for testing
}));

app.use(express.json()); // ✅ This is required to parse JSON bodies

// Your routes
app.use('/users', require('./routes/userRoutes'));
app.use('/sessions', require('./routes/sessionRoutes'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running!');
});


