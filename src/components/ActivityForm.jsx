import React, { useState, useContext } from 'react';
import ActivityContext from '../context/ActivityContext';
import styles from './ActivityForm.module.css'; // Import styles
export default function ActivityForm() {
  const { addActivity } = useContext(ActivityContext);
  const [activity, setActivity] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'college',
    hours: 1,
    notes: ''
  });

  const categories = [
    'college', 'sleep', 'deepfake', 
    'ai_kaggle', 'react', 'english'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.hours > 0) {
      addActivity({ 
        ...activity, 
        hours: parseFloat(activity.hours),
        id: Date.now()
      });
      setActivity({
        date: new Date().toISOString().split('T')[0],
        category: 'college',
        hours: 1,
        notes: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.group}>
        <label className={styles.label}>Date:</label>
        <input 
          type="date"
          className={styles.input}
          value={activity.date}
          onChange={e => setActivity({...activity, date: e.target.value})}
          required
          aria-label="Select date"
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Category:</label>
        <select 
          className={styles.select}
          value={activity.category}
          onChange={e => setActivity({...activity, category: e.target.value})}
          aria-label="Select activity category"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Hours:</label>
        <input
          type="number"
          className={styles.input}
          step="0.5"
          min="0.5"
          max="12"
          value={activity.hours}
          onChange={e => setActivity({...activity, hours: e.target.value})}
          required
          aria-label="Enter hours spent"
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Notes:</label>
        <input
          type="text"
          className={styles.input}
          value={activity.notes}
          onChange={e => setActivity({...activity, notes: e.target.value})}
          placeholder="What did you work on?"
          aria-label="Enter activity notes"
        />
      </div>

      <button 
        type="submit" 
        className={styles.button}
        aria-label="Add activity"
      >
        Add Activity
      </button>
    </form>
  );
}