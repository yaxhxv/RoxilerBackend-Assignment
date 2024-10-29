const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// Fetch data and seed database
router.get('/seed', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Clean database before seeding
    await Transaction.deleteMany({});
    
    // Seed database
    await Transaction.insertMany(transactions);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error });
  }
});

module.exports = router;
