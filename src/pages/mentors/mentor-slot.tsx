import React, { useEffect, useState } from 'react';

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export const MentorSlot: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(
          `http://157.180.27.123:8002/api/v1/mentors/b64134e0-5b24-445e-8238-0c830deb9a46/slots?status=CREATED`);
        const data = await response.json();
        console.log(data)
        setSlots(data);
      } catch (err) {
        console.error('Error fetching slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Slots for Mentor</h1>

      {loading ? (
        <p>Loading slots...</p>
      ) : slots.length === 0 ? (
        <p>No slots available.</p>
      ) : (
        <ul className="space-y-3">
          {slots.map((slot) => (
            <li
              key={slot.id}
              className="border rounded p-3 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{slot.date}</p>
                <p className="text-sm text-gray-600">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  slot.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {slot.isAvailable ? 'Available' : 'Booked'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
