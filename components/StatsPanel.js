
const StatBar = ({ label, emoji, value, barColor }) => {
  const colorClass = barColor === 'pink' ? 'bg-trans-pink' : 'bg-trans-blue';
  return (
    <div className="flex items-center my-1">
      <div className="w-20 sm:w-28 flex items-center justify-end mr-2">
        <span className="font-bold text-xs sm:text-sm text-text-dark">{label}</span>
        <span className="text-xl sm:text-2xl ml-1 sm:ml-2">{emoji}</span>
      </div>
      <div className="flex-grow bg-gray-300 h-5 sm:h-6 border-2 border-gray-500 relative">
        <div className={`${colorClass} h-full`} style={{ width: `${value}%` }}></div>
        <div className="absolute inset-0 flex items-center justify-end pr-2 text-white font-bold text-xs sm:text-sm">{value}%</div>
      </div>
    </div>
  );
};

export default function StatsPanel({ stats }) {
  return (
    <div>
      <div className="bg-trans-pink p-2 flex justify-between items-center">
        <button className="bg-white text-text-dark font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm">I ❤️ FEMBOYS</button>
        <button className="bg-white text-text-dark font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-full text-xs sm:text-sm">Touch grass!</button>
      </div>
      <div className="p-2 sm:p-4 bg-white">
          <StatBar label="Happiness" emoji="😆" value={stats.happiness} />
          <StatBar label="Health" emoji="❤️" value={stats.health} />
          <StatBar label="Smarts" emoji="💡" value={stats.smarts} />
          <StatBar label="Looks" emoji="☀️" value={stats.looks} />
          <StatBar label="Fame" emoji="⭐" value={stats.fame} barColor="pink" />
      </div>
    </div>
  );
}
