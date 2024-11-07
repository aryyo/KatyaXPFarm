require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
const characterRoutes = require('./characterRoutes');
// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.use('/api', characterRoutes)

// Start server
app.listen(PORT, () => {
  console.log('Server is running');
});