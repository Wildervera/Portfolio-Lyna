import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialData {
  text: React.ReactNode;
  author: string;
  role: string;
  avatar: string;
  avatarStyle?: React.CSSProperties;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: TestimonialData[] = [
    {
      text: (
        <>
          Lyna joined my team as a UI/UX Designer and quickly{' '}
          <span style={{ backgroundColor: '#D6EAF8', padding: '0 2px', borderRadius: '2px' }}>
            demonstrated a strong understanding of the project, along with a clear sense of leadership and professionalism
          </span>
          . She played a key role in defining a clean, intuitive, and user-friendly UI/UX, and was always available to support the team when needed. I confidently recommend her for any UI/UX design project.
        </>
      ),
      author: "Anis Moualhi",
      role: "Project Manager",
      avatar: "/testimonials/anis.webp"
    },
    {
      text: (
        <>
          Worked with Lyna for some US clients, she was so assertive proposing wireframes and layouts. She has a good method to spot missing aspect in old designs and proposing new ones improving user experience.{' '}
          <span style={{ backgroundColor: '#D6EAF8', padding: '0 2px', borderRadius: '2px' }}>
            She is clear communicating to the business and technical sides, delivers fast and proves knowledge domain in her area
          </span>
          . Hope to work with her in other opportunities.
        </>
      ),
      author: "Joseph Hernandez",
      role: "Full Stack Developer",
      avatar: "/testimonials/joseph hernandez.webp",
      avatarStyle: { objectPosition: 'center 20%', transform: 'scale(1.5)' }
    },
    {
      text: (
        <>
          Throughout the collaboration, Lyna demonstrated strong skills in both UX and UI design, creating solutions that were both visually appealing and user-focused.{' '}
          <span style={{ backgroundColor: '#D6EAF8', padding: '0 2px', borderRadius: '2px' }}>
            What stood out most was her receptiveness to feedback
          </span>
          . She consistently approached revision requests with professionalism and a collaborative spirit, making the design iteration process smooth and productive.
        </>
      ),
      author: "Harlen Giraldo",
      role: "Full Stack Developer",
      avatar: "/testimonials/harlen photo profil .webp",
      avatarStyle: { objectPosition: 'center 20%', transform: 'scale(1.5)' }
    },
    {
      text: (
        <>
          I really enjoyed working with Lyna. She has a very{' '}
          <span style={{ backgroundColor: '#D6EAF8', padding: '0 2px', borderRadius: '2px' }}>
            thoughtful approach to design and is consistently thorough with the details
          </span>
          . She's proactive about keeping projects moving and is always clear and easy to communicate with, which made the whole process feel very smooth.
        </>
      ),
      author: "Wilder Vera",
      role: "Product Owner",
      avatar: "/testimonials/wilder vera.webp"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  // Fix index on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section
      className="w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 bg-[#FAF9F6]"
      style={{ minHeight: '100%', boxSizing: 'border-box', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="w-full relative" style={{ maxWidth: '1400px' }}>
        <h2
          className="text-center capitalize"
          style={{
            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
            fontWeight: 590,
            fontSize: '25px',
            lineHeight: '150%',
            color: '#313131',
            marginBottom: '48px',
          }}
        >
          What It's Like To Work With Me
        </h2>

        <div className="relative w-full px-8 md:px-12">
          {/* Controls */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all hover:scale-105"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md border border-gray-100 text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all hover:scale-105"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Window */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex"
              style={{
                width: `${(testimonials.length / itemsPerPage) * 100}%`
              }}
              animate={{ x: `-${currentIndex * (100 / testimonials.length)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    width: `${100 / testimonials.length}%`,
                    padding: '0 10px',
                    boxSizing: 'border-box'
                  }}
                  className="flex flex-col h-full flex-shrink-0"
                >
                  <div
                    className="flex flex-col h-full justify-between relative"
                    style={{
                      background: '#FFFFFF',
                      border: '0.8px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '19px',
                      padding: '32px 24px',
                      boxSizing: 'border-box',
                      height: '520px', // Increased height
                    }}
                  >
                    <p
                      className="flex-grow scrollbar-hide"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: '15px',
                        lineHeight: '180%',
                        color: '#000000',
                        marginBottom: '24px',
                        overflowY: 'auto'
                      }}
                    >
                      "{t.text}"
                    </p>

                    <div className="flex flex-col items-center text-center gap-4 mt-auto">
                      <div
                        className="rounded-full overflow-hidden border border-gray-100"
                        style={{ width: '80px', height: '80px', background: '#D9D9D9', flexShrink: 0 }}
                      >
                        <img
                          src={t.avatar}
                          alt={t.author}
                          className="w-full h-full object-cover"
                          style={t.avatarStyle}
                        />
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <h4
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: '15px',
                            color: '#000000',
                          }}
                        >
                          {t.author}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#666666',
                          }}
                        >
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
