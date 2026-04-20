import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy, Clock, Book } from 'lucide-react';

const Dashboard = () => {
  // Mock Data
  const stats = [
    { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/20' },
    { label: 'XP Points', value: '2,450', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
    { label: 'Lessons Completed', value: '18', icon: Book, color: 'text-secondaryNeon', bg: 'bg-secondaryNeon/20' },
    { label: 'Time Spent', value: '4h 30m', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/20' },
  ];

  const recentActivity = [
    { title: 'Completed "Basic Greetings"', time: '2 hours ago', xp: '+50 XP' },
    { title: 'Practiced Vowels Level 1', time: 'Yesterday', xp: '+20 XP' },
    { title: 'Saved 5 new words to Dictionary', time: '2 days ago', xp: '+10 XP' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex items-center gap-6 mb-10 border-b border-[rgba(69,162,158,0.2)] pb-8">
        <div className="w-24 h-24 rounded-full border-2 border-secondaryNeon p-1">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(102,252,241,0.3)]">
            JD
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John Doe!</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" /> Novice Explorer Level 4
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-panel p-6 flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon size={28} />
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Recent Activity</h2>
            <div className="space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-secondaryNeon mt-2"></div>
                    <div>
                      <div className="text-white font-medium">{activity.title}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primaryNeon">{activity.xp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Dictionary / Goals */}
        <div className="space-y-8">
          <div className="glass-panel p-8">
            <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Saved Words</h2>
            <div className="space-y-4">
              {[
                { kn: 'ಸ್ನೇಹಿತ', en: 'Friend' },
                { kn: 'ಪುಸ್ತಕ', en: 'Book' },
                { kn: 'ನೀರು', en: 'Water' }
              ].map((word, i) => (
                <div key={i} className="bg-[rgba(11,12,16,0.6)] p-3 rounded-lg flex justify-between items-center border border-gray-800">
                  <span className="font-bold text-secondaryNeon kannada-text drop-shadow-[0_0_2px_rgba(102,252,241,0.5)] text-lg">{word.kn}</span>
                  <span className="text-gray-300 text-sm">{word.en}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 text-sm text-gray-400 hover:text-secondaryNeon transition-colors pt-2">
              View Entire Dictionary →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
