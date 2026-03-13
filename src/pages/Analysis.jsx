import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, Brain, Cloud, Sun, Map } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { journalAPI } from '../api/index.js';

const Analysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const { data: analysisData } = await journalAPI.getAnalysis();
      setData(analysisData);
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
    <div className="min-h-screen bg-sage-50 flex flex-col pt-12">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-sage-900 tracking-tight">Emotional Rhythms</h1>
          <p className="text-sage-600 mt-2 text-lg">Uncovering the geometric patterns of your psyche.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <GlassCard className="lg:col-span-2 p-8 h-[500px] flex flex-col">
            <h2 className="text-xl font-bold text-sage-800 mb-8 flex items-center gap-2">
              <Sun className="text-sage-500" /> Clarity & Energy Trends
            </h2>
            <div className="flex-1 w-full flex items-center justify-center">
              {loading ? (
                <p className="text-sage-400 animate-pulse">Analyzing landscapes...</p>
              ) : data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4c5e4c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4c5e4c" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8d9b8d" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8d9b8d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '16px', 
                      border: '1px solid #e5e7eb',
                      backdropFilter: 'blur(8px)'
                    }} 
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                  <Area 
                    type="monotone" 
                    dataKey="clarity" 
                    stroke="#4c5e4c" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorClarity)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#8d9b8d" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorEnergy)" 
                    strokeDasharray="5 5"
                  />
                </AreaChart>
              </ResponsiveContainer>
              ) : (
                <p className="text-sage-400 text-center italic">Insufficient data for rhythmic mapping. Keep reflecting.</p>
              )}
            </div>
          </GlassCard>

          {/* Theme Distribution */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-sage-800 px-2 flex items-center gap-2">
              <Sparkles className="text-sage-500" /> Insight Clusters
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {themes.map((theme, index) => (
                <GlassCard key={index} delay={index * 0.1} className="p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sage-900">{theme.title}</span>
                    <span className="text-xs font-bold text-sage-500">{theme.weight}% Resonance</span>
                  </div>
                  <div className="w-full h-2 bg-sage-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${theme.weight}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full ${theme.color}`}
                    />
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="bg-sage-900 text-sage-50 border-none p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Map size={20} className="text-sage-300" /> Thematic Map
              </h3>
              <p className="text-sage-400 text-sm leading-relaxed">
                Your psyche is currently gravitating towards <span className="text-white font-semibold">Integrity</span> and <span className="text-white font-semibold">Purpose</span>.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <div className="absolute inset-0 border border-sage-700 rounded-full animate-ping opacity-20" />
                   <div className="absolute inset-3 border border-sage-600 rounded-full animate-pulse opacity-40" />
                   <Brain className="text-sage-300" size={40} />
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
