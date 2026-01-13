import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import { PROJECTS, GLOBAL_STYLES } from './constants';
import { Project } from './types';
import { Header, NavDots } from './components/Layout';
import ProjectDetail from './components/ProjectDetail';
import BioSection from './components/BioSection';
import TestimonialsSection from './components/TestimonialsSection';
import GeminiAssistant from './components/GeminiAssistant';
import Hero from './components/Hero';
import { ChevronDown } from 'lucide-react';

const ImageStack: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const commonRotate = { rotate: 12, rotateY: -12 };
  const projectsWithImages = PROJECTS.filter(p => [1, 2, 3].includes(p.id));

  // Diagonal stack positions (matching lyna_page style)
  // Center image at y=0, previous above-right, next below-left
  const deltaY = 460; // Vertical spacing between images
  const deltaX = -120; // Horizontal offset for diagonal effect

  // Step calculation - hero is index 0, projects start at index 1
  const step = 1 / (PROJECTS.length - 1);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {projectsWithImages.map((project, index) => {
          // Project indices in PROJECTS array: 1, 2, 3
          // Corresponding scroll progress: step*1, step*2, step*3
          const projectIndexInMain = project.id; // 1, 2, or 3
          const targetProgress = projectIndexInMain * step;

          // Calculate Y position based on scroll
          const y = useTransform(scrollProgress, (val: number) => {
            const diff = (targetProgress - val) / step;
            return diff * deltaY;
          });

          // X offset for diagonal effect
          const x = useTransform(y, (yVal: number) => {
            return (yVal / deltaY) * deltaX;
          });

          // Distance from center for opacity/scale
          const distance = useTransform(y, (val: number) => Math.abs(val));

          // More visible images - higher opacity for non-centered
          const opacity = useTransform(distance, [0, 300, 600], [1, 0.7, 0.3]);
          const scale = useTransform(distance, [0, 500], [1, 0.85]);
          const zIndex = useTransform(distance, [0, 100, 500], [10, 5, 1]);

          return (
            <motion.div
              key={project.id}
              className="absolute w-[600px] h-[420px] rounded-lg overflow-hidden origin-center"
              style={{
                x,
                y,
                opacity,
                scale,
                zIndex,
                ...commonRotate,
                transformStyle: 'preserve-3d',
                boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [-15, 15] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              >
                <img
                  src={project.images[0]}
                  className="w-full h-full object-cover rounded-lg"
                  alt={project.title}
                  loading="eager"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const match = useMatch('/project/:id');
  const activeProjectId = match?.params.id;
  const activeProject = activeProjectId ? PROJECTS.find(p => p.id === parseInt(activeProjectId)) : null;

  // --- Scroll Logic ---
  const { scrollYProgress } = useScroll();

  // Use a spring to smooth out the scroll progress for animation values
  // This gives the "continuous smooth velocity" feel the user asked for
  // Much faster physics (less damping, higher stiffness)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120, // Tuned for responsive but smooth tracking
    damping: 25,
    restDelta: 0.001
  });

  // Calculate generic direction for text transitions
  const prevProgress = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  // Logic to determine which project is "active" based on scroll position
  // We divide the total scroll range into segments
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Dynamic step based on PROJECTS length
    const step = 1 / (PROJECTS.length - 1);
    const newIndex = Math.min(Math.round(latest / step), PROJECTS.length - 1);

    if (latest > prevProgress.current) setDirection('down');
    else if (latest < prevProgress.current) setDirection('up');
    prevProgress.current = latest;

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  });

  const currentProject = PROJECTS[currentIndex];

  // Manual navigation (clicking dots)
  const handleNavigate = useCallback((index: number) => {
    if (activeProject) return;
    const step = 1 / (PROJECTS.length - 1);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = index * step * totalHeight;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, [activeProject]);

  const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

  return (
    // 600vh container to provide enough track for scrolling naturally
    <div className="relative w-full h-[600vh]">
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

      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ backgroundColor: currentProject.backgroundColor }}
          transition={{ duration: 1 }}
        />

        <Header
          textColor={currentProject.textColor}
          onNavigate={handleNavigate}
          currentIndex={currentIndex}
        />

        <main className="relative z-10 w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            {currentProject.type === 'hero' ? (
              <motion.div
                key="hero"
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={transition}
                className="w-full h-full"
              >
                <Hero />
              </motion.div>
            ) : currentProject.type === 'bio' || currentProject.type === 'testimonials' ? (
              <motion.div
                key={currentProject.id}
                custom={direction}
                initial={{ opacity: 0, y: direction === 'down' ? 50 : -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction === 'down' ? -50 : 50 }}
                transition={transition}
                className="w-full h-full flex items-center"
              >
                {currentProject.type === 'bio' ? <BioSection /> : <TestimonialsSection />}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center w-full max-w-7xl mx-auto px-10 h-full">
                {/* Left Side: TEXT (Discrete Transitions) */}
                <div className="flex flex-col justify-center h-full">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentProject.id}
                      custom={direction}
                      initial={{ opacity: 0, y: direction === 'down' ? 40 : -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: direction === 'down' ? -40 : 40 }}
                      transition={transition}
                      className="flex flex-col space-y-8"
                    >
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
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Side: IMAGES (Continuous Smooth Scroll) */}
                <div className="relative aspect-[4/3] w-full hidden lg:flex items-center justify-center overflow-visible">
                  <ImageStack scrollProgress={smoothProgress} />
                </div>
              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Navigation Dots (Continuous) */}
        <NavDots
          projects={PROJECTS}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
          isHovered={false}
          onHoverChange={() => { }}
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
