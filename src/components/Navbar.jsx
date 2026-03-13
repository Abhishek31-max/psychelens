import { motion } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Journal', href: '/journal' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Analysis', href: '/analysis' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-sage-800 rounded-xl flex items-center justify-center text-sage-50">
            <Camera size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-sage-900">PsycheLens</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sage-600 hover:text-sage-900 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2 rounded-full font-medium"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-sage-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-3xl p-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg text-sage-700 font-medium border-b border-sage-200 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            onClick={() => {
              navigate('/auth');
              setIsOpen(false);
            }} 
            className="w-full h-12"
          >
            Get Started
          </Button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
