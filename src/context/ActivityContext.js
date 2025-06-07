import React, { createContext, useState, useEffect } from 'react';
import { loadActivities, saveActivities } from '../data/storage';
const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
     const savedActivities = loadActivities();
    if (savedActivities.length > 0) {
      setActivities(savedActivities);
    }
  }, []);

  useEffect(() => {
    saveActivities(activities);
  }, [activities]);

  const addActivity = (newActivity) => {
    setActivities([...activities, { ...newActivity, id: Date.now() }]);
  };

  const getWeeklyData = () => {
    // Group activities by week
    const weeklyData = {};
    activities.forEach(activity => {
      const weekNumber = getWeekNumber(new Date(activity.date));    
      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = {
          college: 0, sleep: 0, deepfake: 0,
          ai_kaggle: 0, react: 0, english: 0
        };
      }
      weeklyData[weekNumber][activity.category] += activity.hours;
    });
    return weeklyData;
  };

 
  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
  };
  return(
    <ActivityContext.Provider value={{ activities, addActivity, getWeeklyData }}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;