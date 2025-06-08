import { useContext, useState } from 'react';
import ActivityContext from '../context/ActivityContext';
import './ActivityByDay.css';

export default function ActivityByDay() {
  const { activities } = useContext(ActivityContext);
  const [showActivities, setShowActivities] = useState(false);

  // Group activities by date
  const activitiesByDate = activities.reduce((acc, activity) => {
    const { date } = activity;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {});

  return (
    <div className="activity-container">
      <button
        className={`toggle-btn ${showActivities ? 'active' : ''}`}
        onClick={() => setShowActivities(!showActivities)}
      >
        {showActivities ? 'Hide Activities' : 'Show Activities'}
      </button>
      <div className={`activity-by-day-wrapper ${showActivities ? 'show' : ''}`}>
        <div className="activity-by-day">
          {Object.keys(activitiesByDate).map(date => (
            <div key={date} className="activity-day">
              <h2 className="activity-date">{date}</h2>
              <div className="activity-cards">
                {activitiesByDate[date].map(activity => (
                  <div key={activity.id} className="activity-card">
                    <h3 className="activity-category">{activity.category}</h3>
                    <p className="activity-hours">{activity.hours} hour(s)</p>
                    {activity.notes && (
                      <p className="activity-notes">{activity.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
