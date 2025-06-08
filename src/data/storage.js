// Add this to your storage.js file
export const loadActivities = () => {
  const saved = localStorage.getItem('activityData');
  return saved ? JSON.parse(saved) : [];
};

export const saveActivities = (data) => {
  localStorage.setItem('activityData', JSON.stringify(data));
};