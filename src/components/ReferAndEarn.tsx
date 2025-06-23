
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlusIcon, GiftIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ReferAndEarn = () => {
  const { profile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);

  const copyReferralCode = async () => {
    if (!profile?.referral_code) return;
    
    try {
      await navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      toast.success('Referral code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy referral code');
    }
  };

  const maxReferrals = 3;
  const remainingReferrals = maxReferrals - referralCount;

  if (!profile) {
    return (
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Please sign in to access refer and earn</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-900" id="refer">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Refer & Earn Spins
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Invite friends to join Gaming Elite and earn extra spins. Maximum 3 referrals per user.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <UserPlusIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Your Referral Code</h3>
                <p className="text-gray-400 text-sm">Share this code with friends</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono text-cyan-400 tracking-wider">
                  {profile.referral_code}
                </span>
                <motion.button
                  onClick={copyReferralCode}
                  className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5 text-white" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Referrals made:</span>
                <span className="text-white font-semibold">{referralCount}/{maxReferrals}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(referralCount / maxReferrals) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Remaining:</span>
                <span className="text-cyan-400 font-semibold">{remainingReferrals} spins available</span>
              </div>
            </div>
          </motion.div>

          {/* How it Works Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/30"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <GiftIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">How It Works</h3>
                <p className="text-gray-400 text-sm">Simple steps to earn spins</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Share Your Code",
                  description: "Send your referral code to friends who love gaming"
                },
                {
                  step: "2",
                  title: "Friend Signs Up",
                  description: "They create an account using your referral code"
                },
                {
                  step: "3",
                  title: "Earn Extra Spins",
                  description: "You get +1 spin for each successful referral"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg border border-purple-500/30"
            >
              <p className="text-cyan-400 font-semibold text-sm mb-1">💡 Pro Tip</p>
              <p className="text-gray-300 text-sm">
                Maximum 3 referrals per user. Each referral gives you 1 extra spin for the rewards wheel!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarn;
