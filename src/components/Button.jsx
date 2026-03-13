import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-sage-800 text-sage-50 hover:bg-sage-700 shadow-lg',
    secondary: 'glass text-sage-800 hover:bg-sage-200/50',
    outline: 'border-2 border-sage-300 text-sage-700 hover:bg-sage-100',
    ghost: 'text-sage-600 hover:bg-sage-100/50'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
