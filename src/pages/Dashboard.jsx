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
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-sage-900 tracking-tight mb-2">
              Hello, {user?.name?.split(' ')[0] || 'Traveler'}
            </h1>
            <p className="text-sage-500 font-medium text-lg">Every reflection brings you closer to clarity.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleLogout} className="h-14 w-14 p-0 rounded-xl flex items-center justify-center">
              <LogOut size={20} />
            </Button>
            <Button onClick={() => navigate('/journal')} className="h-14 px-8 rounded-xl shadow-lg text-lg">
              <Plus size={22} className="mr-2" /> New Entry
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           <div className="lg:col-span-2 space-y-8">
              {/* Mood Trend Chart */}
              <GlassCard className="p-8 h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-sage-900">Emotional Trends</h2>
                    <p className="text-sage-400 text-xs font-medium uppercase tracking-widest mt-1">Activity over distance</p>
                  </div>
                  <TrendingUp className="text-sage-400" size={20} />
                </div>
                
                <div className="flex-1 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analysisData}>
                      <defs>
                        <linearGradient id="colorClarity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#313a37" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#313a37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f2f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8ea199', fontSize: 11}} dy={10} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)'}}
                        itemStyle={{fontFamily: 'Inter', fontWeight: 600, fontSize: '13px'}}
                      />
                      <Area type="monotone" dataKey="clarity" stroke="#313a37" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClarity)" />
                      <Area type="monotone" dataKey="energy" stroke="#8ea199" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              {/* Stats & Daily Affirmation Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DailyAffirmation />
                  <div className="grid grid-rows-2 gap-4">
                    {stats.slice(0, 2).map((stat, i) => (
                      <GlassCard key={i} className="flex items-center gap-6 p-6 group">
                        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center shadow-lg shadow-sage-900/5`}>
                          {stat.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-sage-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-xl font-bold text-sage-900">{stat.value}</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
              </div>
           </div>

           {/* Sidebar: Recent Reflections & Insight of the Day */}
           <div className="space-y-8">
              <section className="space-y-6">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xl font-bold text-sage-900">Past Entries</h2>
                  <button onClick={() => navigate('/journal')} className="text-sage-400 font-medium text-sm hover:text-sage-800 flex items-center gap-1 transition-colors">
                    Journal <ArrowRight size={14} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    [1,2,3].map(i => <div key={i} className="h-16 animate-pulse glass rounded-2xl" />)
                  ) : entries.length > 0 ? (
                    entries.map((entry, index) => (
                      <GlassCard 
                        key={index} 
                        delay={index * 0.05} 
                        className="group cursor-pointer hover:bg-white/80 transition-all border-sage-50/50 p-5"
                        onClick={() => navigate('/analysis')}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-sage-400 uppercase tracking-widest">
                            {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[9px] font-bold text-sage-700 bg-sage-50 px-2 py-0.5 rounded-full uppercase">
                            {entry.sentiment || 'Reflective'}
                          </span>
                        </div>
                        <h3 className="font-medium text-sage-800 group-hover:text-sage-950 transition-colors line-clamp-1 text-sm">
                          {entry.content}
                        </h3>
                      </GlassCard>
                    ))
                  ) : (
                    <div className="py-12 text-center glass rounded-3xl border-dashed border-sage-100">
                      <p className="text-sage-400 text-sm font-medium">Your journey starts with a word.</p>
                    </div>
                  )}
                </div>
              </section>

              <GlassCard className="bg-sage-900 text-white p-8 border-none relative overflow-hidden group">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-white">Daily Pattern</h3>
                    <p className="text-sage-400 font-medium leading-relaxed text-sm">
                      "You've shown significant resilience lately. Keep focusing on your progress."
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => navigate('/analysis')} className="text-sage-300 hover:text-white border-none p-0 h-auto justify-start self-start transition-all">
                    Full Analysis <ArrowRight size={16} className="ml-2" />
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
