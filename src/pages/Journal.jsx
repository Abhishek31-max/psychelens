import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Calendar, Clock, ChevronRight, AlertCircle, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Button from '../components/Button.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { journalAPI } from '../api/index.js';

const Journal = () => {
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setIsAnalyzing(true);
    setError('');
    
    try {
      const { data: analysis } = await journalAPI.analyze(content);
      setFeedback(analysis);

      await journalAPI.createEntry({
        content,
        sentiment: analysis.sentiment,
        insight: analysis.insight,
        clarity: analysis.clarity,
        energy: analysis.energy
      });
    } catch (err) {
      setError('Failed to process reflection. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col pt-16 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
            <div>
              <h1 className="text-5xl font-display text-sage-900 tracking-tight leading-tight mb-2 text-balance">
                Daily <span className="italic font-serif">Reflection</span>
              </h1>
              <div className="flex items-center gap-6 text-sage-400 font-serif italic text-lg opacity-80">
                <span className="flex items-center gap-2"><Calendar size={18} /> {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock size={18} /> {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'} Session</span>
              </div>
            </div>
            <Button variant="secondary" onClick={() => { setContent(''); setFeedback(null); }} className="text-sm rounded-xl px-6">Clear Space</Button>
          </header>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-red-50 text-red-700 border border-red-100 flex items-center gap-4 text-sm font-medium"
            >
              <AlertCircle size={20} /> {error}
            </motion.div>
          )}

          <GlassCard className="min-h-[600px] h-full flex flex-col p-10 border-sage-100 bg-white/50 shadow-2xl shadow-sage-900/5 group">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="How are you truly feeling today? Leave no stone unturned..."
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-2xl text-sage-900 placeholder:text-sage-300 leading-relaxed font-serif italic font-light"
            />
            
            <div className="mt-8 flex items-center justify-between border-t border-sage-100 pt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-400">
                {content.split(/\s+/).filter(Boolean).length} Words Typed
              </span>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !content.trim()}
                className="h-14 px-10 rounded-2xl text-lg shadow-xl shadow-sage-900/10"
              >
                {isAnalyzing ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <Sparkles size={24} />
                  </motion.div>
                ) : (
                  <span className="flex items-center gap-3">Distill Insight <Send size={20} /></span>
                )}
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-8">
          <h2 className="text-2xl font-display text-sage-800 px-2 flex items-center gap-3">
            <Sparkles className="text-sage-400" size={24} /> PsycheLens AI
          </h2>

          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <GlassCard className="bg-sage-900 text-white border-none p-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sage-400 block mb-2">Emotional Resonance</span>
                  <p className="text-3xl font-display text-sage-100">{feedback.sentiment}</p>
                </GlassCard>

                <GlassCard className="bg-white/70 border-white p-8">
                  <h4 className="font-display text-xl text-sage-900 mb-4">Core Insight</h4>
                  <p className="text-sage-700 leading-relaxed font-sans opacity-95">
                    {feedback.insight}
                  </p>
                </GlassCard>

                <GlassCard className="bg-sage-100/30 border-sage-200 border-dashed p-8">
                  <h4 className="font-display text-lg text-sage-900 mb-4 flex items-center gap-2">
                    Guided Inquiry <ChevronRight size={18} className="text-sage-400" />
                  </h4>
                  <p className="text-sage-600 italic font-serif text-lg leading-relaxed opacity-90">
                    "{feedback.suggestion}"
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="border-dashed border-sage-200 bg-transparent flex flex-col items-center justify-center py-32 text-center">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center text-sage-300 mb-8 shadow-inner"
                >
                  <Brain size={48} />
                </motion.div>
                <p className="text-sage-400 font-serif italic text-xl px-12 leading-relaxed opacity-80">
                  Begin your reflection to unlock the patterns of your psyche.
                </p>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Journal;
