import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import GlassCard from './GlassCard.jsx';

const DailyAffirmation = () => {
  const affirmations = [
    "I am worthy of peace and clarity. My journey is unique, and I am exactly where I need to be.",
    "Breathe in strength, breathe out doubt. Everything I need is already within me.",
    "I trust the process of my own growth. Every small step is a victory.",
    "My mind is a garden. I choose to nurture thoughts of kindness and resilience.",
    "I release what I cannot control and embrace the present moment with grace."
  ];

  const dailyIndex = new Date().getDate() % affirmations.length;
  const affirmation = affirmations[dailyIndex];

  return (
    <GlassCard className="relative overflow-hidden group border-none bg-gradient-to-br from-white/40 to-sage-100/40">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={80} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sage-400 mb-4">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Daily Affirmation</span>
        </div>
        
        <p className="text-xl font-serif italic text-sage-800 leading-relaxed mb-6">
          "{affirmation}"
        </p>
        
        <div className="h-1 w-12 bg-sage-300 rounded-full" />
      </div>

      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-lavender/10 blur-[40px] rounded-full pointer-events-none" />
    </GlassCard>
  );
};

export default DailyAffirmation;
