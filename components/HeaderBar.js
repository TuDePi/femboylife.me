import { useState } from 'react';
import Menu from './Menu';

export default function HeaderBar({ onRestart }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="bg-trans-blue text-white p-2">
        <div className="flex justify-between items-center">
          <button onClick={toggleMenu} className="text-xl sm:text-2xl w-1/4 text-left pl-2">☰</button>
          <div className="text-xl sm:text-2xl font-bold w-1/2 text-center">FEMBOYLIFE</div>
          <div className="w-1/4 flex justify-end pr-2">
              <a href="https://tudebot.tech" target="_blank" rel="noopener noreferrer">
                <button className="bg-trans-pink text-white font-bold py-1 px-2 sm:px-3 rounded-full text-xs sm:text-sm">
                  Tudebot
                </button>
              </a>
          </div>
        </div>
      </div>
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} onRestart={onRestart} />
    </>
  );
}