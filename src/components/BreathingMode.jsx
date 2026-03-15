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

          <div className="text-center max-w-md w-full">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 0.8 : 1.5,
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut",
                repeat: Infinity 
              }}
              className="w-64 h-64 mx-auto rounded-full bg-sage-300/30 flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(100,200,100,0.2)]"
            >
               <Wind size={48} className="text-sage-600" />
            </motion.div>

            <motion.h2 
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-display text-sage-900 mb-4"
            >
              {phase}
            </motion.h2>
            <p className="text-2xl font-sans text-sage-500">{count}</p>
            
            <p className="mt-12 text-sage-400 italic">Focus on the expansion and contraction. Let everything else fade away.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BreathingMode;
