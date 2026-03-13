import { motion } from 'framer-motion';
import { Plus, Book, TrendingUp, Calendar, ArrowRight, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { journalAPI } from '../api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchEntries();
  }, [navigate]);

  const fetchEntries = async () => {
    try {
      const { data } = await journalAPI.getEntries();
      setEntries(data.slice(0, 3)); // Get recent 3
    } catch (err) {
      console.error('Failed to fetch entries', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  const stats = [
    { label: 'Journal Entries', value: entries.length > 0 ? entries.length : '0', icon: <Book size={20} /> },
    { label: 'Mindful Days', value: '4', icon: <Activity size={20} /> },
    { label: 'Insight Clusters', value: '3', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col pt-12">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-sage-900 tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}.
            </h1>
            <p className="text-sage-600 mt-2 text-lg">Your psychological landscape is evolving beautifully.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={handleLogout} className="h-14 px-6">
              <LogOut size={20} />
            </Button>
            <Button onClick={() => navigate('/journal')} className="h-14 px-8 shadow-xl shadow-sage-900/10">
              <Plus size={20} /> New Reflection
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <GlassCard key={index} delay={index * 0.1} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sage-800 text-sage-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-sage-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-bold text-sage-900">{stat.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reflections */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-sage-800">Recent Reflections</h2>
              <button onClick={() => navigate('/journal')} className="text-sage-500 font-semibold hover:text-sage-700 flex items-center gap-1 transition-colors">
                View All <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <p className="text-sage-400 p-8 text-center glass rounded-2xl">Loading reflections...</p>
              ) : entries.length > 0 ? (
                entries.map((entry, index) => (
                  <GlassCard key={index} delay={index * 0.15} className="group cursor-pointer hover:border-sage-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-xs font-bold text-sage-400 bg-sage-100 px-3 py-1 rounded-full uppercase">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        <h3 className="font-bold text-sage-900 group-hover:text-sage-800 transition-colors truncate max-w-[200px]">
                          {entry.content.substring(0, 30)}...
                        </h3>
                      </div>
                      <span className="text-sm text-sage-500 italic">Mood: {entry.sentiment}</span>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <div className="p-12 text-center glass rounded-3xl border-dashed border-sage-200">
                  <p className="text-sage-400 font-medium">No reflections yet. Begin your journey today.</p>
                </div>
              )}
            </div>
          </section>

          {/* Quick Insights Map Preview */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-sage-800 px-2">Quick Insights</h2>
            <GlassCard className="h-[320px] bg-sage-900 text-sage-50 overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 left-10 w-24 h-24 bg-sage-400 blur-3xl rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-sage-200 blur-3xl rounded-full animate-pulse delay-700" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between p-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <TrendingUp className="text-sage-300" /> Current Theme
                  </h3>
                  <p className="text-sage-400">Your reflections are coalescing around "Resilient Growth".</p>
                </div>
                
                <div className="glass-dark p-6 rounded-2xl">
                  <p className="text-sage-300 italic text-sm">
                    "Transitions are not endings, but intersections of possibility."
                  </p>
                </div>

                <Button variant="ghost" className="text-sage-400 hover:text-white mt-4 border-none group-hover:translate-x-1 transition-transform">
                  Deep Dive into Map <ArrowRight size={18} />
                </Button>
              </div>
            </GlassCard>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
