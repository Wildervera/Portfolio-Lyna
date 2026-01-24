import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black overflow-hidden flex items-center justify-center font-sans">
      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Name - Split around the photo, positioned higher */}
        <div className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none -translate-y-[15] md:-translate-y-[18%]">
          <div className="flex items-center justify-center gap-[12vw] md:gap-[18vw]">
            <h1 className="text-[15vw] md:text-[14vw] leading-none font-bold tracking-[-0.04em] text-black translate-x-[15%]">
              Lyna
            </h1>
            <h1 className="text-[15vw] md:text-[14vw] leading-none font-bold tracking-[-0.04em] text-black translate-x-[7%]">
              Seridji
            </h1>
          </div>
        </div>


        {/* Main Image - Centered */}
        <motion.div
          className="relative z-10 flex items-end justify-center h-[75vh] md:h-[80vh] pointer-events-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="public\Lyna\lyna-hero.png"
            alt="Lyna Seridji"
            className="h-full w-auto object-contain object-bottom"
          />
        </motion.div>

        {/* Left Side: Description */}
        <motion.div
          className="absolute left-6 md:left-12 lg:left-20 bottom-[20%] md:bottom-[25%] max-w-[200px] md:max-w-[280px] text-left z-20 pointer-events-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-sm md:text-base lg:text-lg font-normal leading-relaxed text-black/90">
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </motion.div>

        {/* Pills - Positioned absolutely for precise control */}
        {/* Top pill - 3+years - aligned right */}
        <motion.span
          className="absolute right-6 md:right-12 lg:right-20 bottom-[38%] md:bottom-[42%] bg-[#343330] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-normal tracking-wide z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          3+years of experience
        </motion.span>

        {/* Middle pill - B2B - positioned more to the left */}
        <motion.span
          className="absolute right-[30%] md:right-[25%] lg:right-[22%] bottom-[28%] md:bottom-[32%] bg-[#343330] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-normal tracking-wide z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          B2B|B2C|Saas
        </motion.span>

        {/* Bottom pill - Based in Medellin - aligned right */}
        <motion.span
          className="absolute right-6 md:right-12 lg:right-20 bottom-[18%] md:bottom-[22%] bg-[#343330] text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-normal tracking-wide z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Based in Medellin
        </motion.span>
      </div>
    </div>
  );
};

export default Hero;
