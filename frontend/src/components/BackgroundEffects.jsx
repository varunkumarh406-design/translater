import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const kannadaLetters = ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'];

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      letter: kannadaLetters[Math.floor(Math.random() * kannadaLetters.length)],
      left: `${Math.random() * 100}vw`,
      top: `${Math.random() * 100}vh`,
      size: `${Math.random() * 2 + 1}rem`,
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-darkBg">
      {/* Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primaryNeon opacity-20 blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#17252A] opacity-50 blur-[120px]"></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-secondaryNeon opacity-10 blur-[100px]"></div>

      {/* Floating Letters */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-secondaryNeon font-bold kannada-text"
          style={{
            left: particle.left,
            top: particle.top,
            fontSize: particle.size,
            opacity: particle.opacity,
            textShadow: '0 0 10px rgba(102, 252, 241, 0.3)'
          }}
          animate={{
            y: ['0vh', '-100vh'],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
        >
          {particle.letter}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundEffects;
