
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface HeaderProps {
  textColor: string;
  onNavigate?: (index: number) => void;
  currentIndex?: number;
}

export const Header: React.FC<HeaderProps> = ({ textColor, onNavigate, currentIndex }) => (
  <header className="fixed top-8 left-0 right-0 z-[150] flex justify-center items-center px-10">
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-2 md:gap-6 px-4 md:px-8 py-2 md:py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl shadow-2xl"
    >
      <nav className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => onNavigate?.(0)}
          className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
          style={{ color: textColor, opacity: currentIndex === 0 ? 1 : 0.6 }}
        >
          HOME
        </button>
        <button 
          onClick={() => onNavigate?.(0)}
          className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
          style={{ color: textColor, opacity: currentIndex !== null && currentIndex < 3 ? 1 : 0.6 }}
        >
          WORK
        </button>
        <button 
          onClick={() => onNavigate?.(3)}
          className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
          style={{ color: textColor, opacity: currentIndex === 3 ? 1 : 0.6 }}
        >
          ABOUT
        </button>
        
        <div className="w-[1px] h-4 bg-white/20 mx-1 md:mx-2" />
        
        <a 
          href="https://drive.google.com/file/d/1Gq4jZ_mWaHWpPZ_JfYf7ijTT6PSGXF5y/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase hover:opacity-100 transition-opacity"
          style={{ color: textColor, opacity: 0.6 }}
        >
          RESUME
        </a>
      </nav>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="ml-2 md:ml-4 px-4 md:px-7 py-2 md:py-3 rounded-full bg-black text-white text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase transition-all shadow-lg"
      >
        CONTACT
      </motion.button>
    </motion.div>
  </header>
);

interface NavDotsProps {
  projects: Project[];
  currentIndex: number;
  onNavigate: (i: number) => void;
  isHovered: boolean;
  onHoverChange: (h: boolean) => void;
}

export const NavDots: React.FC<NavDotsProps> = ({ projects, currentIndex, onNavigate, isHovered, onHoverChange }) => (
  <nav 
    className="fixed right-12 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-5"
    onMouseEnter={() => onHoverChange(true)}
    onMouseLeave={() => onHoverChange(false)}
  >
    {projects.map((p, i) => {
      // Only show dots for items of type 'project'
      if (p.type !== 'project') return null;
      
      return (
        <div 
          key={p.id} 
          className="group flex items-center gap-4 cursor-pointer"
          onClick={() => onNavigate(i)}
        >
          <motion.span 
            className="text-[0.75rem] font-bold tracking-widest uppercase pointer-events-none whitespace-nowrap"
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              x: isHovered ? 0 : 20,
              color: i === currentIndex ? p.accentColor : p.textColor 
            }}
            transition={{ duration: 0.3 }}
          >
            {p.title}
          </motion.span>
          <motion.div 
            className="rounded-full"
            animate={{ 
              width: 4,
              height: isHovered ? (i === currentIndex ? 24 : 4) : (i === currentIndex ? 12 : 6),
              backgroundColor: i === currentIndex ? p.accentColor : p.textColor,
              opacity: i === currentIndex ? 1 : 0.3
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      );
    })}
  </nav>
);
