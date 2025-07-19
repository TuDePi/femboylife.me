import { useState, useEffect } from 'react';
import StartScreen from '../components/StartScreen';
import MainGame from '../components/MainGame';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [character, setCharacter] = useState({ name: '', country: null, gender: null });
  const [lifeEvents, setLifeEvents] = useState([]);
  const [age, setAge] = useState(0);

  useEffect(() => {
    const savedState = localStorage.getItem('femboylife_save');
    if (savedState) {
      const { character, lifeEvents, age } = JSON.parse(savedState);
      setCharacter(character);
      setLifeEvents(lifeEvents);
      setAge(age);
      setGameStarted(true);
    }
  }, []);

  const handleStartGame = (name, country, gender) => {
    setCharacter({ name, country, gender });
    setLifeEvents([`You were born a ${gender.toLowerCase()} in ${country.name}.`]);
    setAge(0);
    setGameStarted(true);
  };

  const handleRestart = () => {
    localStorage.removeItem('femboylife_save');
    setGameStarted(false);
    setGameKey(prev => prev + 1);
  };

  return (
    <div className="h-screen">
      {gameStarted ? (
        <MainGame 
          key={gameKey} 
          character={character} 
          setCharacter={setCharacter}
          lifeEvents={lifeEvents}
          setLifeEvents={setLifeEvents}
          age={age}
          setAge={setAge}
          onDeath={handleRestart} 
        />
      ) : (
        <StartScreen onStart={handleStartGame} />
      )}
    </div>
  );
}
