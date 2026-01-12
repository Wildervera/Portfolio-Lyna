
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#f9f9f9] overflow-y-auto"
      ref={containerRef}
    >
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y, opacity, scale }} className="w-full h-full flex items-center justify-center">
           <div className="w-full h-full absolute inset-0 transition-colors duration-700" style={{ backgroundColor: project.backgroundColor }}></div>
           <img 
            src={project.images[0]} 
            alt={project.title} 
            className="relative z-10 max-w-[70%] max-h-[80%] object-contain shadow-2xl rounded-sm"
          />
        </motion.div>
        
        <div className="absolute top-10 left-10 z-20">
          <button 
            onClick={onBack}
            className="text-[0.7rem] font-bold tracking-widest uppercase hover:opacity-50 transition-all flex items-center gap-2"
            style={{ color: project.textColor }}
          >
            ← BACK TO GALLERY
          </button>
        </div>
      </div>

      <div className="relative z-10 bg-white min-h-screen -mt-[10vh]">
        <div className="max-w-5xl mx-auto px-10 py-32">
          <div className="mb-20">
            <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6 block">PROJECT STORY</span>
            <h1 className="font-serif text-6xl lg:text-8xl leading-[0.9] text-[#1a1a1a]">{project.title}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
            <div className="md:col-span-2">
               <p className="text-xl leading-relaxed text-gray-700 font-medium">{project.description}</p>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="text-[0.65rem] font-bold tracking-widest text-gray-400 uppercase mb-3">SERVICES</h4>
                <div className="space-y-1 text-sm font-semibold text-gray-800">
                  <p>User Experience Strategy</p>
                  <p>Interface Design</p>
                  <p>Interactive Prototyping</p>
                </div>
              </div>
              <div>
                <h4 className="text-[0.65rem] font-bold tracking-widest text-gray-400 uppercase mb-3">YEAR</h4>
                <p className="text-sm font-semibold text-gray-800">2024</p>
              </div>
            </div>
          </div>

          <div className="space-y-32">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
                <img src={project.images[1]} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" alt="Process 1" />
                <img src={project.images[2]} className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair" alt="Process 2" />
             </div>
             
             <div className="max-w-3xl">
                <h3 className="font-serif text-4xl mb-8">The Design Rationale</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {project.fullContent}
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Every interaction was tested through a series of internal and external user research labs, focusing specifically on eye-tracking data to ensure the most important calls to action were always intuitively within reach.
                </p>
             </div>

             <div className="w-full aspect-video rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Video Case Study Placeholder</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
