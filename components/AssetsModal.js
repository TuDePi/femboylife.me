
export default function AssetsModal({ onClose, onAssetAction }) {
  const actions = [
    { name: "Buy a car", icon: "🚗" },
    { name: "Buy a house", icon: "🏠" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Assets</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        <ul>
          {actions.map((action) => (
            <li key={action.name} className="mb-2">
              <button
                onClick={() => onAssetAction(action.name)}
                className="w-full flex items-center p-2 bg-trans-blue text-white rounded-lg hover:bg-trans-pink"
              >
                <span className="text-2xl mr-4">{action.icon}</span>
                <span>{action.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
