import { motion } from 'framer-motion';
import { Plus, Book, TrendingUp, Calendar, ArrowRight, Activity, LogOut, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar.jsx';
import Button from '../components/Button.jsx';
import GlassCard from '../components/GlassCard.jsx';
import DailyAffirmation from '../components/DailyAffirmation.jsx';
import { journalAPI } from '../api/index.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [{ data: entryData }, { data: chartData }] = await Promise.all([
        journalAPI.getEntries(),
        journalAPI.getAnalysis()
      ]);
      setEntries(entryData.slice(0, 4));
      setAnalysisData(chartData);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const stats = [
    { label: 'Total Reflections', value: entries.length, icon: <Book size={24} />, color: 'bg-sage-800' },
    { label: 'Mindful Streak', value: '4 days', icon: <Heart size={24} />, color: 'bg-accent-lavender text-sage-900' },
    { label: 'Insight Clusters', value: '3', icon: <Activity size={24} />, color: 'bg-white text-sage-900' },
  ];

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col pt-16 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-display text-sage-900 tracking-tight leading-tight mb-4 text-balance">
              Welcome back, <span className="italic font-serif">{user?.name?.split(' ')[0] || 'Traveler'}</span>.
            </h1>
            <p className="text-sage-500 font-serif italic text-xl opacity-80">"The journey of growth is paved with reflections."</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleLogout} className="h-16 w-16 p-0 rounded-2xl flex items-center justify-center">
              <LogOut size={24} />
            </Button>
            <Button onClick={() => navigate('/journal')} className="h-16 px-8 rounded-2xl shadow-xl shadow-sage-900/10 text-lg">
              <Plus size={24} className="mr-2" /> New Reflection
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           <div className="lg:col-span-2 space-y-8">
              {/* Mood Trend Chart */}
              <GlassCard className="p-8 h-[450px] flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-2xl font-display text-sage-900">Mood Evolution</h2>
                    <p className="text-sage-400 font-serif italic text-sm">Visualizing your emotional landscape over the past week.</p>
                  </div>
                  <TrendingUp className="text-sage-400" size={24} />
                </div>
                
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysisData}>
                      <defs>
                        <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2c3422" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2c3422" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8d9484" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#8d9484" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e6e0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8d9484', fontSize: 12}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{backgroundColor: 'white', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)'}}
                        itemStyle={{fontFamily: 'Inter', fontWeight: 600, fontSize: '13px'}}
                      />
                      <Area type="monotone" dataKey="clarity" stroke="#2c3422" strokeWidth={3} fillOpacity={1} fill="url(#colorClarity)" />
                      <Area type="monotone" dataKey="energy" stroke="#8d9484" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Stats & Daily Affirmation Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DailyAffirmation />
                  <div className="grid grid-rows-2 gap-4">
                    {stats.slice(0, 2).map((stat, i) => (
                      <GlassCard key={i} className="flex items-center gap-6 p-6 group hover:translate-x-1 transition-transform">
                        <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg shadow-sage-900/5`}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-sage-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-2xl font-display text-sage-900">{stat.value}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
              </div>
           </div>

           {/* Sidebar: Recent Reflections & Insight of the Day */}
           <div className="space-y-8">
              <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-2xl font-display text-sage-900">Recent Reflections</h2>
                  <button onClick={() => navigate('/journal')} className="text-sage-400 font-serif italic hover:text-sage-800 flex items-center gap-1 transition-colors">
                    View Journal <ArrowRight size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    [1,2,3].map(i => <div key={i} className="h-20 animate-pulse glass rounded-3xl" />)
                  ) : entries.length > 0 ? (
                    entries.map((entry, index) => (
                      <GlassCard 
                        key={index} 
                        delay={index * 0.1} 
                        className="group cursor-pointer hover:bg-white/60 transition-all border-sage-100/50"
                        onClick={() => navigate('/analysis')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-tighter">
                            {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] font-bold text-sage-800 bg-sage-100 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                            {entry.sentiment || 'Reflective'}
                          </span>
                        </div>
                        <h3 className="font-serif italic text-sage-900 group-hover:text-sage-950 transition-colors line-clamp-1">
                          {entry.content}
                        </h3>
                      </GlassCard>
                    ))
                  ) : (
                    <div className="p-12 text-center glass rounded-[2.5rem] border-dashed border-sage-200">
                      <p className="text-sage-400 font-serif italic">Your story begins here.</p>
                    </div>
                  )}
                </div>
              </section>

              <GlassCard className="bg-sage-900 text-white p-8 border-none relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sage-400/20 blur-[50px] rounded-full" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="mb-8">
                    <h3 className="text-2xl font-display mb-4 text-sage-100">Reflection Insight</h3>
                    <p className="text-sage-400 font-serif italic leading-relaxed text-lg">
                      "You seem to be navigating a period of significant Resilience. Your recent journal entries suggest a growing sense of inner equilibrium."
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => navigate('/analysis')} className="text-sage-300 hover:text-white border-sage-800 p-0 h-auto justify-start self-start group-hover:translate-x-2 transition-transform">
                    Unlock deeper analysis <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </GlassCard>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
