import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, Component } from 'react';
import { Sparkles, Brain, Cloud, Sun, Map } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { journalAPI } from '../api/index.js';

// Simple Error Boundary for Chart
class ChartErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Chart Crash:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center p-8 text-center bg-red-50/50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-medium">The visualization engine encountered an error. Please refresh or try again later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Analysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/auth');
      return;
    }
    fetchAnalysis();
  }, [navigate]);

  const fetchAnalysis = async () => {
    try {
      const { data: analysisData } = await journalAPI.getAnalysis();
      setData(Array.isArray(analysisData) ? analysisData : []);
    } catch (err) {
      console.error('Failed to fetch analysis', err);
    } finally {
      setLoading(false);
    }
  };

  const themes = [
    { title: "Career Growth", weight: 80, color: "bg-sage-800" },
    { title: "Internal Peace", weight: 65, color: "bg-sage-600" },
    { title: "Social Friction", weight: 40, color: "bg-sage-400" },
    { title: "Creative Flow", weight: 90, color: "bg-sage-700" },
  ];

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col pt-16 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        <header className="mb-16">
          <h1 className="text-5xl font-display text-sage-900 tracking-tight leading-tight mb-4">
            Emotional <span className="italic font-serif">Rhythms</span>
          </h1>
          <p className="text-sage-500 font-serif italic text-xl opacity-80">Uncovering the geometric patterns of your psyche.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Chart */}
          <GlassCard className="lg:col-span-2 p-10 h-[550px] flex flex-col group">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-display text-sage-900 flex items-center gap-3">
                <Sun className="text-sage-400" size={24} /> Clarity & Energy Trends
              </h2>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-sage-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sage-800" /> Clarity</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sage-400" /> Energy</div>
              </div>
            </div>
            
            <div className="flex-1 w-full relative">
              {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-800 rounded-full animate-spin" />
                </div>
              ) : data.length > 0 ? (
                <ChartErrorBoundary>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2c3422" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#2c3422" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8d9484" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8d9484" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e6e0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '20px', 
                          border: 'none',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                          padding: '16px'
                        }} 
                        itemStyle={{fontFamily: 'Inter', fontWeight: 600, fontSize: '13px'}}
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8d9484', fontSize: 12}} dy={15} />
                      <YAxis hide />
                      <Area 
                        type="monotone" 
                        dataKey="clarity" 
                        stroke="#2c3422" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorClarity)" 
                        animationDuration={2000}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#8d9484" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorEnergy)" 
                        strokeDasharray="8 8"
                        animationDuration={2500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartErrorBoundary>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-sage-100/30 rounded-[2rem] border-2 border-dashed border-sage-200">
                  <p className="text-sage-400 font-serif italic text-lg text-center px-12">"The canvas of your mind awaits its first stroke. Continue reflecting to map your journey."</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Theme Distribution */}
          <div className="space-y-8">
            <h2 className="text-2xl font-display text-sage-900 px-2 flex items-center gap-3">
              <Sparkles className="text-sage-400" size={24} /> Insight Clusters
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {themes.map((theme, index) => (
                <GlassCard key={index} delay={index * 0.1} className="p-6 flex flex-col gap-4 group hover:bg-white/60 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg text-sage-900">{theme.title}</span>
                    <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">{theme.weight}% Resonance</span>
                  </div>
                  <div className="w-full h-1.5 bg-sage-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${theme.weight}%` }}
                      transition={{ duration: 1.5, ease: "circOut", delay: index * 0.1 }}
                      className={`h-full ${theme.color} rounded-full`}
                    />
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="bg-sage-900 text-white border-none p-10 relative overflow-hidden group mt-4">
              <div className="absolute top-0 right-0 w-40 h-40 bg-sage-400/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-700" />
              <h3 className="text-3xl font-display mb-6 flex items-center gap-4 text-sage-100">
                <Map size={32} className="text-sage-400" /> Thematic Map
              </h3>
              <p className="text-sage-300 font-serif italic text-lg leading-relaxed opacity-90">
                Your psyche is currently gravitating towards <span className="text-white font-semibold not-italic">Integrity</span> and <span className="text-accent-gold font-semibold not-italic">Purpose</span>.
              </p>
              
              <div className="mt-10 flex justify-center">
                <div className="relative w-40 h-40 flex items-center justify-center">
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-sage-500 rounded-full" 
                   />
                   <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-6 border border-sage-400 rounded-full" 
                   />
                   <Brain className="text-sage-200" size={56} />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
