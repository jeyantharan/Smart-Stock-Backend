const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const UserRoutes = require('./Route/User');
const ProductRoutes = require('./Route/Product');


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

// Routes
app.use('/user', UserRoutes);
app.use('/product', ProductRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://Jeyanth:Jeyanth@atlascluster.jootpmm.mongodb.net/Smart-Stock')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
