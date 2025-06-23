
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Rewards from '../components/Rewards';
import ReferAndEarn from '../components/ReferAndEarn';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AuthPage from '../components/AuthPage';
import GamingSlotMachine from '../components/GamingSlotMachine';
import TargetRushGame from '../components/TargetRushGame';
import GamingQuiz from '../components/GamingQuiz';
import WordScrambleGame from '../components/WordScrambleGame';
import Leaderboard from '../components/Leaderboard';
import SurveyForm from '../components/SurveyForm';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSlotMachineModalOpen, setIsSlotMachineModalOpen] = useState(false);
  const [isTargetRushModalOpen, setIsTargetRushModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isWordScrambleModalOpen, setIsWordScrambleModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar 
          onAuthClick={() => setIsAuthModalOpen(true)}
          onWheelClick={() => setIsSlotMachineModalOpen(true)}
        />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 md:space-y-20 lg:space-y-24"
        >
          <section id="home" className="pt-2">
            <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
          </section>
          
          <section id="features" className="pt-4">
            <Features />
          </section>
          
          <section id="about" className="pt-4">
            <About />
          </section>
          
          <section id="rewards" className="pt-2">
            <Rewards />
          </section>

          {/* Survey Section */}
          <section id="survey" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Help Us Serve You Better
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Share your gaming preferences and financial needs to help us create the perfect credit card for you.
                </p>
                <motion.button
                  onClick={() => setIsSurveyModalOpen(true)}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Take Survey
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Games Section */}
          <section id="games" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Gaming Arena
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Play games, earn points, and climb the leaderboard!
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <motion.div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border border-cyan-500/30 h-full"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">🎯 Target Rush</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Fast-paced shooting! Hit moving targets in 60 seconds.
                  </p>
                  <button
                    onClick={() => setIsTargetRushModalOpen(true)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Start Rush
                  </button>
                </motion.div>
                
                <motion.div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-purple-500/30"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-purple-400 mb-3">🎰 Slot Machine</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Try your luck! Win points and prizes with lucky streaks.
                  </p>
                  <button
                    onClick={() => setIsSlotMachineModalOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Spin Now
                  </button>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-green-500/30"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-green-400 mb-3">🧠 Gaming Quiz</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Test your gaming knowledge with timed questions.
                  </p>
                  <button
                    onClick={() => setIsQuizModalOpen(true)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Start Quiz
                  </button>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/30"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">🔀 Word Scramble</h3>
                  <p className="text-gray-300 mb-4 text-sm">
                    Unscramble gaming words before time runs out!
                  </p>
                  <button
                    onClick={() => setIsWordScrambleModalOpen(true)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Play Now
                  </button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Leaderboard Section */}
          <section id="leaderboard" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Hall of Fame
                  </motion.h2>
                  <motion.p
                    className="text-xl text-gray-300 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Compete with gamers worldwide and climb the leaderboard. Show off your gaming prowess and earn your place among the elite.
                  </motion.p>
                </div>
                <Leaderboard />
              </div>
            </div>
          </section>
          
          <section id="refer">
            <ReferAndEarn />
          </section>
          
          <section id="faq">
            <FAQ />
          </section>
        </motion.main>
        
        <Footer />
        
        {isAuthModalOpen && (
          <AuthPage onClose={() => setIsAuthModalOpen(false)} />
        )}
        
        {isSlotMachineModalOpen && (
          <GamingSlotMachine onClose={() => setIsSlotMachineModalOpen(false)} />
        )}
        
        {isTargetRushModalOpen && (
          <TargetRushGame onClose={() => setIsTargetRushModalOpen(false)} />
        )}

        {isQuizModalOpen && (
          <GamingQuiz onClose={() => setIsQuizModalOpen(false)} />
        )}

        {isWordScrambleModalOpen && (
          <WordScrambleGame onClose={() => setIsWordScrambleModalOpen(false)} />
        )}

        {isSurveyModalOpen && (
          <SurveyForm onClose={() => setIsSurveyModalOpen(false)} />
        )}
      </div>
    </AuthProvider>
  );
};

export default Index;
