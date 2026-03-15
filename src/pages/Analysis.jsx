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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-sage-900 tracking-tight mb-2">
            Evolution <span className="text-sage-400">&</span> Trends
          </h1>
          <p className="text-sage-500 font-medium text-lg">Visualizing the patterns of your emotional journey.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Chart */}
          <GlassCard className="lg:col-span-2 p-8 h-[500px] flex flex-col group">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-sage-900 flex items-center gap-3">
                <Sun className="text-sage-400" size={20} /> Clarity & Energy
              </h2>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-sage-400">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-sage-800" /> Clarity</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-sage-400" /> Energy</div>
              </div>
            </div>
            
            <div className="flex-1 w-full relative">
              {loading ? (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-sage-100 border-t-sage-600 rounded-full animate-spin" />
                </div>
              ) : data.length > 0 ? (
                <ChartErrorBoundary>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3a4541" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3a4541" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '12px', 
                          border: '1px solid #eef2f0',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                          padding: '12px'
                        }} 
                        itemStyle={{fontFamily: 'Inter', fontWeight: 600, fontSize: '13px'}}
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8ea199', fontSize: 11}} dy={10} />
                      <YAxis hide />
                      <Area 
                        type="monotone" 
                        dataKey="clarity" 
                        stroke="#3a4541" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorClarity)" 
                        animationDuration={1500}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="energy" 
                        stroke="#8ea199" 
                        strokeWidth={2}
                        fill="transparent" 
                        strokeDasharray="6 6"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartErrorBoundary>
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-sage-50/50 rounded-2xl border border-dashed border-sage-100">
                  <p className="text-sage-400 font-medium text-center px-8">Complete more reflections to see your trends.</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Theme Distribution */}
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-sage-900 px-1 flex items-center gap-3">
              <Sparkles className="text-sage-400" size={20} /> Major Themes
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {themes.map((theme, index) => (
                <GlassCard key={index} delay={index * 0.05} className="p-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sage-800">{theme.title}</span>
                    <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">{theme.weight}%</span>
                  </div>
                  <div className="w-full h-1 bg-sage-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${theme.weight}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${theme.color} rounded-full`}
                    />
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="bg-sage-900 text-white border-none p-8 relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Map size={24} className="text-sage-400" /> Current Focus
              </h3>
              <p className="text-sage-300 font-medium leading-relaxed opacity-90 text-sm">
                Your recent thoughts align strongly with <span className="text-white font-bold">Resilience</span> and <span className="text-white font-bold">Personal Growth</span>.
              </p>
              
              <div className="mt-8 flex justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 border border-sage-600 rounded-full" 
                   />
                   <Brain className="text-sage-700" size={40} />
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
