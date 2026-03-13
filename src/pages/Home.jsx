import { motion } from 'framer-motion';
import { Sparkles, Brain, Shield, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

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
            className="text-5xl md:text-7xl font-bold tracking-tight text-sage-900 mb-6 leading-tight"
          >
            Reflect, Understand, <br />
            <span className="text-gradient">Evolve with AI.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-sage-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The world's first AI-powered neural journal that translates your thoughts 
            into visual patterns of growth and emotional intelligence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button className="h-14 px-8 text-lg">
              Start Free Trial <ArrowRight size={20} />
            </Button>
            <Button variant="secondary" className="h-14 px-8 text-lg">
              View Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} delay={0.2 * index} className="text-center group hover:border-sage-300 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-white/50 flex items-center justify-center mx-auto mb-6 group-hover:bg-sage-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-sage-900 mb-3">{feature.title}</h3>
                <p className="text-sage-600 leading-relaxed">
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
