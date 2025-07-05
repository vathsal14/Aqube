
import { motion } from 'framer-motion';
import { Gamepad2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Rewards', 'Security', 'Mobile App']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
    },
    {
      title: 'Gaming',
      links: ['Esports', 'Gaming News', 'Community', 'Tournaments']
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-orange-900/20 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-6"
            >
              <Gamepad2 className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Aqube XP
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-6 leading-relaxed"
            >
              India's first credit card designed for gamers. Level up your financial game with rewards that matter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>support@aqubexp.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Mumbai, India</span>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-orange-500/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Aqube XP. All rights reserved. | Made with ❤️ for gamers
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                YouTube
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
