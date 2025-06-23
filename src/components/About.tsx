
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Aqube XP
            </h2>
            
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We are gamers passionate about gaming and esports. We recognized that gamers in India deserve 
              financial products that fit their lifestyle. We see a world where gaming is not just a passion. 
              That's why we're building Aqube XP: India's first credit card designed for gamers, offering 
              rewards, benefits, and experiences that truly matter to you.
            </p>
            
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Our mission is to revolutionize how India's gaming community manages money. Our vision is to 
              bridge the gap between gaming and finance. We empower gamers to earn, save, and enjoy exclusive 
              rewards on every transaction and promote financial literacy.
            </p>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Whether you're a casual mobile gamer or a professional esports athlete, Aqube XP will help you 
              level up your gaming experience. By merging gaming and finance, Aqube is committed to increasing 
              financial literacy and unlocking the full potential of gaming and esports industry.
            </p>

            <p className="text-xl text-cyan-400 font-semibold mb-8">
              Aqube XP is more than a credit card—it's a movement to empower gamers and redefine how finance 
              supports the gaming lifestyle in India and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">1K+</div>
                  <div className="text-blue-200">Pre-Registered Users</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold text-white mb-2">1M+</div>
                  <div className="text-blue-200">Points Earned</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full opacity-20"
            />
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-pink-400 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
