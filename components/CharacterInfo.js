
export default function CharacterInfo({ name, job, bankBalance, countryFlag, gender }) {
  return (
    <div className="bg-trans-pink p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/femboy.jpg" alt="Character" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-2 sm:mr-4 object-cover" />
          <div>
            <div className="font-bold text-base sm:text-lg text-text-dark">{countryFlag} {name} {gender === 'Male' ? '♂' : '♀'}</div>
            <div className="text-xs sm:text-sm text-text-dark">⭐ {job}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl sm:text-2xl text-text-dark">{bankBalance}</div>
          <div className="text-xs sm:text-sm text-gray-600">Bank Balance</div>
        </div>
      </div>
    </div>
  );
}
