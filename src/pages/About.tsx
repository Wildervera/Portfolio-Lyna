import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components';

// Experience data
const experiences = [
  {
    title: "Product Designer",
    company: "Nexgen Soluciones",
    period: "Nov 2025 - Present"
  },
  {
    title: "UX/UI Designer",
    company: "Freelance",
    period: "Sept 2022 - Oct 2025"
  },
  {
    title: "Customer Success Manager",
    company: "Lusol Consulting",
    period: "Dec 2020 - Jul 2022"
  }
];

// Values data
const values = [
  {
    title: "Accountability",
    description: "I believe in taking responsibility for my work and my decisions. Being honest about constraints, communicating early when something shifts, and making sure the people I work with always know where things stand."
  },
  {
    title: "Design With Impact",
    description: "I aim to create experiences that help users, not manipulate them. I avoid dark patterns and focus on clarity, trust, and meaningful value in every interaction."
  },
  {
    title: "Collaboration",
    description: "I believe great products come from shared ownership and continuous exchange between designers, developers, and stakeholders. Working with others makes ideas stronger, and I like being part of that process."
  },
  {
    title: "No Ego",
    description: "I try to stay open, curious, and flexible. Good ideas can come from anywhere, and I aim to create space for them. I don't need to be right. I care more about moving the product in the right direction."
  }
];

export const About: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('lyna@example.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* White Container with Border */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl border border-gray-200/60 p-8 md:p-12 lg:p-16 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-72 md:w-80 overflow-hidden rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200">
                  <img
                    src="/Lyna/lyna-about.webp"
                    alt="Lyna - Product Designer"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
                  <p>
                    I'm a French Product Designer based in Colombia with about 3+ years
                    of experience launching products in startups, E-commerce, and helping
                    scale ups grow.
                  </p>
                  <p>
                    I started out in Customer Success, which really shaped how I think. It
                    taught me how to listen, understand user needs, and translate real
                    behavior into thoughtful product decisions. I care about clarity,
                    usability, and creating experiences that make a real impact.
                  </p>
                  <p>
                    Along the way, I've worked across SaaS, B2B, and B2C products, often
                    collaborating with distributed teams or leading projects independently
                    as a freelancer. Working with 20+ clients across different countries has
                    helped me become adaptive, resourceful, and confident owning
                    projects end-to-end.
                  </p>
                  <p>
                    As someone naturally curious, I enjoy digging into user behavior, asking
                    questions, and exploring new ideas. I love learning, whether it's
                    improving my product thinking, deepening my knowledge in design, or
                    exploring new areas like vibecoding and AI. Continuous learning keeps
                    me excited about the future of product design.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <motion.button
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white text-sm font-medium transition-all hover:bg-gray-800"
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
                    {copiedEmail ? 'Copied!' : 'Copy email'}
                  </motion.button>

                  <motion.a
                    href="https://www.linkedin.com/in/lyna-seridji"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF9F6] border border-gray-300 text-gray-900 text-sm font-medium transition-all hover:bg-gray-100"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    Connect with me
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-12"
          >
            Experience
          </motion.h2>

          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-300/50 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                  <span className="text-base md:text-lg font-semibold text-gray-900">
                    {exp.title}/
                  </span>
                  <span className="text-base md:text-lg font-semibold text-gray-900 md:ml-1">
                    {exp.company}
                  </span>
                </div>
                <span className="text-sm md:text-base text-gray-500 mt-2 md:mt-0">
                  {exp.period}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14"
          >
            My Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default About;
