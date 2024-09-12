const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const requestIp = require('request-ip');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173' // Vite development server
}));
app.use(express.json({ extended: false }));
app.use(requestIp.mw()); // Middleware to get client IP

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
