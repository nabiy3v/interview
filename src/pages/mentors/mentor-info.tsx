import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface MentorInfoData {
  id: string;
  title: string;
  description: string;
  tools: string;
}

export const MentorInfo: React.FC = () => {
  const { mentorId } = useParams();
  const [info, setInfo] = useState<MentorInfoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`http://157.180.27.123:8002/api/v1/mentors/${mentorId}/infos`);
        const data = await response.json();
        setInfo(data);
      } catch (err) {
        console.error('Error fetching mentor info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [mentorId]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading mentor info...</div>;
  }

  if (!info) {
    return <div className="p-6 text-center text-red-600">Mentor information not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">{info.title}</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Description</h2>
        <p className="text-gray-600 mt-1">{info.description}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Tools</h2>
        <p className="text-gray-600 mt-1">{info.tools}</p>
      </div>
    </div>
  );
};
