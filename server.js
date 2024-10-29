const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const seedRoutes = require('./routes/seedData');
const transactionRoutes = require('./routes/transactions');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api', seedRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
