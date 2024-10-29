import React from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <h1>Product Transaction Dashboard</h1>
      <Dashboard/>
      <Statistics />
      <BarChart />
      <TransactionsTable />
    </div>
  );
}

export default App;
