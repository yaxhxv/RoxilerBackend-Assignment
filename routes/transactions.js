const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');


router.post('/add', async (req, res) => {
  try {
    const { title, description, price, category, sold, dateOfSale } = req.body;

    const newTransaction = new Transaction({
      title,
      description,
      price,
      category,
      sold,
      dateOfSale: dateOfSale ? new Date(dateOfSale) : new Date(),  // If date is provided, use it; otherwise use the current date
    });

    await newTransaction.save();  // Save the new transaction to the database
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transaction', error });
  }
});




// List transactions with search and pagination
router.get('/', async (req, res) => {
  const { search = '', page = 1, perPage = 10 } = req.query;
  const searchQuery = { 
    $or: [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: search ? Number(search) : { $exists: true } }
    ]
  };

  try {
    const transactions = await Transaction.find(searchQuery)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));
    
    const total = await Transaction.countDocuments(searchQuery);
    res.status(200).json({ total, transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
});


router.get('/statistics', async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month} 1`);
    const endDate = new Date(`${month} 31`);
  
    try {
      const totalSale = await Transaction.aggregate([
        { $match: { dateOfSale: { $gte: startDate, $lte: endDate }, sold: true }},
        { $group: { _id: null, totalSale: { $sum: "$price" }, totalSoldItems: { $sum: 1 }}}
      ]);
  
      const totalNotSoldItems = await Transaction.countDocuments({ 
        dateOfSale: { $gte: startDate, $lte: endDate },
        sold: false 
      });
  
      res.status(200).json({
        totalSale: totalSale[0]?.totalSale || 0,
        totalSoldItems: totalSale[0]?.totalSoldItems || 0,
        totalNotSoldItems
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching statistics', error });
    }
  });

  
  router.get('/barchart', async (req, res) => {
    const { month } = req.query;
    const startDate = new Date(`${month} 1`);
    const endDate = new Date(`${month} 31`);
  
    const ranges = [
      { label: '0-100', min: 0, max: 100 },
      { label: '101-200', min: 101, max: 200 },
      // Add other ranges...
      { label: '901-above', min: 901, max: Infinity },
    ];
  
    try {
      const result = await Promise.all(ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lte: endDate },
          price: { $gte: range.min, $lte: range.max }
        });
        return { range: range.label, count };
      }));
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bar chart data', error });
    }
  });

  

  


module.exports = router;
