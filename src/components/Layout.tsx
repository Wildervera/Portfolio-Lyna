import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

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
