import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate?: (index: number) => void;
  currentIndex?: number;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentIndex }) => {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('lyna@example.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const isHome = location.pathname === '/' || location.pathname.startsWith('/project');
  const isProjects = location.pathname === '/projects';
  const isAbout = location.pathname === '/about';

  return (
    <header className="fixed top-6 left-0 right-0 z-[150] flex justify-center items-center px-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between w-full max-w-3xl px-6 md:px-8 py-3 md:py-4 rounded-full bg-[#f5f5f5] border border-gray-200/40"
      >
        {/* Left Navigation */}
        <nav className="flex items-center gap-8 md:gap-10">
          <Link
            to="/"
            className={`text-sm md:text-base font-normal transition-colors ${
              isHome ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={`text-sm md:text-base font-normal transition-colors ${
              isProjects ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Projects
          </Link>
          <Link
            to="/about"
            className={`text-sm md:text-base font-normal transition-colors ${
              isAbout ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="https://drive.google.com/file/d/1Gq4jZ_mWaHWpPZ_JfYf7ijTT6PSGXF5y/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base font-normal text-gray-600 hover:text-gray-900 transition-colors"
          >
            Resume
          </a>

          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gray-900 text-white text-sm md:text-base font-normal transition-all hover:bg-gray-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  Copy email
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
