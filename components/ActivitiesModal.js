
import { useState } from 'react';
import CasinoModal from './CasinoModal';

export default function ActivitiesModal({ onClose, onActivity, onWin, onLose }) {
  const [showCasino, setShowCasino] = useState(false);

  const activities = [
    { name: "Go to the gym", icon: "🏋️" },
    { name: "Visit the library", icon: "📚" },
    { name: "Go on a vacation", icon: "✈️" },
    { name: "Meditate", icon: "🧘" },
    { name: "Visit the Casino", icon: "🎰" },
  ];

  const handleActivityClick = (activityName) => {
    if (activityName === "Visit the Casino") {
      setShowCasino(true);
    } else {
      onActivity(activityName);
    }
  };

  if (showCasino) {
    return <CasinoModal onClose={() => setShowCasino(false)} onWin={onWin} onLose={onLose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Activities</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <ul>
          {activities.map((activity) => (
            <li key={activity.name} className="mb-2">
              <button
                onClick={() => handleActivityClick(activity.name)}
                className="w-full flex items-center p-2 bg-trans-blue text-white rounded-lg hover:bg-trans-pink"
              >
                <span className="text-2xl mr-4">{activity.icon}</span>
                <span>{activity.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
