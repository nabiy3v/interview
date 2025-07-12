import { motion} from 'framer-motion';


export const Footer =() => {
    return(
        <div>
            <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 text-white py-10 px-6 mt-16 rounded-t-2xl"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="text-lg font-bold mb-2">Interview-Hub</h3>
              <p className="text-gray-400 mb-4">
                Empowering the next generation of tech professionals through personalized mentorship.
              </p>
              <div className="flex gap-4 text-xl text-gray-400">
                <a href="#" className="hover:text-white transition-colors">🌐</a>
                <a href="#" className="hover:text-white transition-colors">📘</a>
                <a href="#" className="hover:text-white transition-colors">🐦</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Mentors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Learning Paths</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8 text-xs pt-6 border-t border-gray-800">
            © 2024 Interview-Hub. All rights reserved.
          </div>
        </motion.footer>
        </div>
    )
}