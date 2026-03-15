import { motion } from 'framer-motion';
import { Sparkles, Menu, X, Wind } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import BreathingMode from './BreathingMode.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Journal', href: '/journal' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto glass rounded-[2rem] px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 bg-sage-900 rounded-2xl flex items-center justify-center text-sage-50 group-hover:rotate-12 transition-transform">
              <Sparkles size={24} />
            </div>
            <span className="text-2xl font-display tracking-tight text-sage-900">PsycheLens</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sage-600 hover:text-sage-900 font-serif italic text-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={() => setIsBreathingOpen(true)}
              className="flex items-center gap-2 text-sage-500 hover:text-sage-800 transition-colors px-4 border-l border-sage-200"
            >
              <Wind size={20} />
              <span className="font-medium">Breathe</span>
            </button>

            <Button 
              onClick={() => navigate('/auth')}
              className="px-8 py-3 rounded-2xl font-semibold shadow-xl shadow-sage-900/10"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-sage-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-[2.5rem] p-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-2xl text-sage-900 font-display border-b border-sage-100 pb-4"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsBreathingOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-4 text-2xl text-sage-600 font-display"
            >
              <Wind size={28} /> Breathe
            </button>
            <Button 
              onClick={() => {
                navigate('/auth');
                setIsOpen(false);
              }} 
              className="w-full h-16 text-xl rounded-2xl"
            >
              Get Started
            </Button>
          </motion.div>
        )}
      </nav>

      <BreathingMode 
        isOpen={isBreathingOpen} 
        onClose={() => setIsBreathingOpen(false)} 
      />
    </>
  );
};

export default Navbar;
