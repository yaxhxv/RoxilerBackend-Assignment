import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [month, setMonth] = useState('2024-01');
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/statistics`, {
        params: { month },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <label>Select Month:</label>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      {statistics && (
        <div>
          <p>Total Sale: ${statistics.totalSale}</p>
          <p>Sold Items: {statistics.totalSoldItems}</p>
          <p>Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
