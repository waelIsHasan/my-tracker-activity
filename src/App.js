import React from 'react';
import { ActivityProvider } from './context/ActivityContext';
import ActivityForm from './components/ActivityForm'; // Default import
import ProgressCharts from './components/ProgressCharts'; // Default import

function App() {
  return (
    <ActivityProvider>
      <div className="app">
        <h1>Learning Progress Tracker</h1>
        <ActivityForm />
        <ProgressCharts />
      </div>
    </ActivityProvider>
  );
}
export default App; // Ensure default export
