import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black overflow-hidden flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* MOBILE/TABLET: Name on left side */}
        <div className="absolute left-[5vw] top-[15%] z-20 lg:hidden">
          <h1
            className="leading-[0.95] tracking-[-0.03em] text-[#313131]"
            style={{ fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 590, fontSize: '12vw' }}
          >
            Lyna
          </h1>
          <h1
            className="leading-[0.95] tracking-[-0.03em] text-[#313131]"
            style={{ fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 590, fontSize: '12vw' }}
          >
            Seridji
          </h1>
        </div>

        {/* MOBILE/TABLET: Description on right side, mid-height */}
        <motion.div
          className="absolute right-[1vw] top-[24%] z-20 lg:hidden max-w-[38vw]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="font-normal leading-[1.2] text-[#313131]" style={{ fontSize: '2.6vw' }}>
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </motion.div>

        {/* DESKTOP: Name centered behind photo — SF Pro 180px semibold */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-0 select-none pointer-events-none" style={{ marginTop: '-5%' }}>
          <h1
            className="text-[#313131] whitespace-nowrap"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
              fontWeight: 590,
              fontSize: 'clamp(100px, 14vw, 180px)',
              lineHeight: '215px',
            }}
          >
            Lyna Seridji
          </h1>
        </div>

        {/* Main Image - Centered, fully responsive */}
        <motion.div
          className="relative z-10 flex items-end justify-center pointer-events-none"
          style={{ height: 'calc(100% - 8vh)' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/Lyna/lyna-hero.png"
            alt="Lyna Seridji"
            className="h-full max-h-[88vh] lg:max-h-[80vh] w-auto object-contain object-bottom"
          />
        </motion.div>

        {/* MOBILE/TABLET: Pills on right side, vertical column */}
        <div className="absolute right-[4vw] bottom-[12%] z-20 lg:hidden">
          <div className="flex flex-col gap-[0.8vw] items-end">
            <motion.span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              3+years of experience
            </motion.span>
            <motion.span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Based in Medellin
            </motion.span>
            <motion.span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              B2B|B2C|Saas
            </motion.span>
          </div>
        </div>

        {/* DESKTOP: Description on left — Inter 24px */}
        <motion.div
          className="absolute z-20 pointer-events-auto hidden lg:block"
          style={{ left: '48px', bottom: '30%', maxWidth: '376px' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p
            className="font-normal text-[#313131]"
            style={{ fontSize: '24px', lineHeight: '29px', fontFamily: "'Inter', sans-serif" }}
          >
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </motion.div>

        {/* DESKTOP: Pills absolute positioned on right — staggered like Figma */}
        <div className="hidden lg:block">
          {/* 3+ years — top right */}
          <motion.span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: '18%',
              top: '48%',
              padding: '5px 16px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            3+years of experience
          </motion.span>

          {/* B2B|B2C|Saas — middle right, slightly left */}
          <motion.span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: '24%',
              top: '56%',
              padding: '5px 15px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
              transform: 'rotate(-0.4deg)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            B2B|B2C|Saas
          </motion.span>

          {/* Based in Medellin — bottom right */}
          <motion.span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: '14%',
              top: '64%',
              padding: '5px 21px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Based in Medellin
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
