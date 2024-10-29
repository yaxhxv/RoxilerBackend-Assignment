import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const PieChartComponent = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pie-chart?month=${selectedMonth}`);
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    if (selectedMonth) {
      fetchPieChartData();
    }
  }, [selectedMonth]);

  return (
    <PieChart width={400} height={400}>
      <Pie dataKey="value" data={pieChartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
