
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <div className="relative w-full h-full bg-[#A3D5EF] text-black overflow-hidden flex flex-col items-center justify-end font-sans">

            {/* Background Text - Split with gap for head */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center gap-[8vw] z-0 select-none pointer-events-none">
                <h1 className="text-[18vw] leading-none font-bold tracking-tighter text-black">
                    Lyna
                </h1>
                <h1 className="text-[18vw] leading-none font-bold tracking-tighter text-black">
                    Seridji
                </h1>
            </div>

            {/* Main Image - Centered Bottom */}
            <motion.div
                className="relative z-10 w-full max-w-[80vh] h-[85vh] flex items-end justify-center pointer-events-none"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <img
                    src="/lyna-hero.png"
                    alt="Lyna Seridji"
                    className="w-full h-full object-contain object-bottom drop-shadow-2xl"
                />
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
                <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-12 md:pb-24">

                    <div className="flex flex-col md:flex-row justify-between items-end w-full">
                        {/* Left Side: Description */}
                        <motion.div
                            className="max-w-xs md:max-w-sm text-left mb-8 md:mb-0 pointer-events-auto"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <p className="text-sm md:text-lg font-medium leading-relaxed text-black/80">
                                With a background in customer success, I bridge the gap between business goals and human needs through empathy-driven design.
                            </p>
                        </motion.div>

                        {/* Right Side: Pills - Zigzag layout */}
                        <motion.div
                            className="flex flex-col items-end gap-3 pointer-events-auto"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <span className="bg-black text-white px-6 py-2 rounded-full text-sm md:text-base font-medium tracking-wide -translate-x-20">
                                3+ years of experience
                            </span>
                            <span className="bg-black text-white px-6 py-2 rounded-full text-sm md:text-base font-medium tracking-wide">
                                Based in Medellin
                            </span>
                            <span className="bg-black text-white px-6 py-2 rounded-full text-sm md:text-base font-medium tracking-wide -translate-x-12">
                                B2B|B2C|Saas
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
