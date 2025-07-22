import { useState, useEffect } from 'react';
import LifeEvents from './LifeEvents';
import StatsPanel from './StatsPanel';
import HeaderBar from './HeaderBar';
import BottomMenu from './BottomMenu';
import CharacterInfo from './CharacterInfo';
import ActivitiesModal from './ActivitiesModal';
import OccupationModal from './OccupationModal';
import AssetsModal from './AssetsModal';
import RelationshipsModal from './RelationshipsModal';
import SpecialEventModal from './SpecialEventModal';
import DeathScreen from './DeathScreen';
import InteractiveEventModal from './InteractiveEventModal';
import { getEvent } from '../lib/events';
import { jobs } from '../lib/jobs';
import { expenses } from '../lib/expenses';

export default function MainGame({ character, setCharacter, lifeEvents, setLifeEvents, age, setAge, onDeath }) {
  const [stats, setStats] = useState({
    happiness: 50,
    health: 100,
    smarts: 50,
    looks: 50,
    fame: 0,
  });
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);
  const [isOccupationModalOpen, setIsOccupationModalOpen] = useState(false);
  const [isAssetsModalOpen, setIsAssetsModalOpen] = useState(false);
  const [isRelationshipsModalOpen, setIsRelationshipsModalOpen] = useState(false);
  const [triggeredOneTimeEvents, setTriggeredOneTimeEvents] = useState([]);
  const [specialEvent, setSpecialEvent] = useState(null);
  const [isSpecialEventModalOpen, setIsSpecialEventModalOpen] = useState(false);
  const [interactiveEvent, setInteractiveEvent] = useState(null);
  const [isDead, setIsDead] = useState(false);
  const [education, setEducation] = useState({ level: 'None', yearsLeft: 0 });
  const [currentMajor, setCurrentMajor] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [bankBalance, setBankBalance] = useState(1000);
  const [job, setJob] = useState(null);
  const [yearsAtJob, setYearsAtJob] = useState(0);
  const [currentTuitionCost, setCurrentTuitionCost] = useState(0);

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
    } else if (newAge >= 6 && newAge <= 13) {
      setEducation({ level: 'Elementary School', yearsLeft: 13 - newAge });
    } else if (newAge >= 14 && newAge <= 17) {
      setEducation({ level: 'High School', yearsLeft: 17 - newAge });
    } else if (newAge === 18) {
      setEducation({ level: 'Graduated', yearsLeft: 0 });
    } else if (education.level !== 'None' && education.yearsLeft > 0) {
      setEducation(prev => ({ ...prev, yearsLeft: prev.yearsLeft - 1 }));
      if (education.level === 'University') {
        const tuitionCost = expenses.universityTuition.cost;
        if (bankBalance < tuitionCost) {
          setLifeEvents(prev => [...prev, `I couldn't afford university tuition this year. I need ${tuitionCost}.`]);
          setEducation({ level: 'None', yearsLeft: 0 }); // Drop out if cannot afford
        } else {
          setBankBalance(prev => prev - tuitionCost);
          setLifeEvents(prev => [...prev, `I paid ${tuitionCost} for university tuition.`]);
        }
      }
      if (education.yearsLeft === 1) {
        setDegrees(prev => [...prev, currentMajor]);
        setEducation({ level: 'Graduated', yearsLeft: 0 });
        setSpecialEvent({ description: `You graduated from ${currentMajor} school!` });
        setIsSpecialEventModalOpen(true);
      }
    }

    if (job) {
      setYearsAtJob(prev => prev + 1);
      if (yearsAtJob > 0 && yearsAtJob % 5 === 0) {
        const currentPromotion = Math.floor(yearsAtJob / 5);
        if (job.salaryGrowth && currentPromotion < job.salaryGrowth.length) {
          const newSalary = job.salaryGrowth[currentPromotion];
          setJob(prev => ({ ...prev, salary: newSalary }));
          setLifeEvents(prev => [...prev, `I got a raise! My new salary is ${newSalary}.`]);
        }
      }
      setBankBalance(prev => prev + job.salary);
      setLifeEvents(prev => [...prev, `I earned ${job.salary} from my job as a ${job.title}.`]);
    }

    handleExpensesAndTaxes();
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
    setIsOccupationModalOpen(false);
  };

  const universityTuitionCosts = {
    'Law': 45000,
    'Medical': 50000,
    'Business': 35000,
    'Computer Science': 40000,
    'None': 10000, // Default for general university if no specific major
  };

  const handleUniversityApplication = (major) => {
    const applicationFee = 500; // Example application fee
    if (bankBalance < applicationFee) {
      setLifeEvents(prev => [...prev, `I don't have enough money to apply to university. I need ${applicationFee}.`]);
      return;
    }

    setBankBalance(prev => prev - applicationFee);
    setLifeEvents(prev => [...prev, `I paid ${applicationFee} for university application.`]);

    let years = 4;
    let actualMajor = major;
    if (major === 'Law School') actualMajor = 'Law';
    if (major === 'Medical School') actualMajor = 'Medical';
    if (major === 'Business School') actualMajor = 'Business';
    if (major === 'Computer Science') actualMajor = 'Computer Science';
    
    const tuition = universityTuitionCosts[actualMajor] || universityTuitionCosts['None'];
    setCurrentTuitionCost(tuition);

    setEducation({ level: 'University', yearsLeft: years });
    setCurrentMajor(actualMajor);
    setLifeEvents(prev => [...prev, `I enrolled in ${actualMajor}.`]);
    setIsOccupationModalOpen(false);
  };

  const handleJobAction = (jobTitle) => {
    if (jobTitle === 'Quit job') {
      setLifeEvents(prev => [...prev, `I quit my job as a ${job.title}.`]);
      setJob(null);
      setYearsAtJob(0);
      setIsOccupationModalOpen(false);
      return;
    }
    const newJob = jobs.find(job => job.title === jobTitle);
    if (newJob.salaryGrowth && newJob.salaryGrowth.length > 0) {
      newJob.salary = newJob.salaryGrowth[0];
    }
    if (newJob.requiredDegree && !degrees.includes(newJob.requiredDegree)) {
      setLifeEvents(prev => [...prev, `You need a ${newJob.requiredDegree} degree to get this job.`]);
      return;
    }
    if (newJob.requiredEducation !== 'None' && !(education.level === newJob.requiredEducation || (newJob.requiredEducation === 'University' && (education.level === 'Graduated' || degrees.length > 0)))) {
        setLifeEvents(prev => [...prev, `You need a ${newJob.requiredEducation} to get this job.`]);
        return;
    }
    if (newJob.requiredSmarts > stats.smarts) {
        setLifeEvents(prev => [...prev, `You need ${newJob.requiredSmarts} smarts to get this job.`]);
        return;
    }
    if (newJob.requiredAge && age < newJob.requiredAge) {
        setLifeEvents(prev => [...prev, `You need to be at least ${newJob.requiredAge} years old to get this job.`]);
        return;
    }
    if (newJob.maxAge && age > newJob.maxAge) {
        setLifeEvents(prev => [...prev, `You need to be at most ${newJob.maxAge} years old to get this job.`]);
        return;
    }

    setJob(newJob);
    setYearsAtJob(0);
    setLifeEvents(prev => [...prev, `I got a job as a ${newJob.title}.`]);
    setIsOccupationModalOpen(false);
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

  const handleExpensesAndTaxes = () => {
    if (age < 18) return;

    let totalExpenses = 0;
    let expensesDescription = 'I paid for ';

    for (const expense in expenses) {
      totalExpenses += expenses[expense].cost;
      expensesDescription += `${expenses[expense].name}, `;
    }

    let taxes = 0;
    if (job) {
      taxes = Math.floor(job.salary * 0.2);
      totalExpenses += taxes;
      expensesDescription += `and taxes.`;
    } else {
      expensesDescription = expensesDescription.slice(0, -2) + '.';
    }

    setBankBalance(prev => prev - totalExpenses);
    setLifeEvents(prev => [...prev, expensesDescription, `Total expenses: ${totalExpenses}.`]);
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
          job={job ? job.title : `Age: ${age}`}
          bankBalance={`${bankBalance}`}
          countryFlag={character.country.flag}
          gender={character.gender}
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
          onOccupationClick={() => setIsOccupationModalOpen(true)}
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
      {isOccupationModalOpen && (
        <OccupationModal
          onClose={() => setIsOccupationModalOpen(false)}
          onSchoolAction={handleSchoolAction}
          onJobAction={handleJobAction}
          education={education}
          stats={stats}
          job={job}
          degrees={degrees}
          age={age}
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
