import React, { useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ActivityContext from '../context/ActivityContext';


export default function ProgressCharts() {  // Change to named function + default export
  const { getWeeklyData } = useContext(ActivityContext);
  const weeklyData = getWeeklyData();
  const weeks = Object.keys(weeklyData).sort();
  
  // Prepare data for charts
  const chartData = weeks.map(week => ({
    week,
    ...weeklyData[week]
  }));

  // Current vs Previous week comparison
  const comparisonData = [];
  if (weeks.length > 1) {
    const currentWeek = weeks[weeks.length - 1];
    const prevWeek = weeks[weeks.length - 2];
    
    Object.keys(weeklyData[currentWeek]).forEach(category => {
      comparisonData.push({
        category,
        current: weeklyData[currentWeek][category],
        previous: weeklyData[prevWeek][category],
        change: weeklyData[currentWeek][category] - weeklyData[prevWeek][category]
      });
    });
  }

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="college" fill="#8884d8" />
            <Bar dataKey="sleep" fill="#82ca9d" />
            <Bar dataKey="deepfake" fill="#ffc658" />
            <Bar dataKey="ai_kaggle" fill="#ff7300" />
            <Bar dataKey="react" fill="#0088fe" />
            <Bar dataKey="english" fill="#00c49f" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {comparisonData.length > 0 && (
        <div className="chart">
          <h3>Current vs Previous Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#4caf50" name="Current Week" />
              <Bar dataKey="previous" fill="#9e9e9e" name="Previous Week" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};