import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components';

export const Projects: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <main className="pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Projects
          </motion.h1>
        </div>
      </main>
    </div>
  );
};

export default Projects;
