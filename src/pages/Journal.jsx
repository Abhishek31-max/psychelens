import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Calendar, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { journalAPI } from '../api';

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
      // 1. Get AI Analysis
      const { data: analysis } = await journalAPI.analyze(content);
      setFeedback(analysis);

      // 2. Save to DB
      await journalAPI.createEntry({
        content,
        sentiment: analysis.sentiment,
        insight: analysis.insight
      });
    } catch (err) {
      setError('Failed to process reflection. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col pt-12">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <header className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-sage-900 tracking-tight">Daily Reflection</h1>
              <div className="flex items-center gap-4 text-sage-500 mt-1 text-sm">
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date().toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Morning Session</span>
              </div>
            </div>
            <Button variant="secondary" onClick={() => { setContent(''); setFeedback(null); }} className="text-sm">Clear</Button>
          </header>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center gap-3 text-sm font-medium">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <GlassCard className="min-h-[500px] flex flex-col p-8 border-sage-200/50 bg-white/40">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="How are you truly feeling today? Leave no stone unturned..."
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-lg text-sage-800 placeholder:text-sage-300 leading-relaxed font-medium"
            />
            
            <div className="mt-6 flex items-center justify-between border-t border-sage-100 pt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-400">
                {content.split(/\s+/).filter(Boolean).length} Words
              </span>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !content.trim()}
                className="h-12 px-8"
              >
                {isAnalyzing ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ) : (
                  <>Generate Insights <Send size={18} /></>
                )}
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-sage-800 flex items-center gap-2">
            <Sparkles className="text-sage-500" size={20} /> PsycheLens AI
          </h2>

          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <GlassCard className="bg-sage-900 text-sage-50 border-none">
                  <span className="text-xs font-bold uppercase tracking-widest text-sage-400">Emotional Tone</span>
                  <p className="text-xl font-semibold mt-1">{feedback.sentiment}</p>
                </GlassCard>

                <GlassCard className="bg-white/60 border-sage-200">
                  <h4 className="font-bold text-sage-900 mb-2">Core Insight</h4>
                  <p className="text-sage-700 leading-relaxed text-sm">
                    {feedback.insight}
                  </p>
                </GlassCard>

                <GlassCard className="bg-sage-100/50 border-sage-200 border-dashed">
                  <h4 className="font-bold text-sage-900 mb-2 flex items-center gap-2">
                    Guided Inquiry <ChevronRight size={16} />
                  </h4>
                  <p className="text-sage-700 italic text-sm">
                    "{feedback.suggestion}"
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="border-dashed border-sage-200 bg-transparent flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-400 mb-4">
                  <Brain size={32} />
                </div>
                <p className="text-sage-400 font-medium px-10">
                  Begin writing your reflection to unlock AI deeper insights.
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
