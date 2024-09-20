const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Allow CORS
app.use(express.json()); // for parsing application/json

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const ratingRoutes = require('./routes/rating');
const storeRoutes = require('./routes/StoreR');
// const uR = require('./routes/userRoutes')
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/StoreR',storeRoutes)
// app.use('/userRoute',uR)
// app.use('/auth', authRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
