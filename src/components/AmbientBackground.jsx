import { motion } from 'framer-motion';

const AmbientBackground = () => {
  const shapes = [
    { size: 'w-64 h-64', color: 'bg-sage-200/20', top: '10%', left: '5%' },
    { size: 'w-96 h-96', color: 'bg-accent-lavender/10', top: '60%', right: '10%' },
    { size: 'w-[500px] h-[500px]', color: 'bg-sage-300/10', bottom: '-10%', left: '20%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-sage-50">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[80px] ${shape.size} ${shape.color}`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Grainy texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default AmbientBackground;
