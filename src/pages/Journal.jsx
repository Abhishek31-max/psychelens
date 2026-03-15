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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-sage-900 tracking-tight">Daily Reflection</h1>
              <div className="flex items-center gap-4 text-sage-400 font-medium text-sm mt-1">
                <span className="flex items-center gap-2"><Calendar size={16} /> {new Date().toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock size={16} /> {new Date().getHours() < 12 ? 'Morning' : 'Afternoon'}</span>
              </div>
            </div>
            <Button variant="secondary" onClick={() => { setContent(''); setFeedback(null); }} className="text-sm rounded-lg px-5">Clear Page</Button>
          </header>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <GlassCard className="min-h-[500px] h-full flex flex-col p-8 border-sage-100 bg-white/60">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Capture your thoughts..."
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-lg text-sage-900 placeholder:text-sage-300 leading-relaxed font-medium"
            />
            
            <div className="mt-6 flex items-center justify-between border-t border-sage-50 pt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sage-400">
                {content.split(/\s+/).filter(Boolean).length} Words
              </span>
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing || !content.trim()}
                className="h-12 px-8 rounded-xl shadow-md"
              >
                {isAnalyzing ? (
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ) : (
                  <span className="flex items-center gap-2">Analyze Reflection <Send size={18} /></span>
                )}
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-sage-800 px-1 flex items-center gap-2">
            <Sparkles className="text-sage-400" size={20} /> AI Insights
          </h2>

          <AnimatePresence mode="wait">
            {feedback ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <GlassCard className="bg-sage-900 text-white border-none p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sage-400 block mb-1">Tone</span>
                  <p className="text-xl font-bold text-white">{feedback.sentiment}</p>
                </GlassCard>

                <GlassCard className="bg-white/80 border-white p-6">
                  <h4 className="font-bold text-sage-900 mb-2">Core Insight</h4>
                  <p className="text-sage-600 text-sm leading-relaxed">
                    {feedback.insight}
                  </p>
                </GlassCard>

                <GlassCard className="bg-sage-50/50 border-sage-100 border-dashed p-6">
                  <h4 className="font-bold text-sage-800 mb-2 flex items-center gap-1">
                    Next Step <ChevronRight size={16} />
                  </h4>
                  <p className="text-sage-500 font-medium text-sm">
                    "{feedback.suggestion}"
                  </p>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="border-dashed border-sage-200 bg-transparent flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-400 mb-4">
                  <Brain size={32} />
                </div>
                <p className="text-sage-400 text-sm font-medium px-8 leading-relaxed">
                  Start writing to unveil the insights within your reflection.
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
