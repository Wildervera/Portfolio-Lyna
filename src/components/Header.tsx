import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (index: number) => void;
  currentIndex?: number;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentIndex }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { to: '/', label: 'Home', isActive: isHome },
    { to: '/projects', label: 'Work', isActive: isProjects },
    { to: '/about', label: 'About', isActive: isAbout },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[150] flex justify-center items-center px-4 md:px-6" style={{ paddingTop: '38px' }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between"
          style={{
            width: '100%',
            maxWidth: '716px',
            height: '73px',
            padding: '0 32px',
            borderRadius: '45px',
            background: '#FFFFFF',
            border: '1px solid rgba(217, 217, 217, 0.3)',
            boxSizing: 'border-box',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation — Left side */}
          <nav className="hidden md:flex items-center" style={{ gap: '45px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '22px',
                  color: link.isActive ? '#000000' : '#666666',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions — Resume + Copy Email */}
          <div className="flex items-center" style={{ gap: '21px' }}>
            {/* Resume link */}
            <a
              href="https://drive.google.com/file/d/1Gq4jZ_mWaHWpPZ_JfYf7ijTT6PSGXF5y/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block transition-colors hover:opacity-70"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#000000',
              }}
            >
              Resume
            </a>

            {/* Copy Email Button — dark pill with icon */}
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center transition-all hover:opacity-90"
              style={{
                padding: '6px 13px',
                gap: '5px',
                height: '34px',
                background: '#313131',
                borderRadius: '24px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '22px',
                color: '#FFFFFF',
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
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
                    className="hidden sm:inline"
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="hidden sm:inline"
                  >
                    Copy email
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[140] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1 }}
              className="absolute top-28 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${link.isActive
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Resume link in mobile menu */}
                <a
                  href="https://drive.google.com/file/d/1Gq4jZ_mWaHWpPZ_JfYf7ijTT6PSGXF5y/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 px-4 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  Resume
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
