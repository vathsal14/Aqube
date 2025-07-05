
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Aqube XP Credit Card?",
      answer: "Aqube XP is India's first credit card designed specifically for gamers. It offers rewards on gaming purchases, exclusive perks, and helps you build credit while enjoying your gaming lifestyle."
    },
    {
      question: "How do I earn rewards with Aqube XP?",
      answer: "You earn rewards on all your gaming-related purchases including games, hardware, subscriptions, and accessories. The more you spend on gaming, the more rewards you earn!"
    },
    {
      question: "Is there an annual fee?",
      answer: "No, Aqube XP comes with no annual fee. You can enjoy all the premium gaming benefits without any yearly charges."
    },
    {
      question: "What gaming categories offer the highest rewards?",
      answer: "Gaming hardware earns 5% cashback, digital games earn 4%, streaming services earn 3%, and gaming accessories earn 3% cashback."
    },
    {
      question: "How does the referral program work?",
      answer: "Share your unique referral code with friends. When they sign up using your code, you earn extra spins for our rewards wheel. Each user can make up to 3 referrals."
    },
    {
      question: "What exclusive perks do I get?",
      answer: "Aqube XP cardholders get access to beta games, gaming events, exclusive merchandise, priority customer support, and special gaming community features."
    },
    {
      question: "How do I apply for Aqube XP?",
      answer: "Simply click 'Get Started' to begin your application. The process is digital, fast, and you can get instant approval to start earning rewards immediately."
    },
    {
      question: "Is my gaming data and transactions secure?",
      answer: "Yes, we use advanced security features and fraud protection to keep your gaming purchases and personal information completely secure."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-orange-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Everything you need to know about Aqube XP Credit Card
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-orange-400 transition-colors duration-300 py-6">
                  <span className="text-lg font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-3xl p-8 border border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our gaming-savvy support team is here to help you 24/7
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
