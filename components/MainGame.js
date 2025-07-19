import { useState, useEffect } from 'react';
import LifeEvents from './LifeEvents';
import StatsPanel from './StatsPanel';
import HeaderBar from './HeaderBar';
import BottomMenu from './BottomMenu';
import CharacterInfo from './CharacterInfo';
import ActivitiesModal from './ActivitiesModal';
import SchoolModal from './SchoolModal';
import AssetsModal from './AssetsModal';
import RelationshipsModal from './RelationshipsModal';
import SpecialEventModal from './SpecialEventModal';
import DeathScreen from './DeathScreen';
import InteractiveEventModal from './InteractiveEventModal';
import { getEvent } from '../lib/events';

export default function MainGame({ character, setCharacter, lifeEvents, setLifeEvents, age, setAge, onDeath }) {
  const [stats, setStats] = useState({
    happiness: 50,
    health: 100,
    smarts: 50,
    looks: 50,
    fame: 0,
  });
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [isRelationshipsModalOpen, setIsRelationshipsModalOpen] = useState(false);
  const [triggeredOneTimeEvents, setTriggeredOneTimeEvents] = useState([]);
  const [specialEvent, setSpecialEvent] = useState(null);
  const [isSpecialEventModalOpen, setIsSpecialEventModalOpen] = useState(false);
  const [interactiveEvent, setInteractiveEvent] = useState(null);
  const [isDead, setIsDead] = useState(false);
  const [education, setEducation] = useState({ level: 'None', yearsLeft: 0 });
  const [bankBalance, setBankBalance] = useState(1000);

  const handleWin = (amount, message) => {
    setBankBalance(prev => prev + amount);
    setLifeEvents(prev => [...prev, message || `You won ${amount} at the casino!`]);
  };

  const handleLose = (amount, message) => {
    setBankBalance(prev => prev - amount);
    setLifeEvents(prev => [...prev, message || `You lost ${amount} at the casino.`]);
  };

  useEffect(() => {
    if (stats.health <= 0) {
      setIsDead(true);
    }
  }, [stats.health]);

  const handleAgeUp = () => {
    if (isDead) return;

    const newAge = age + 1;
    setAge(newAge);
    const event = getEvent(newAge, triggeredOneTimeEvents);

    if (event) {
      if (!event.isInteractive) {
        setStats(prev => ({
          ...prev,
          happiness: Math.max(0, Math.min(100, prev.happiness + (event.effect.happiness || 0))),
          health: Math.max(0, Math.min(100, prev.health + (event.effect.health || 0))),
          smarts: Math.max(0, Math.min(100, prev.smarts + (event.effect.smarts || 0))),
        }));
      }

      if (event.oneTime) {
        setTriggeredOneTimeEvents(prev => [...prev, event.description]);
      }

      if (event.isInteractive) {
        setInteractiveEvent(event);
        setLifeEvents(prev => [...prev, `You aged up to ${newAge}.`]);
      } else if (event.isSpecial) {
        setSpecialEvent(event);
        setIsSpecialEventModalOpen(true);
        setLifeEvents(prev => [...prev, `You aged up to ${newAge}.`]);
      } else {
        setLifeEvents(prev => [...prev, `You aged up to ${newAge}.`, event.description]);
      }
    } else {
      setLifeEvents(prev => [...prev, `You aged up to ${newAge}.`]);
    }

    // Update education status
    if (newAge >= 3 && newAge <= 5) {
      setEducation({ level: 'Preschool', yearsLeft: 5 - newAge });
    } else if (newAge >= 6 && newAge <= 17) {
      setEducation({ level: 'High School', yearsLeft: 17 - newAge });
    } else if (newAge === 18) {
      setEducation({ level: 'Graduated', yearsLeft: 0 });
    } else {
      setEducation({ level: 'None', yearsLeft: 0 });
    }
  };

  const handleCloseSpecialEventModal = () => {
    if (specialEvent) {
      setLifeEvents(prev => [...prev, specialEvent.description]);
    }
    setIsSpecialEventModalOpen(false);
    setSpecialEvent(null);
  };

  const handleActivity = (activity) => {
    setLifeEvents(prev => [...prev, `I ${activity.toLowerCase()}.`]);
    if (activity === 'Go to the gym') {
      setStats(prev => ({ ...prev, health: Math.min(100, prev.health + 2), happiness: Math.min(100, prev.happiness + 1) }));
    } else if (activity === 'Visit the library') {
      setStats(prev => ({ ...prev, smarts: Math.min(100, prev.smarts + 2) }));
    } else if (activity === 'Go on a vacation') {
        setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 5) }));
    } else if (activity === 'Meditate') {
        setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 3), health: Math.min(100, prev.health + 1) }));
    }
    setIsActivitiesModalOpen(false);
  };

  const handleSchoolAction = (action) => {
    if (education.level === 'Graduated') {
      handleUniversityApplication(action);
      return;
    }
    setLifeEvents(prev => [...prev, `I ${action.toLowerCase()}.`]);
    if (action === 'Study harder') {
      setStats(prev => ({ ...prev, smarts: Math.min(100, prev.smarts + 3) }));
    } else if (action === 'Skip class') {
      setStats(prev => ({ ...prev, smarts: Math.max(0, prev.smarts - 2), happiness: Math.min(100, prev.happiness + 2) }));
    }
    setIsSchoolModalOpen(false);
  };

  const handleUniversityApplication = (major) => {
    setEducation({ level: major, yearsLeft: 4 });
    setLifeEvents(prev => [...prev, `I enrolled in ${major}.`]);
    setIsSchoolModalOpen(false);
  };

  const handleAssetAction = (action) => {
    setLifeEvents(prev => [...prev, `I ${action.toLowerCase()}.`]);
    // Logic for assets will be more complex, involving money
    setIsAssetsModalOpen(false);
  };

  const handleRelationshipAction = (action) => {
    setLifeEvents(prev => [...prev, `I ${action.toLowerCase()}.`]);
    if (action === 'Find a partner') {
      setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 10) }));
    } else if (action === 'Have a baby') {
      setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 20) }));
    }
    setIsRelationshipsModalOpen(false);
  };

  const handleInteractiveEvent = (option) => {
    setStats(prev => ({
      ...prev,
      happiness: Math.max(0, Math.min(100, prev.happiness + (option.effect.happiness || 0))),
      health: Math.max(0, Math.min(100, prev.health + (option.effect.health || 0))),
      smarts: Math.max(0, Math.min(100, prev.smarts + (option.effect.smarts || 0))),
    }));
    setLifeEvents(prev => [...prev, `${interactiveEvent.description} You chose to ${option.text.toLowerCase()}.`]);
    setTriggeredOneTimeEvents(prev => [...prev, interactiveEvent.description]);
    setInteractiveEvent(null);
  };

  if (isDead) {
    return <DeathScreen onRestart={onDeath} />;
  }

  return (
    <div className="flex flex-col h-full font-sans">
      <header>
        <HeaderBar onRestart={onDeath} />
        <CharacterInfo 
          name={character.name}
          job={`Age: ${age}`}
          bankBalance={`${bankBalance}`}
          countryFlag={character.country.flag}
        />
      </header>

      <main className="flex-grow overflow-y-auto">
        <div className="p-4 space-y-4">
          <LifeEvents events={lifeEvents} age={age} />
        </div>
      </main>

      <footer className="shrink-0">
        
        <StatsPanel stats={stats} />
        <BottomMenu 
          onAgeUp={handleAgeUp} 
          onActivitiesClick={() => setIsActivitiesModalOpen(true)}
          onSchoolClick={() => setIsSchoolModalOpen(true)}
          onAssetsClick={() => setIsAssetsModalOpen(true)}
          onRelationshipsClick={() => setIsRelationshipsModalOpen(true)}
          character={character}
          setCharacter={setCharacter}
          lifeEvents={lifeEvents}
          setLifeEvents={setLifeEvents}
          age={age}
          education={education}
        />
      </footer>

      {isActivitiesModalOpen && (
        <ActivitiesModal
          onClose={() => setIsActivitiesModalOpen(false)}
          onActivity={handleActivity}
          onWin={handleWin}
          onLose={handleLose}
        />
      )}
      {isSchoolModalOpen && (
        <SchoolModal
          onClose={() => setIsSchoolModalOpen(false)}
          onSchoolAction={handleSchoolAction}
          education={education}
        />
      )}
      {isAssetsModalOpen && (
        <AssetsModal
          onClose={() => setIsAssetsModalOpen(false)}
          onAssetAction={handleAssetAction}
        />
      )}
      {isRelationshipsModalOpen && (
        <RelationshipsModal
          onClose={() => setIsRelationshipsModalOpen(false)}
          onRelationshipAction={handleRelationshipAction}
        />
      )}
      {isSpecialEventModalOpen && (
        <SpecialEventModal
          event={specialEvent}
          onClose={handleCloseSpecialEventModal}
        />
      )}
      {interactiveEvent && (
        <InteractiveEventModal
          event={interactiveEvent}
          onSelect={handleInteractiveEvent}
          onClose={() => setInteractiveEvent(null)}
        />
      )}
    </div>
  );
}
