
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "When will the credit card be available?",
      answer: "As early as possible! Stay tuned for announcements on our website and social media channels."
    },
    {
      question: "How can I redeem my rewards?",
      answer: "Your rewards will be available to you after the launch of our credit card/app as early as possible. All earned points and rewards will be transferred to your account."
    },
    {
      question: "Will there be any charges for the gaming credit card?",
      answer: "We will launch the card with two variants: one for free and another with an annual fee that includes extra rewards and premium features."
    },
    {
      question: "How to get more spins?",
      answer: "You can refer your friends or family and get up to 3 spins maximum. Each successful referral earns you additional spins for the rewards wheel."
    },
    {
      question: "How to progress in the leaderboard?",
      answer: "Play games, take quizzes, and spin the wheel to collect points and progress in leaderboards. You can even receive a surprise gift if you're first on the leaderboard!"
    },
    {
      question: "Is it free to register on the website?",
      answer: "Yes, registration is completely free. There are no charges for signing up and earning rewards before the card launch."
    },
    {
      question: "Why should I pre-register for the Aqube Gaming Credit Card?",
      answer: "Pre-registering ensures you are among the first to access exclusive benefits, early offers, and launch rewards. Early adopters get special perks!"
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We prioritize user data privacy and security, following strict data protection policies and industry-standard encryption."
    },
    {
      question: "How will I know when it launches?",
      answer: "We will update you via email and our social media handles. Make sure to follow us on all platforms to stay updated!"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to know about Aqube XP and our gaming credit card
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Still have questions?
          </p>
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
