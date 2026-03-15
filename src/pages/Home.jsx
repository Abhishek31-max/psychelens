import { motion } from 'framer-motion';
import { Sparkles, Brain, Shield, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Button from '../components/Button.jsx';
import GlassCard from '../components/GlassCard.jsx';

const Home = () => {
  const features = [
    {
      icon: <Sparkles className="text-sage-600" />,
      title: "AI Insights",
      description: "Deep psychological understanding derived from your daily reflections."
    },
    {
      icon: <Brain className="text-sage-600" />,
      title: "Insight Maps",
      description: "Visualize the landscape of your mind with interactive clusters."
    },
    {
      icon: <Shield className="text-sage-600" />,
      title: "Privacy First",
      description: "Your data is encrypted and secure, designed for ultimate peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-sage-50 Selection:bg-sage-200">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-sage-600 text-sm font-medium mb-8"
          >
            <Sparkles size={16} />
            <span>Discover your inner clarity</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display tracking-tight text-sage-900 mb-8 leading-tight"
          >
            Reflect, Understand, <br />
            <span className="text-gradient italic font-serif">Deepen Clarity.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-serif italic text-sage-600 max-w-2xl mx-auto mb-12 leading-relaxed opacity-80"
          >
            A neural bridge between your thoughts and psychological growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button className="h-16 px-10 text-xl rounded-2xl shadow-2xl shadow-sage-900/20">
              Begin Journey <ArrowRight size={20} />
            </Button>
            <Button variant="secondary" className="h-16 px-10 text-xl rounded-2xl">
              Explore Calm
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-display text-sage-900 mb-4">The Pillars of Insight</h2>
            <p className="text-sage-500 font-serif italic">Tools designed for the evolving mind.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <GlassCard key={index} delay={0.2 * index} className="text-center p-10 group hover:border-sage-300 transition-all hover:-translate-y-2">
                <div className="w-20 h-20 rounded-3xl bg-white/60 flex items-center justify-center mx-auto mb-8 group-hover:bg-sage-100 transition-colors shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display text-sage-900 mb-4">{feature.title}</h3>
                <p className="text-sage-600 leading-relaxed font-sans opacity-80">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Accent */}
      <div className="fixed bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-sage-200/20 blur-[120px] rounded-[100%] pointer-events-none -z-10" />
    </div>
  );
};

export default Home;
