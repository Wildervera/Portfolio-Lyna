import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
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
import { Project } from './types';

// Helper component for intersection observation
const SectionObserver: React.FC<{
  children: React.ReactNode;
  index: number;
  onInView: (index: number) => void;
  className?: string;
  id?: string;
}> = ({ children, index, onInView, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
};

const ProjectSection: React.FC<{
  project: Project;
  navigate: (path: string) => void;
}> = ({ project, navigate }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate transforms based on scroll progress to mimic original parallax feel
  // Original logic: y moved up, x moved right as you scrolled past
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotate = useTransform(scrollYProgress, [0, 1], [14, 10]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center py-16 lg:py-0 min-h-[85vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Mobile Image */}
        <div className="lg:hidden w-full flex justify-center mb-4">
          {project.images?.[0] && (
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full max-w-[280px] sm:max-w-[360px] h-auto rounded-3xl shadow-lg"
            />
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center h-full text-center lg:text-left" style={{ padding: '0 12px' }}>
          <div className="flex flex-col" style={{ gap: '32px' }}>
            <div className="flex flex-col" style={{ gap: '12px' }}>
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="capitalize max-w-[477px] mx-auto lg:mx-0"
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                  fontWeight: 590,
                  fontSize: 'clamp(28px, 4vw, 45px)',
                  lineHeight: '130%',
                  color: project.textColor || '#FFFFFF',
                }}
              >
                {project.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-[477px] mx-auto lg:mx-0"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '25px',
                  lineHeight: '150%',
                  color: project.textColor || '#FFFFFF',
                }}
              >
                {project.description}
              </motion.p>
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-[10px] justify-center lg:justify-start"
            >
              {project.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="capitalize"
                  style={{
                    padding: '0 12px',
                    height: '26px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    borderRadius: '12px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '162.5%',
                    color: '#000000',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="w-fit mx-auto lg:mx-0"
            style={{
              marginTop: '45px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '14px 21px',
              gap: '8px',
              width: '189px',
              height: '43px',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0px 1px 4px rgba(0,0,0,0.08), inset 0px 1px 0px rgba(255,255,255,0.2)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              lineHeight: '20px',
              letterSpacing: '-0.1px',
              textTransform: 'uppercase',
              color: project.textColor || '#FFFFFF',
            }}
          >
            {project.cta}
          </motion.button>
        </div>

        {/* Desktop Image */}
        <div className="hidden lg:flex justify-end items-center h-full w-full pr-10" style={{ perspective: '1200px' }}>
          {project.images?.[0] && (
            <motion.div
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer origin-center"
              style={{
                transformStyle: 'preserve-3d',
                rotate,
                rotateY: -12,
                y,
                x,
                opacity,
                scale,
              }}
              whileHover={{ scale: 1.05, rotate: 10, rotateY: -10 }}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <motion.div
                className="w-full h-full"
                animate={{ y: [-15, 15] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </div>
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

  const handleNavigate = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Determine current background color based on index
  const currentBg = PROJECTS[currentIndex]?.backgroundColor || PROJECTS[0].backgroundColor;

  return (
    <div className="relative w-full min-h-screen">
      <style>{GLOBAL_STYLES}</style>

      {/* Global Fixed Background */}
      <motion.div
        className="fixed inset-0 z-[-1]"
        animate={{ backgroundColor: currentBg }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence>
        {activeProject && (
          <ProjectDetail
            key="detail"
            project={activeProject}
            onBack={() => navigate('/')}
          />
        )}
      </AnimatePresence>

      <Header
        onNavigate={handleNavigate}
        currentIndex={currentIndex}
      />

      <main className="relative w-full flex flex-col">
        {PROJECTS.map((project, index) => {
          // Render logic based on type
          if (project.type === 'hero') {
            return (
              <SectionObserver
                key={project.id}
                index={index}
                onInView={setCurrentIndex}
                id={`section-${index}`}
                className="w-full h-screen pt-20 relative"
              >
                <Hero />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-2 left-[45%] z-50 flex flex-col items-center gap-2 opacity-30 pointer-events-none"
                  style={{ color: '#000000' }}
                >
                  <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase">Scroll to see more</span>
                  <ChevronDown size={20} />
                </motion.div>
              </SectionObserver>
            );
          }

          if (project.type === 'testimonials') {
            return (
              <SectionObserver
                key={project.id}
                index={index}
                onInView={setCurrentIndex}
                id={`section-${index}`}
                className="w-full min-h-screen relative"
              >
                <TestimonialsSection />
              </SectionObserver>
            );
          }

          // Default: Project Section
          return (
            <SectionObserver
              key={project.id}
              index={index}
              onInView={setCurrentIndex}
              id={`section-${index}`}
              className="w-full min-h-[85vh] relative flex flex-col justify-center"
            >
              {/* "Featured Projects" Header before the first project (index 1) */}
              {index === 1 && (
                <div className="absolute top-[10%] w-full text-center z-10 w-full">
                  <h2
                    className="capitalize"
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 590,
                      fontSize: '25px',
                      lineHeight: '150%',
                      color: '#FFFFFF',
                    }}
                  >
                    Featured Projects
                  </h2>
                </div>
              )}

              <ProjectSection project={project} navigate={navigate} />
            </SectionObserver>
          );
        })}
      </main>

      {/* NavDots */}
      <div className="hidden md:block">
        <NavDots
          projects={PROJECTS}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
          isHovered={false}
          onHoverChange={() => { }}
        />
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
