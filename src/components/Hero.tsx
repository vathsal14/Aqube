import { motion } from 'framer-motion';
import { Zap, Trophy, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeroProps {
  onGetStarted?: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black pt-24 pb-16 md:pt-28 md:pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left px-4 sm:px-6 lg:px-8"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome to
                </span>
                <br />
                <span className="text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Aqube XP
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-gray-300 mb-6 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                India's first gaming credit card platform. Earn rewards, manage your finances, and unlock exclusive gaming benefits with every transaction.
                <span className="block mt-2 text-cyan-400 font-semibold">Level up your gaming experience!</span>
              </motion.p>

              {/* Call to Action - Only show if user is not logged in */}
              {!user && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-8"
                >
                  <motion.button
                    onClick={onGetStarted}
                    className="relative bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-10 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 shadow-2xl"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.8)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🚀 Start Your Gaming Journey
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 blur-xl"
                      whileHover={{ opacity: 0.7 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    Be among the first to get India's first gaming credit card and unlock exclusive launch benefits.
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-center px-4 sm:px-6 lg:px-8"
            >
              <motion.div
                className="relative w-72 h-44 sm:w-80 sm:h-52"
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ perspective: "1000px" }}
              >
                {/* Card Container */}
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-purple-900/60 via-blue-900/60 to-black/60 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-cyan-500/30"
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
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
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-70"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
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
                  <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div>
                        <motion.h3
                          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          XP GAMING
                        </motion.h3>
                        <p className="text-xs text-cyan-300 mt-1">Premium Gaming Card</p>
                      </div>
                    </div>

                    {/* Middle Section - Card Number */}
                    <div className="space-y-3">
                      <motion.div
                        className="text-lg font-mono tracking-wider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <span className="blur-sm">••••</span> <span className="blur-sm">••••</span> <span className="blur-sm">••••</span> <span>2024</span>
                      </motion.div>
                      
                      {/* Gaming pattern */}
                      <div className="flex space-x-1">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded"
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
                        <p className="font-semibold text-sm">GAMING CHAMPION</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-8 h-8 text-white opacity-80" />
                        <div className="text-right">
                          <p className="text-xs text-gray-300">VALID THRU</p>
                          <p className="font-semibold text-sm">12/28</p>
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

                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20"
          >
            {[
              
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Zap className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
                
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 blur-xl -z-10`}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
