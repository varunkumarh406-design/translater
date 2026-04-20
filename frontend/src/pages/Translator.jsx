import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Mic, Volume2, Save, RefreshCw } from 'lucide-react';
import axios from 'axios';

const Translator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isEnglishToKannada, setIsEnglishToKannada] = useState(false); // Default to Kannada -> English
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const translateText = async () => {
      if (!sourceText.trim()) {
        setTranslatedText('');
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/translate', {
          text: sourceText,
          from: isEnglishToKannada ? 'en' : 'kn',
          to: isEnglishToKannada ? 'kn' : 'en'
        });
        setTranslatedText(response.data.translated);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText('Error: Could not connect to API');
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      translateText();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [sourceText, isEnglishToKannada]);

  const handleSwap = () => {
    setIsEnglishToKannada(!isEnglishToKannada);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const readAloud = (text, lang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const targetLang = lang === 'kn' ? 'kn-IN' : 'en-US';
      utterance.lang = targetLang;
      
      // Romantic/Seductive tone params
      utterance.pitch = 0.7; // Deeper, smoother voice
      utterance.rate = 0.85; // Slightly slower, more deliberate
      utterance.volume = 1;

      // Select female voice if available
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.lang.includes(targetLang) && 
        (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('google uk english female'))
      ) || voices.find(v => v.lang.includes(targetLang));
      
      if (voice) utterance.voice = voice;

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in your browser.");
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = isEnglishToKannada ? 'en-US' : 'kn-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSourceText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-10"
    >
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4 neon-text-gradient inline-block">Neural Translator</h1>
        <p className="text-gray-400">Instantly translate between English and Kannada</p>
      </div>

      <div className="glass-panel p-8">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-[rgba(69,162,158,0.2)] pb-6">
          <div className="flex-1 text-center text-xl font-semibold text-secondaryNeon uppercase tracking-widest">
            {isEnglishToKannada ? 'English' : 'Kannada (ಕನ್ನಡ)'}
          </div>
          
          <button 
            onClick={handleSwap}
            className="w-12 h-12 rounded-full bg-[rgba(69,162,158,0.1)] border border-[#45A29E] flex items-center justify-center hover:bg-[#45A29E] hover:text-darkBg transition-all group"
          >
            <ArrowLeftRight className="transform group-hover:rotate-180 transition-transform duration-500" />
          </button>
          
          <div className="flex-1 text-center text-xl font-semibold text-secondaryNeon uppercase tracking-widest kannada-text drop-shadow-[0_0_5px_rgba(102,252,241,0.5)]">
            {isEnglishToKannada ? 'Kannada (ಕನ್ನಡ)' : 'English'}
          </div>
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-64 glass-input p-6 resize-none text-lg placeholder-gray-500"
            ></textarea>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                className="p-2 rounded-full bg-darkBg border border-gray-600 hover:border-secondaryNeon hover:text-secondaryNeon transition-colors"
                onClick={() => readAloud(sourceText, isEnglishToKannada ? 'en' : 'kn')}
              >
                <Volume2 size={20} />
              </button>
              <button 
                onClick={startListening}
                className={`p-2 rounded-full bg-darkBg border transition-colors ${isListening ? 'border-red-500 text-red-500 animate-pulse' : 'border-gray-600 hover:border-secondaryNeon hover:text-secondaryNeon'}`}
                title="Start Audio Translation"
              >
                <Mic size={20} />
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className={`w-full h-64 glass-input p-6 text-lg overflow-y-auto ${!translatedText && 'text-gray-500'} ${!isEnglishToKannada ? '' : 'kannada-text text-2xl'}`}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <RefreshCw className="animate-spin text-secondaryNeon" size={32} />
                </div>
              ) : (
                translatedText || 'Translation will appear here...'
              )}
            </div>
            {translatedText && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                 <button 
                  className="p-2 rounded-full bg-darkBg border border-gray-600 hover:border-secondaryNeon hover:text-secondaryNeon transition-colors"
                  title="Save Word"
                >
                  <Save size={20} />
                </button>
                <button 
                  onClick={() => readAloud(translatedText, isEnglishToKannada ? 'kn' : 'en')}
                  className="p-2 rounded-full bg-darkBg border border-gray-600 hover:border-secondaryNeon hover:text-secondaryNeon transition-colors"
                >
                  <Volume2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Auto Translation Indicator */}
        <div className="mt-8 text-center text-gray-400 opacity-80 flex items-center justify-center gap-2">
          {isLoading ? <RefreshCw className="animate-spin text-secondaryNeon" size={18} /> : <div className="w-2 h-2 rounded-full bg-secondaryNeon border shadow-[0_0_5px_#66FCF1]"></div>}
          <span>Translation triggers automatically as you type...</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Translator;
