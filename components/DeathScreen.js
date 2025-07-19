export default function DeathScreen({ onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">You Died</h1>
      <button 
        onClick={onRestart}
        className="px-8 py-4 text-2xl font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
      >
        Start a New Life
      </button>
    </div>
  );
}
