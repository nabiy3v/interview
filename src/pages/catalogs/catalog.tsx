import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import store from 'store2';

export interface CatalogProps {}

interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phoneNumber: string;
  imageUrl: string;
  status: string;
}

interface MentorResponse {
  mentor: Mentor;
  price: number;
}


export const Catalog: React.FC<CatalogProps> = () => {
  const [mentors, setMentors] = useState<MentorResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    
      const fetchMentors = async () => {
        try {
          const response = await fetch('http://157.180.27.123:8002/api/v1/catalogs/082cc4ac-df8b-42f0-a505-eb3691c2e2ba');
          console.log(response)
          const data = await response.json();
          setMentors(data);
        } catch (error) {
          console.error('Error fetching mentors:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchMentors();
    

  }, []);

  const onAddRequest = (id: string) => {
    const mentorId = id;
    const token = store.get('access-token');
    if (!token) {
        navigate('/auth')
        return
    }

    navigate(`/mentors/${mentorId}/slots`);
  }


  const handleInfoBtn = (id: string) => {
    navigate(`/mentors/${id}/infos`)
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-1">Mentors for Frontend Development</h2>
      <p className="text-gray-600 mb-6">Connect with expert mentors for your interview preparation</p>

      {loading ? (
        <p>Loading mentors...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((entry, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-xl shadow-sm p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={entry.mentor.imageUrl || 'https://via.placeholder.com/48'}
                  alt={entry.mentor.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{entry.mentor.firstName} {entry.mentor.lastName}</h3>
                  <p className="text-sm text-gray-600 leading-tight">{entry.mentor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">Price: ${entry.price}</span>
              </div>
              <div className='flex gap-4'>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm" onClick={() => onAddRequest(entry.mentor.id)}>
                Add Request
              </button>
              <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm" onClick={() => handleInfoBtn(entry.mentor.id)}>
                Info
              </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded">
          Load More Mentors
        </button>
      </div>
    </div>
  );
};
