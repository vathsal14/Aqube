
import { motion } from 'framer-motion';
import { Smartphone, ShoppingCart, Activity, Brain, Gamepad2, BarChart3, Bell, CreditCard, Percent, Shield, Gift, Trophy, Zap } from 'lucide-react';

const Features = () => {
  const appFeatures = [
    {
      icon: CreditCard,
      title: "Card Manage",
      description: "Complete control over your gaming credit card with easy management tools and real-time controls.",
      color: "from-cyan-500 to-blue-600",
      stats: "Easy Control"
    },
    {
      icon: ShoppingCart,
      title: "Gaming Marketplace",
      description: "Access exclusive gaming deals, in-game purchases, and premium gaming accessories all in one place.",
      color: "from-purple-500 to-pink-600",
      stats: "Exclusive Deals"
    },
    {
      icon: Activity,
      title: "Real-time Expense Tracking",
      description: "Monitor your gaming expenses instantly with detailed breakdowns and spending insights.",
      color: "from-green-500 to-emerald-600",
      stats: "Live Tracking"
    },
    {
      icon: Brain,
      title: "AI Financial Advice",
      description: "Get personalized financial advice and gaming tips powered by advanced AI technology.",
      color: "from-orange-500 to-red-600",
      stats: "Smart AI"
    },
    {
      icon: Gamepad2,
      title: "Finance Learning Game",
      description: "Learn financial literacy through engaging games designed specifically for gamers.",
      color: "from-pink-500 to-rose-600",
      stats: "Learn & Play"
    },
    {
      icon: BarChart3,
      title: "XP Progress Dashboard",
      description: "Track your financial progress and gaming achievements with detailed analytics and insights.",
      color: "from-indigo-500 to-purple-600",
      stats: "Progress Tracking"
    },
    {
      icon: Bell,
      title: "Smart Gaming Alerts",
      description: "Get notifications for game sales, exclusive offers, and cashback opportunities from your favorite platforms.",
      color: "from-yellow-500 to-orange-600",
      stats: "Smart Alerts"
    }
  ];

  const cardFeatures = [
    {
      icon: Percent,
      title: "0% Interest",
      description: "Enjoy zero interest rates on all your gaming purchases and transactions.",
      color: "from-green-500 to-emerald-600",
      stats: "0% APR"
    },
    {
      icon: Shield,
      title: "No Hidden Charges",
      description: "Complete transparency with no extra fees or hidden charges on any transaction.",
      color: "from-blue-500 to-cyan-600",
      stats: "Transparent"
    },
    {
      icon: Gift,
      title: "Gaming Cashback",
      description: "Get discounts and cashback on every gaming spend including in-game purchases, accessories, and subscriptions.",
      color: "from-purple-500 to-pink-600",
      stats: "Max Cashback"
    },
    {
      icon: Trophy,
      title: "Partner Discounts",
      description: "Access extra discounts from our partnered gaming companies and exclusive brand offers.",
      color: "from-orange-500 to-red-600",
      stats: "Exclusive"
    },
    {
      icon: Smartphone,
      title: "Easy App Management",
      description: "Manage your card effortlessly through our intuitive mobile app with all features at your fingertips.",
      color: "from-cyan-500 to-blue-600",
      stats: "App Control"
    },
    {
      icon: Zap,
      title: "Extra Rewards",
      description: "Earn additional rewards through events, leaderboards, and games within our ecosystem.",
      color: "from-yellow-500 to-orange-600",
      stats: "Bonus Rewards"
    }
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* App Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              App Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to manage your gaming finances in one powerful app.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {appFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 h-full"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Stats Badge */}
                <div className="text-center mb-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-center">{feature.description}</p>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 blur-xl -z-10`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Card Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Card Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            India's first gaming credit card designed with gamers in mind.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500 h-full"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Stats Badge */}
                <div className="text-center mb-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${feature.color} text-white`}>
                    {feature.stats}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-center">{feature.description}</p>

                {/* Hover Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 blur-xl -z-10`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
