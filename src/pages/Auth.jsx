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
        <GlassCard className="w-full max-w-md p-8 md:p-12 border-sage-100 bg-white/80 shadow-xl shadow-sage-900/5 relative z-10">
          <div className="text-center mb-10">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sage-900 text-white mb-6 shadow-lg"
            >
              <Sparkles size={28} />
            </motion.div>
            <h2 className="text-3xl font-bold text-sage-900 tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Join PsycheLens'}
            </h2>
            <p className="text-sage-500 text-sm font-medium">
              {isLogin ? 'Continue your journey of inner clarity' : 'Start your evolution today'}
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-700 transition-colors" size={20} />
                    <input 
                      type="text" 
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/50 border border-sage-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-700 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/50 border border-sage-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-sage-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-300 group-focus-within:text-sage-700 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/50 border border-sage-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-200 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-300"
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg mt-6 rounded-xl shadow-lg active:scale-[0.98] transition-all"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={20} className="ml-2" />}
            </Button>
          </form>

          <p className="text-center mt-10 text-sage-500 text-sm font-medium">
            {isLogin ? "New to PsycheLens?" : "Already have an account?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="ml-2 font-bold text-sage-900 hover:text-sage-700 transition-colors"
            >
              {isLogin ? 'Join now' : 'Log In'}
            </button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Auth;
