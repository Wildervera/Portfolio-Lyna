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

export const NavDots: React.FC<NavDotsProps> = ({ projects, currentIndex, onNavigate, isHovered, onHoverChange }) => {
  // Filter to only project-type sections for the indicators
  const projectSections = projects
    .map((p, idx) => ({ project: p, index: idx }))
    .filter(item => item.project.type === 'project');

  return (
    <nav
      className="fixed z-[100] flex flex-col items-center"
      style={{
        right: '36px',
        top: '50%',
        transform: 'translateY(-50%)',
        gap: '10px',
      }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {projectSections.map((item) => {
        const isActive = item.index === currentIndex;

        return (
          <motion.div
            key={item.project.id}
            className="cursor-pointer"
            onClick={() => onNavigate(item.index)}
            style={{
              width: '11.44px',
              height: '22.11px',
              borderRadius: '19px',
              background: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
            }}
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </nav>
  );
};
