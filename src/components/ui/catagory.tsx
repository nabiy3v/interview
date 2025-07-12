import { useEffect, useState } from 'react';
import { 
  FaLaptopCode, 
  FaServer, 
  FaCloud, 
  FaMobile, 
  FaDatabase, 
  FaShieldAlt,
  FaRobot,
  FaChartLine,
  FaSpinner,
  FaUserGraduate,
  FaClock,
  FaTrophy,
  FaArrowRight
} from 'react-icons/fa';
import { motion, AnimatePresence, stagger, useAnimate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  interviewsAvailable: number;
}

// Icon mapping based on category names
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  
  if (name.includes('front')) return <FaLaptopCode className="text-blue-500" />;
  if (name.includes('back')) return <FaServer className="text-green-500" />;
  if (name.includes('devops')) return <FaCloud className="text-purple-500" />;
  if (name.includes('mobile')) return <FaMobile className="text-red-500" />;
  if (name.includes('database')) return <FaDatabase className="text-yellow-500" />;
  if (name.includes('security')) return <FaShieldAlt className="text-indigo-500" />;
  if (name.includes('ai') || name.includes('ml')) return <FaRobot className="text-pink-500" />;
  if (name.includes('data')) return <FaChartLine className="text-teal-500" />;
  
  return <FaLaptopCode className="text-gray-500" />;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scope, animate] = useAnimate();
  const navigate = useNavigate()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://157.180.27.123:8002/api/v1/catalogs');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
        
        // Animate cards after data loads
        setTimeout(() => {
          animate(".category-card", 
            { opacity: 1, y: 0 }, 
            { delay: stagger(0.1), duration: 0.5 }
          );
        }, 100);
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-64"
      >
        <FaSpinner className="animate-spin h-12 w-12 text-purple-600 mb-4" />
        <p className="text-gray-600">Loading categories...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mb-4"
        >
          {error}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition shadow-md"
        >
          Reload Categories
        </motion.button>
      </motion.div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Choose Your <span className="text-purple-600">Specialty</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our interview preparation resources by category. Select your specialty to see available practice interviews.
          </p>
        </motion.div>
        
        <div 
          ref={scope}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {categories.map((category) => {
              const icon = getCategoryIcon(category.name);
              
              return (
                <motion.div
                  key={category.id}
                  className="category-card opacity-0 translate-y-10"
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md h-full flex flex-col">
                    <div className="p-6 flex-1">
                      <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                        <div className="text-2xl">
                          {icon}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.interviewsAvailable} interviews available</p>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {category.interviewsAvailable > 10 ? 'Popular' : 'New'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                      <button onClick={()=> navigate(`/catalogs/${category.id}`)} className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center">
                        Explore category
                        <FaArrowRight className="ml-1.5 text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
  
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-16 px-4 bg-white mt-16 rounded-2xl shadow-sm"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Interview-Hub?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Everything you need to ace your next technical interview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "Expert Mentors",
                desc: "Learn from industry professionals with years of experience at top tech companies.",
                icon: <FaUserGraduate className="text-purple-600 text-2xl mx-auto" />,
                color: "bg-purple-100"
              },
              {
                title: "Flexible Scheduling",
                desc: "Book sessions that fit your schedule with mentors available 24/7.",
                icon: <FaClock className="text-blue-600 text-2xl mx-auto" />,
                color: "bg-blue-100"
              },
              {
                title: "Proven Results",
                desc: "95% of our students land their dream job within 3 months of practice.",
                icon: <FaTrophy className="text-yellow-600 text-2xl mx-auto" />,
                color: "bg-yellow-100"
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mb-4 mx-auto`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center py-16 px-4 mt-16 rounded-2xl shadow-xl"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who've aced their interviews with our help
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </section>
  );
}