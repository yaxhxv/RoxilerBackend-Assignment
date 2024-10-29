import React, { useState } from 'react';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default month

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <select onChange={handleMonthChange} value={selectedMonth}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
      
      <BarChartComponent selectedMonth={selectedMonth} />
      <PieChartComponent selectedMonth={selectedMonth} />
    </div>
  );
};

export default Dashboard;
