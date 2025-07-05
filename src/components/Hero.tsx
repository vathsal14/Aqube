
import { motion } from 'framer-motion';
import { Gamepad2, CreditCard, TrophyIcon, Shield } from 'lucide-react';
import AnimatedCreditCard from './AnimatedCreditCard';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-6"
            >
              <Gamepad2 className="w-8 h-8 text-orange-400" />
              <span className="text-orange-400 font-semibold text-lg">Aqube XP Credit</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Level Up
              </span>
              <br />
              <span className="text-white">Your Credit Game</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              India's first credit card designed for gamers. Earn rewards on gaming purchases, 
              unlock exclusive perks, and build your credit while doing what you love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold text-lg text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-xl font-bold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-sm text-gray-400">No Annual Fee</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-sm text-gray-400">Secure Payments</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <TrophyIcon className="w-6 h-6 text-orange-400" />
                </div>
                <p className="text-sm text-gray-400">Exclusive Rewards</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Credit Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-3xl blur-3xl transform rotate-12 scale-110"></div>
              <AnimatedCreditCard />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
