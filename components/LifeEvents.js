
import { useEffect, useRef } from 'react';

export default function LifeEvents({ events, age }) {
  const eventsEndRef = useRef(null);

  const scrollToBottom = () => {
    eventsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [events]);

  return (
    <div className="px-4">
      <div className="font-bold text-lg text-text-dark">Age: {age} years</div>
      <ul className="mt-2 text-gray-800">
        {events.map((event, i) => (
          <li key={i} className="mb-2">{event}</li>
        ))}
        <div ref={eventsEndRef} />
      </ul>
    </div>
  );
}
