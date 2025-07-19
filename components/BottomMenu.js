import { useEffect } from 'react';

const MenuItem = ({ label, icon, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center text-white text-xs space-y-1 focus:outline-none p-1 sm:p-2 border-2 bg-trans-pink border-trans-pink rounded-lg">
      <div className="text-2xl sm:text-3xl">{icon}</div>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

export default function BottomMenu({ onAgeUp, onSchoolClick, onAssetsClick, onRelationshipsClick, onActivitiesClick, character, lifeEvents, age, education }) {

  const handleAgeUp = () => {
    onAgeUp();
    saveProgress();
  };

  const saveProgress = () => {
    const gameState = {
      character,
      lifeEvents,
      age,
    };
    localStorage.setItem('femboylife_save', JSON.stringify(gameState));
  };

  return (
    <div className="relative h-20 sm:h-24 bg-trans-blue">
        <div className="flex justify-around items-center h-full">
            <MenuItem icon="🎓" label={education.level !== 'None' ? `${education.level} (${education.yearsLeft} yrs)` : 'School'} onClick={onSchoolClick} />
            <MenuItem icon="💰"label="Assets" onClick={onAssetsClick} />
            <div className="w-20 sm:w-24"></div> {/* Placeholder for the big button */}
            <MenuItem icon="❤️" label="Relationships" onClick={onRelationshipsClick} />
            <MenuItem icon="🤸" label="Activities" onClick={onActivitiesClick} />
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
            <button onClick={handleAgeUp} className="bg-trans-pink hover:bg-trans-pink text-white font-bold rounded-full h-24 w-24 sm:h-28 sm:w-28 flex flex-col items-center justify-center text-3xl sm:text-4xl shadow-lg border-4 border-white">
                <span className="-mb-1 sm:-mb-2">+</span>
                <span className="text-lg sm:text-xl">Age</span>
            </button>
        </div>
    </div>
  );
}
