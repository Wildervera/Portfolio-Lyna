import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

import { PROJECTS } from './data/projects';
import { GLOBAL_STYLES } from './styles/global';
import {
  Header,
  NavDots,
  Hero,
  TestimonialsSection,
  ProjectDetail
} from './components';
import { About, Projects as ProjectsPage } from './pages';

const ImageStack: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const commonRotate = { rotate: 12, rotateY: -12 };
  const projectsWithImages = PROJECTS.filter(p => [1, 2, 3].includes(p.id));

  const deltaY = 460;
  const deltaX = -120;
  const step = 1 / (PROJECTS.length - 1);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {projectsWithImages.map((project, index) => {
          const projectIndexInMain = project.id;
          const targetProgress = projectIndexInMain * step;

          const y = useTransform(scrollProgress, (val: number) => {
            const diff = (targetProgress - val) / step;
            return diff * deltaY;
          });

          const x = useTransform(y, (yVal: number) => {
            return (yVal / deltaY) * deltaX;
          });

          const distance = useTransform(y, (val: number) => Math.abs(val));
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

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001
  });

  const prevProgress = useRef(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
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
    <div className="relative w-full h-[300vh]">
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
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ backgroundColor: currentProject.backgroundColor }}
          transition={{ duration: 0.6 }}
        />

        <Header
          onNavigate={handleNavigate}
          currentIndex={currentIndex}
        />

        <main className="relative z-10 w-full h-full">
          <AnimatePresence mode="wait" custom={direction}>
            {currentProject.type === 'hero' ? (
              <motion.div
                key="hero"
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={transition}
                className="absolute w-full h-full flex items-center justify-center pt-20"
              >
                <Hero />
              </motion.div>
            ) : currentProject.type === 'testimonials' ? (
              <motion.div
                key={currentProject.id}
                custom={direction}
                initial={{ opacity: 0, y: direction === 'down' ? 50 : -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction === 'down' ? -50 : 50 }}
                transition={transition}
                className="absolute inset-0 w-full h-full flex items-center"
              >
                <TestimonialsSection />
              </motion.div>
            ) : (
              <motion.div
                key={currentProject.id}
                custom={direction}
                initial={{ opacity: 0, y: direction === 'down' ? 30 : -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction === 'down' ? -30 : 30 }}
                transition={transition}
                className="absolute inset-0 w-full h-full flex items-center"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 items-center w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
                  {/* Mobile Image - shown only on small screens */}
                  <div className="lg:hidden w-full flex justify-center mb-4">
                    {currentProject.images?.[0] && (
                      <img
                        src={currentProject.images[0]}
                        alt={currentProject.title}
                        className="w-full max-w-[280px] sm:max-w-[360px] h-auto rounded-xl"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center h-full text-center lg:text-left">
                    <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
                      <h1
                        className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-[18ch] mx-auto lg:mx-0"
                        style={{ color: currentProject.textColor }}
                      >
                        {currentProject.title}
                      </h1>
                      <p
                        className="text-sm sm:text-base lg:text-lg opacity-80 max-w-md font-medium mx-auto lg:mx-0"
                        style={{ color: currentProject.textColor }}
                      >
                        {currentProject.description}
                      </p>

                      <div className="flex flex-wrap gap-2 py-2 justify-center lg:justify-start">
                        {currentProject.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[0.6rem] sm:text-[0.7rem] font-semibold tracking-[0.08em] sm:tracking-[0.1em] bg-white text-gray-800 uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.25)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(`/project/${currentProject.id}`)}
                        className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[0.65rem] sm:text-[0.75rem] font-bold tracking-[0.12em] sm:tracking-[0.15em] uppercase bg-white/15 backdrop-blur-sm border border-white/20 w-fit mx-auto lg:mx-0 transition-all"
                        style={{ color: currentProject.textColor }}
                      >
                        {currentProject.cta}
                      </motion.button>
                    </div>
                  </div>

                  {/* Empty space for ImageStack positioning */}
                  <div className="relative aspect-[4/3] w-full hidden lg:block" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ImageStack - OUTSIDE AnimatePresence, always visible for project sections */}
          {currentProject.type === 'project' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:flex items-center justify-end pr-10">
              <div className="relative w-[45%] aspect-[4/3] flex items-center justify-center overflow-visible">
                <ImageStack scrollProgress={smoothProgress} />
              </div>
            </div>
          )}
        </main>

        {/* NavDots - hidden on mobile */}
        <div className="hidden md:block">
          <NavDots
            projects={PROJECTS}
            currentIndex={currentIndex}
            onNavigate={handleNavigate}
            isHovered={false}
            onHoverChange={() => { }}
          />
        </div>

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
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/:id" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
};

export default App;
