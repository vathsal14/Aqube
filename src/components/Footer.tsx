
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              AQube
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              The ultimate gaming credit card platform. Level up your gaming experience with every transaction.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'About', 'Rewards', 'Refer & Earn', 'FAQ'].map((item) => (
                <li key={item}>
                  <motion.button 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      const element = document.querySelector(`#${item.toLowerCase().replace(/ & /g, '').replace(/ /g, '')}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Support</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@aqube.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-GAME</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>Live Chat Available 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AQube. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              Discord
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              Twitter
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              Instagram
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
