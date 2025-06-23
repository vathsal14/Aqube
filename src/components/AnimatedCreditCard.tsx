
import { motion } from 'framer-motion';
import { CreditCardIcon, StarIcon } from '@heroicons/react/24/solid';

const AnimatedCreditCard = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        className="relative w-96 h-64"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: [0, 15, -15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ perspective: "1000px" }}
      >
        {/* Card Container */}
        <motion.div
          className="relative w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black rounded-2xl shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, #7c3aed 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, #ec4899 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, #7c3aed 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Gaming elements overlay */}
          <div className="absolute inset-0">
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <motion.h3
                  className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  GAMING ELITE
                </motion.h3>
                <p className="text-sm text-cyan-300 mt-1">Premium Gaming Card</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <StarIcon className="w-8 h-8 text-yellow-400" />
              </motion.div>
            </div>

            {/* Middle Section - Card Number */}
            <div className="space-y-4">
              <motion.div
                className="text-xl font-mono tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="blur-sm">••••</span> <span className="blur-sm">••••</span> <span className="blur-sm">••••</span> <span>2024</span>
              </motion.div>
              
              {/* Gaming pattern */}
              <div className="flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded"
                    animate={{ scaleX: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-300 uppercase tracking-wide">Cardholder</p>
                <p className="font-semibold">GAMING CHAMPION</p>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="w-10 h-10 text-white opacity-80" />
                <div className="text-right">
                  <p className="text-xs text-gray-300">VALID THRU</p>
                  <p className="font-semibold">12/28</p>
                </div>
              </div>
            </div>
          </div>

          {/* Holographic effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transform: "skewX(-20deg)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedCreditCard;
