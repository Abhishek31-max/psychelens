import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import GlassCard from '../components/GlassCard.jsx';
import Navbar from '../components/Navbar.jsx';
import { authAPI } from '../api/index.js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = isLogin 
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.signup(formData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, id: data.userId }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50/50 flex flex-col pt-16 font-sans Selection:bg-sage-200">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-8 py-24 relative overflow-hidden">
        <GlassCard className="w-full max-w-lg p-12 md:p-16 border-sage-100 bg-white/60 shadow-2xl shadow-sage-900/5 relative z-10">
          <div className="text-center mb-12">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-sage-900 text-white mb-8 shadow-2xl shadow-sage-900/20"
            >
              <Sparkles size={36} />
            </motion.div>
            <h2 className="text-5xl font-display text-sage-900 tracking-tight leading-tight mb-4">
              {isLogin ? 'Welcome ' : 'Begin '} 
              <span className="italic font-serif">Deeply</span>.
            </h2>
            <p className="text-sage-500 font-serif italic text-lg opacity-80">
              {isLogin ? 'Continue your journey of inner clarity' : 'Start your evolution with neural journaling'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-8 p-5 rounded-2xl bg-red-50 text-red-700 border border-red-100 flex items-center gap-4 text-sm font-medium"
              >
                <AlertCircle size={20} /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <label className="text-sm font-bold text-sage-400 uppercase tracking-widest ml-1">The Name You Carry</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-900 transition-colors" size={22} />
                    <input 
                      type="text" 
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/40 border border-sage-100 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-sage-100 focus:bg-white focus:border-sage-200 transition-all text-sage-900 font-serif italic text-xl placeholder:text-sage-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <label className="text-sm font-bold text-sage-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-900 transition-colors" size={22} />
                <input 
                  type="email" 
                  required
                  placeholder="name@vision.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/40 border border-sage-100 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-sage-100 focus:bg-white focus:border-sage-200 transition-all text-sage-900 font-serif italic text-xl placeholder:text-sage-300"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-sage-400 uppercase tracking-widest ml-1">Private Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-900 transition-colors" size={22} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/40 border border-sage-100 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-sage-100 focus:bg-white focus:border-sage-200 transition-all text-sage-900 font-medium text-xl placeholder:text-sage-300"
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-16 text-xl mt-8 rounded-2xl shadow-2xl shadow-sage-900/10 active:scale-95 transition-transform"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In & Reflect' : 'Create Destiny')}
              {!loading && <ArrowRight size={22} className="ml-2" />}
            </Button>
          </form>

          <p className="text-center mt-12 text-sage-500 font-serif italic text-lg">
            {isLogin ? "New to the path?" : "Already part of the collective?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="ml-3 font-semibold text-sage-900 hover:text-sage-700 transition-colors not-italic font-sans"
            >
              {isLogin ? 'Join us ' : 'Log In '} &rarr;
            </button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Auth;
