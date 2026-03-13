import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import Navbar from '../components/Navbar';
import { authAPI } from '../api';

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
    <div className="min-h-screen bg-sage-50 Selection:bg-sage-200 flex flex-col pt-12">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sage-200/30 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sage-300/20 blur-[120px] rounded-full -z-10" />

        <GlassCard className="w-full max-w-md p-8 md:p-10 border-sage-200/50">
          <div className="text-center mb-10">
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sage-800 text-sage-50 mb-6 shadow-xl"
            >
              <Sparkles size={32} />
            </motion.div>
            <h2 className="text-3xl font-bold text-sage-900 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join PsycheLens'}
            </h2>
            <p className="text-sage-600 mt-2">
              {isLogin ? 'Continue your journey of self-discovery' : 'Begin your evolution today'}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle size={18} /> {error}
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-semibold text-sage-700 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" size={20} />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/50 border border-sage-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-sage-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/50 border border-sage-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-sage-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400 group-focus-within:text-sage-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/50 border border-sage-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:bg-white transition-all text-sage-900 font-medium placeholder:text-sage-400"
                />
              </div>
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg mt-6 shadow-xl shadow-sage-900/10"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={20} />}
            </Button>
          </form>

          <p className="text-center mt-8 text-sage-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="ml-2 font-bold text-sage-800 hover:text-sage-950 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Auth;
