import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Languages, Book, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Master <span className="neon-text-gradient kannada-text drop-shadow-[0_0_10px_rgba(102,252,241,0.5)]">ಕನ್ನಡ</span> with Ease
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Your ultimate platform to translate, learn, and practice Kannada. Immerse yourself in a futuristic learning experience powered by next-gen AI tools.
        </p>

        <div className="flex flex-wrap gap-6 justify-center">
          <Link to="/translator">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-btn px-8 py-4 flex items-center justify-center gap-3 text-lg"
            >
              <Languages size={24} />
              Start Translating
            </motion.button>
          </Link>
          <Link to="/learning">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-panel px-8 py-4 flex items-center justify-center gap-3 text-lg font-semibold hover:bg-[rgba(102,252,241,0.1)] transition-colors border-secondaryNeon border-opacity-30"
            >
              <Book size={24} className="text-white" />
              <span className="text-white">Learn Alphabets</span>
              <ArrowRight size={20} className="text-secondaryNeon ml-2" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl"
      >
        {[
          { title: "Real-time Translation", desc: "Instant Eng-Kan & Kan-Eng translations.", icon: Languages },
          { title: "Audio Pronunciation", desc: "Listen and perfect your accent.", icon: Sparkles },
          { title: "Progress Tracking", desc: "Monitor your learning streak.", icon: Book }
        ].map((feature, i) => (
          <div key={i} className="glass-panel p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(69,162,158,0.2)]">
            <div className="w-16 h-16 rounded-full bg-[rgba(69,162,158,0.2)] flex items-center justify-center mb-4 text-secondaryNeon shadow-[0_0_15px_rgba(102,252,241,0.2)]">
              <feature.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
