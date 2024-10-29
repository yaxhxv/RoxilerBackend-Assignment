import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState('2024-01');
  const [barData, setBarData] = useState([]);

  const fetchBarData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/barchart`, {
        params: { month },
      });
      setBarData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data', error);
    }
  };

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const data = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: 'Transactions Count',
        data: barData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transactions per Price Range',
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <label>Select Month:</label>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
