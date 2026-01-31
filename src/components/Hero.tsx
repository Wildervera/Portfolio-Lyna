import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black overflow-hidden flex items-center justify-center font-sans">
      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* MOBILE/TABLET: Name on left side */}
        <div className="absolute left-[5vw] top-[15%] z-20 lg:hidden">
          <h1 className="text-[12vw] leading-[0.95] font-bold tracking-[-0.03em] text-[#313131]">
            Lyna
          </h1>
          <h1 className="text-[12vw] leading-[0.95] font-bold tracking-[-0.03em] text-[#313131]">
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
          <p className="text-[2.6vw] font-normal leading-[1.4] text-black/85">
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </motion.div>

        {/* DESKTOP: Name centered behind photo */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-0 select-none pointer-events-none -translate-y-[18%]">
          <div className="flex flex-row gap-[18vw]">
            <h1 className="text-[14vw] leading-none font-bold tracking-[-0.04em] text-[#313131] translate-x-[15%]">
              Lyna
            </h1>
            <h1 className="text-[14vw] leading-none font-bold tracking-[-0.04em] text-[#313131] translate-x-[7%]">
              Seridji
            </h1>
          </div>
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
            src="public\Lyna\lyna-hero.png"
            alt="Lyna Seridji"
            className="h-full max-h-[88vh] lg:max-h-[80vh] w-auto object-contain object-bottom"
          />
        </motion.div>

        {/* MOBILE/TABLET: Pills on right side, vertical column */}
        <div className="absolute right-[4vw] bottom-[12%] z-20 lg:hidden">
          <div className="flex flex-col gap-[0.8vw] items-end">
            <motion.span
              className="bg-[#313131] text-white px-[2.2vw] py-[0.9vw] rounded-full text-[2vw] font-normal tracking-wide whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              3+years of experience
            </motion.span>
            <motion.span
              className="bg-[#313131] text-white px-[2.2vw] py-[0.9vw] rounded-full text-[2vw] font-normal tracking-wide whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Based in Medellin
            </motion.span>
            <motion.span
              className="bg-[#313131] text-white px-[2.2vw] py-[0.9vw] rounded-full text-[2vw] font-normal tracking-wide whitespace-nowrap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              B2B|B2C|Saas
            </motion.span>
          </div>
        </div>

        {/* DESKTOP: Description on left */}
        <motion.div
          className="absolute left-[11.5vw] bottom-[25%] max-w-[280px] text-left z-20 pointer-events-auto hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-lg font-normal leading-relaxed text-black/90">
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </motion.div>

        {/* DESKTOP: Pills absolute positioned on right */}
        <div className="hidden lg:block">
          <motion.span
            className="absolute right-20 bottom-[42%] bg-[#313131] text-white px-5 py-2.5 rounded-full text-sm font-normal tracking-wide z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            3+years of experience
          </motion.span>

          <motion.span
            className="absolute right-[22%] bottom-[32%] bg-[#313131] text-white px-5 py-2.5 rounded-full text-sm font-normal tracking-wide z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            B2B|B2C|Saas
          </motion.span>

          <motion.span
            className="absolute right-20 bottom-[22%] bg-[#313131] text-white px-5 py-2.5 rounded-full text-sm font-normal tracking-wide z-20"
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
