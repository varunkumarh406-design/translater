import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ChevronRight, BookOpen } from 'lucide-react';
import axios from 'axios';

const Learning = () => {
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from backend
    const mockLessons = [
      {
        id: 1,
        title: 'Vowels (ಸ್ವರಗಳು)',
        content: [
          { letter: 'ಅ', pronunciation: 'a', example: 'ಅರಸ (King)' },
          { letter: 'ಆ', pronunciation: 'aa', example: 'ಆನೆ (Elephant)' },
          { letter: 'ಇ', pronunciation: 'i', example: 'ಇಲಿ (Mouse)' },
          { letter: 'ಈ', pronunciation: 'ii', example: 'ಈರುಳ್ಳಿ (Onion)' },
          { letter: 'ಉ', pronunciation: 'u', example: 'ಉಗುರು (Nail)' },
          { letter: 'ಊ', pronunciation: 'uu', example: 'ಊಟ (Meal)' }
        ]
      },
      {
        id: 2,
        title: 'Consonants (ವ್ಯಂಜನಗಳು)',
        content: [
          { letter: 'ಕ', pronunciation: 'ka', example: 'ಕಮಲ (Lotus)' },
          { letter: 'ಖ', pronunciation: 'kha', example: 'ಖಡ್ಗ (Sword)' },
          { letter: 'ಗ', pronunciation: 'ga', example: 'ಗಡಿಯಾರ (Clock)' }
        ]
      },
      {
        id: 3,
        title: 'Basic Greetings',
        content: [
          { letter: 'ನಮಸ್ಕಾರ', pronunciation: 'Namaskara', example: 'Hello / Welcome' },
          { letter: 'ಹೌದು', pronunciation: 'Houdu', example: 'Yes' },
          { letter: 'ಇಲ್ಲ', pronunciation: 'Illa', example: 'No' },
          { letter: 'ಧನ್ಯವಾದ', pronunciation: 'Dhanyavada', example: 'Thank you' }
        ]
      }
    ];
    setLessons(mockLessons);
    setActiveLesson(mockLessons[0]);
    setIsLoading(false);
  }, []);

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) return <div className="text-center mt-20"><div className="animate-spin text-secondaryNeon inline-block"><ChevronRight size={32} /></div></div>;

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 neon-text-gradient inline-block">Learning Center</h1>
        <p className="text-gray-400">Master the Kannada basics, step by step.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-secondaryNeon flex items-center gap-2">
            <BookOpen size={20} /> Modules
          </h2>
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveLesson(lesson)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                activeLesson?.id === lesson.id 
                  ? 'glass-panel border-secondaryNeon text-white shadow-[0_0_15px_rgba(102,252,241,0.2)]'
                  : 'bg-[rgba(11,12,16,0.6)] border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{lesson.title}</span>
                {activeLesson?.id === lesson.id && <ChevronRight size={18} className="text-secondaryNeon" />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:w-2/3 glass-panel p-8">
          <h2 className="text-3xl font-bold mb-8 text-white border-b border-[rgba(69,162,158,0.2)] pb-4">
            {activeLesson?.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeLesson?.content.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-[rgba(11,12,16,0.8)] border border-[rgba(69,162,158,0.3)] rounded-xl p-6 relative group overflow-hidden hover:border-secondaryNeon transition-all"
              >
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[rgba(102,252,241,0.1)] rounded-full blur-xl group-hover:bg-[rgba(102,252,241,0.2)] transition-all"></div>
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className={`text-5xl text-white drop-shadow-[0_0_8px_rgba(102,252,241,0.6)] ${item.letter.length > 2 ? 'text-3xl font-sans' : 'kannada-text font-bold'}`}>
                    {item.letter}
                  </span>
                  <button 
                    onClick={() => playAudio(item.letter)}
                    className="p-2 bg-[rgba(69,162,158,0.2)] text-secondaryNeon rounded-full hover:bg-secondaryNeon hover:text-darkBg transition-colors"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <div className="relative z-10 space-y-1">
                  <div className="text-gray-400 text-sm">Pronunciation: <span className="text-gray-200 font-mono bg-darkBg px-2 py-1 rounded">{item.pronunciation}</span></div>
                  <div className="text-gray-400 text-sm">Example: <span className="text-white">{item.example}</span></div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[rgba(69,162,158,0.2)] flex justify-end">
            <button className="neon-btn px-6 py-2 flex items-center gap-2">
              Next Lesson <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
