import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind } from 'lucide-react';
import Button from './Button.jsx';

const BreathingMode = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState('Inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          setPhase((current) => {
            if (current === 'Inhale') return 'Hold';
            if (current === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-sage-50/80 backdrop-blur-xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-2 text-sage-600 hover:text-sage-900 transition-colors"
          >
            <X size={32} />
          </button>

          <div className="text-center max-w-sm w-full">
            <motion.div
              animate={{ 
                scale: phase === 'Inhale' ? 1.2 : phase === 'Exhale' ? 0.9 : 1.2,
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut",
                repeat: Infinity 
              }}
              className="w-48 h-48 mx-auto rounded-full bg-sage-300/20 flex items-center justify-center mb-10"
            >
               <Wind size={40} className="text-sage-500" />
            </motion.div>

            <motion.h2 
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-bold text-sage-800 mb-2 uppercase tracking-widest"
            >
              {phase}
            </motion.h2>
            <p className="text-xl font-medium text-sage-400">{count}</p>
            
            <p className="mt-10 text-sage-400 text-sm">Focus on your breath. Be present.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreathingMode;
