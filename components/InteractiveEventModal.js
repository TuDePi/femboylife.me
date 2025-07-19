export default function InteractiveEventModal({ event, onSelect, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{event.description}</h2>
        <div className="space-y-4">
          {event.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(option)}
              className="w-full px-4 py-2 bg-trans-pink text-white rounded-lg hover:bg-trans-pink"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
