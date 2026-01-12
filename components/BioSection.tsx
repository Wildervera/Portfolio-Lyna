
import React from 'react';
import { motion } from 'framer-motion';

const BioSection: React.FC = () => {
  const tools = [
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Adobe XD', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg' },
    { name: 'Canva', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg' },
    { name: 'Framer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg' },
    { name: 'ChatGPT', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg' },
    { name: 'Linear', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Linear_logo.svg' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-20 flex flex-col gap-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-black/80">
              Hey 👋, I'm Lyna.
            </h2>
            
            <p className="text-xl md:text-2xl lg:text-3xl leading-[1.4] text-black/70 font-normal">
              A certified UX/UI Designer passionate about combining <span className="font-bold text-black">psychology</span> with design to create meaningful, user-centered experiences. I love diving into user behavior and <span className="font-bold text-black">translating those insights into intuitive and impactful designs.</span>
            </p>
          </motion.div>

          {/* Stats/Focus Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-black/5"
          >
            <div className="space-y-4">
              <h4 className="text-[0.7rem] font-bold tracking-[0.2em] text-[#FF5733] uppercase">Clientes</h4>
              <p className="text-sm md:text-base text-black/60 font-medium leading-relaxed">
                20+ Across<br />Multiples Industries
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[0.7rem] font-bold tracking-[0.2em] text-[#FF5733] uppercase">Approach</h4>
              <p className="text-sm md:text-base text-black/60 font-medium leading-relaxed">
                Data-Driven &<br />Human-Centric
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[0.7rem] font-bold tracking-[0.2em] text-[#FF5733] uppercase">Focus</h4>
              <p className="text-sm md:text-base text-black/60 font-medium leading-relaxed">
                Design That Connects<br />with People
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Photo Column (Polaroid) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-black/5 rounded-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[400px]">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-[2px]">
              <img 
                src="https://raw.githubusercontent.com/username/repo/main/lyna-portrait.png" 
                alt="Lyna Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  // Fallback to a high-quality placeholder if the direct link isn't available yet
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80";
                }}
              />
            </div>
            <div className="mt-6 flex justify-center">
              <div className="w-12 h-[1px] bg-black/5"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tools Footer Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-20 border-t border-black/5"
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.1 }}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <img src={tool.icon} alt={tool.name} className="max-w-full max-h-full object-contain" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BioSection;
