
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation, useMatch } from 'react-router-dom';
import { PROJECTS, GLOBAL_STYLES } from './constants';
import { Project } from './types';
import { Header, NavDots } from './components/Layout';
import ProjectDetail from './components/ProjectDetail';
import BioSection from './components/BioSection';
import TestimonialsSection from './components/TestimonialsSection';
import GeminiAssistant from './components/GeminiAssistant';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navigate = useNavigate();
  const match = useMatch('/project/:id');
  const activeProjectId = match?.params.id;
  const activeProject = activeProjectId ? PROJECTS.find(p => p.id === parseInt(activeProjectId)) : null;

  const currentProject = PROJECTS[currentIndex];
  const lastScrollTime = useRef(Date.now());

  const handleNavigate = useCallback((index: number) => {
    if (index === currentIndex || isAnimating || activeProject) return;
    setDirection(index > currentIndex ? 'down' : 'up');
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [currentIndex, isAnimating, activeProject]);

  const handleScroll = useCallback((e: WheelEvent) => {
    if (activeProject) return;
    const now = Date.now();
    if (now - lastScrollTime.current < 1200 || isAnimating) return;
    
    const delta = e.deltaY;
    if (delta > 30 && currentIndex < PROJECTS.length - 1) {
      handleNavigate(currentIndex + 1);
    } else if (delta < -30 && currentIndex > 0) {
      handleNavigate(currentIndex - 1);
    }
    lastScrollTime.current = now;
  }, [currentIndex, isAnimating, handleNavigate, activeProject]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  const transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="relative w-full h-screen cinematic-grain overflow-hidden">
      <style>{GLOBAL_STYLES}</style>
      
      <AnimatePresence>
        {activeProject && (
          <ProjectDetail 
            key="detail"
            project={activeProject} 
            onBack={() => navigate('/')} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="absolute inset-0 z-0 transition-colors duration-[1.2s]" 
        style={{ backgroundColor: currentProject.backgroundColor }}
      />
      
      <Header 
        textColor={currentProject.textColor} 
        onNavigate={handleNavigate} 
        currentIndex={currentIndex}
      />
      
      <main className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            initial={{ opacity: 0, y: direction === 'down' ? 100 : -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'down' ? -100 : 100 }}
            transition={transition}
            className="w-full h-full flex items-center"
          >
            {currentProject.type === 'bio' ? (
              <BioSection />
            ) : currentProject.type === 'testimonials' ? (
              <TestimonialsSection />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-7xl mx-auto px-10">
                <div className="flex flex-col space-y-8">
                  <h1 
                    className="font-sans font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-[18ch]"
                    style={{ color: currentProject.textColor }}
                  >
                    {currentProject.title}
                  </h1>
                  <p 
                    className="text-lg opacity-80 max-w-md font-medium"
                    style={{ color: currentProject.textColor }}
                  >
                    {currentProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 py-2">
                    {currentProject.tags?.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-6 py-2 rounded-full text-[0.65rem] font-bold tracking-[0.15em] border border-current bg-white/5 backdrop-blur-md uppercase transition-all hover:bg-white/10"
                        style={{ color: currentProject.textColor, borderColor: `${currentProject.textColor}25` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/project/${currentProject.id}`)}
                    className="flex flex-col gap-2 w-fit group"
                    style={{ color: currentProject.textColor }}
                  >
                    <div className="flex items-center gap-6 font-bold tracking-[0.2em] text-[0.75rem] uppercase">
                      {currentProject.cta}
                      <span className="text-lg leading-none transition-transform group-hover:translate-x-2">→</span>
                    </div>
                    <div 
                      className="h-[1px] w-full bg-current opacity-40 transition-all group-hover:opacity-100 group-hover:h-[1.5px]"
                    />
                  </motion.button>
                </div>

                <div className="relative aspect-[4/3] w-full hidden lg:flex items-center justify-center">
                  <motion.div 
                    className="relative w-full h-full perspective-1000 group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      animate={{ 
                        rotateY: [-5, 5],
                        rotateX: [2, -2],
                        y: [-10, 10]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        repeatType: 'reverse', 
                        ease: 'easeInOut' 
                      }}
                      className="w-full h-full"
                    >
                      <img 
                        src={currentProject.images[0]} 
                        className="w-full h-full object-cover rounded-xl shadow-2xl border-8 border-white/5" 
                        alt={currentProject.title}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <NavDots 
        projects={PROJECTS} 
        currentIndex={currentIndex} 
        onNavigate={handleNavigate}
        isHovered={isNavHovered}
        onHoverChange={setIsNavHovered}
      />

      {currentIndex === 0 && !activeProject && (
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-30"
          style={{ color: currentProject.textColor }}
        >
          <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      )}

      {!currentProject.type && !activeProject && (
        <GeminiAssistant 
          project={currentProject} 
          textColor={currentProject.textColor} 
          accentColor={currentProject.accentColor} 
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/:id" element={<Portfolio />} />
    </Routes>
  );
};

export default App;
