
import { useState } from 'react';
import { countries } from '../lib/countries';
import { firstNames, lastNames } from '../lib/names';

export default function StartScreen({ onStart }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [gender, setGender] = useState(null);

  const generateRandomName = () => {
    let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    firstName = firstName.substring(0, 10);
    const remainingLength = 20 - firstName.length - 1;
    lastName = lastName.substring(0, Math.min(10, remainingLength));

    setName(`${firstName} ${lastName}`);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/flag.jpg.png')" }}
    >
        <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-0">
                <a href="https://tudebot.tech" target="_blank" rel="noreferrer" className="text-white text-2xl lg:text-4xl font-bold p-2 lg:p-4 rounded pointer-events-auto animate-rainbow-bg">Try Tudebot Today!</a>
            </div>
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-4">
                <a href="https://tudebot.tech" target="_blank" rel="noreferrer" className="text-white text-4xl font-bold p-4 rounded pointer-events-auto animate-rainbow-bg">Try Tudebot Today!</a>
            </div>
        </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg" />
      <div className="relative z-10 flex flex-col items-center text-white">
        <h1 className="text-5xl font-bold mb-8">FemboyLife</h1>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
          <div className="flex">
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className="px-4 py-2 text-black rounded-l-lg focus:outline-none"
            />
            <button 
              onClick={generateRandomName}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-r-lg"
            >
              🎲
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Gender</label>
          <div className="flex space-x-4">
            <button 
              onClick={() => setGender('Male')}
              className={`px-8 py-4 text-2xl font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${gender === 'Male' ? 'bg-blue-500 text-white ring-blue-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              ♂ Male
            </button>
            <button 
              onClick={() => setGender('Female')}
              className={`px-8 py-4 text-2xl font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${gender === 'Female' ? 'bg-pink-500 text-white ring-pink-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              ♀ Female
            </button>
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="country" className="block text-lg font-semibold mb-2">Country</label>
          <select 
            id="country"
            value={country.name}
            onChange={(e) => setCountry(countries.find(c => c.name === e.target.value))}
            className="px-4 py-2 text-black rounded-lg focus:outline-none"
          >
            {countries.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
          </select>
        </div>

        <button 
          onClick={() => onStart(name, country, gender)}
          disabled={!name || !gender}
          className="px-8 py-4 text-2xl font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 disabled:bg-gray-400"
        >
          Start a new life
        </button>
      </div>
    </div>
  );
}
