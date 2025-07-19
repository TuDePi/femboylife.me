
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Menu({ isOpen, onClose, onRestart }) {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    const handleEndLife = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmEndLife = () => {
        onRestart();
        setConfirmationOpen(false);
    };

    return (
        <>
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <button onClick={onClose} className="text-white">X</button>
                <ul>
                    <li className="py-2"><a href="#home">Home</a></li>
                    <li className="py-2"><a href="#about">About</a></li>
                    <li className="py-2"><a href="#contact">Contact</a></li>
                    <li className="py-2"><button onClick={handleEndLife} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">End Life</button></li>
                </ul>
            </div>
            <ConfirmationModal 
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={handleConfirmEndLife}
                title="End Life?"
                message="Are you sure you want to end your current life? All progress will be lost."
            />
        </>
    );
}
