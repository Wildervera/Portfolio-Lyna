import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useMatch } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';

import { PROJECTS } from '../data/projects';
import { GLOBAL_STYLES } from '../styles/global';
import {
    Header,
    NavDots,
    Hero,
    TestimonialsSection,
    ProjectDetail
} from '../components';
import { CustomCursor } from '../components/CustomCursor';
import { Project } from '../types';

// Helper component for intersection observation
const SectionObserver: React.FC<{
    children: React.ReactNode;
    index: number;
    onInView: (index: number) => void;
    className?: string;
    id?: string;
}> = ({ children, index, onInView, className, id }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView(index);
        }
    }, [isInView, index, onInView]);

    return (
        <div ref={ref} className={className} id={id}>
            {children}
        </div>
    );
};

const ProjectSection: React.FC<{
    project: Project;
    navigate: (path: string) => void;
}> = ({ project, navigate }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Calculate transforms based on scroll progress to mimic original parallax feel
    // Original logic: y moved up, x moved right as you scrolled past
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const x = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const rotate = useTransform(scrollYProgress, [0, 1], [14, 10]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

    const isComingSoon = !project.caseStudy || project.cta?.toUpperCase() === 'COMING SOON';
    const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

    return (
        <div ref={ref} className="w-full h-full flex flex-col justify-center py-16 pt-24 lg:pt-32 lg:pb-16 min-h-[100vh]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                {/* Mobile Image */}
                <div className="lg:hidden w-full flex justify-center mb-4">
                    {project.images?.[0] && (
                        <div className="w-full max-w-[280px] sm:max-w-[360px] aspect-[4/3] rounded-3xl shadow-lg overflow-hidden">
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center h-full text-center lg:text-left" style={{ padding: '0 12px' }}>
                    <motion.div
                        className="flex flex-col"
                        style={{ gap: '32px' }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        <div className="flex flex-col" style={{ gap: '12px' }}>
                            <motion.h1
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.8, ease: "easeOut" }
                                    }
                                }}
                                className="max-w-[600px] mx-auto lg:mx-0"
                                style={{
                                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                                    fontWeight: 600,
                                    fontSize: 'clamp(20px, 5vw, 50px)',
                                    letterSpacing: '-0.5px',
                                    lineHeight: '100%',
                                    color: project.textColor || '#FFFFFF',
                                }}
                            >
                                {project.title}
                            </motion.h1>
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, x: -100 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.8, ease: "easeOut" }
                                    }
                                }}
                                className="max-w-[477px] mx-auto lg:mx-0"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '150%',
                                    color: project.textColor || '#FFFFFF',
                                }}
                            >
                                {project.description}
                            </motion.p>
                        </div>

                        {/* Tags */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, x: -100 },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { duration: 0.8, ease: "easeOut" }
                                }
                            }}
                            className="flex flex-wrap gap-[10px] justify-center lg:justify-start"
                        >
                            {project.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="capitalize"
                                    style={{
                                        padding: '0 12px',
                                        height: '26px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        borderRadius: '12px',
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 400,
                                        fontSize: '16px',
                                        lineHeight: '162.5%',
                                        color: '#000000',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            whileHover={isComingSoon ? {} : { scale: 1.03 }}
                            whileTap={isComingSoon ? {} : { scale: 0.97 }}
                            onClick={() => {
                                if (isComingSoon) {
                                    setShowComingSoonPopup(true);
                                } else {
                                    navigate(`/project/${project.id}`);
                                }
                            }}
                            className="w-fit mx-auto lg:mx-0"
                            style={{
                                marginTop: '13px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '14px 21px',
                                gap: '8px',
                                width: '189px',
                                height: '43px',
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                boxShadow: '0px 1px 4px rgba(0,0,0,0.08), inset 0px 1px 0px rgba(255,255,255,0.2)',
                                borderRadius: '100px',
                                border: isComingSoon ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.25)',
                                cursor: 'pointer',
                                opacity: isComingSoon ? 0.6 : 1,
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: '15px',
                                lineHeight: '20px',
                                letterSpacing: '-0.1px',
                                textTransform: 'uppercase',
                                color: project.textColor || '#FFFFFF',
                            }}
                        >
                            {project.cta}
                        </motion.button>
                    </motion.div>


                </div>

                {/* Desktop Image */}
                <div className="hidden lg:flex justify-end items-center h-full w-full pr-10" style={{ perspective: '1200px' }}>
                    {project.images?.[0] && (
                        <motion.div
                            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer origin-center"
                            whileHover={isComingSoon ? {} : { scale: 1.05 }}
                            onClick={() => {
                                if (isComingSoon) {
                                    setShowComingSoonPopup(true);
                                } else {
                                    navigate(`/project/${project.id}`);
                                }
                            }}
                            style={{
                                y,
                                x,
                                opacity,
                                scale,
                                cursor: 'pointer',
                            }}
                        >
                            <motion.div
                                className="w-full h-full"
                                animate={{ y: [-15, 15] }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                }}
                            >
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Coming Soon Popup overlay */}
            <AnimatePresence>
                {showComingSoonPopup && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            onClick={() => setShowComingSoonPopup(false)}
                        />
                        {/* Popup Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-sm bg-white rounded-[32px] p-10 flex flex-col items-center text-center shadow-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowComingSoonPopup(false)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>

                            <h3
                                style={{
                                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '32px',
                                    lineHeight: '1.2',
                                    color: '#000000',
                                    marginTop: '12px',
                                    marginBottom: '16px',
                                }}
                            >
                                Coming soon
                            </h3>
                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '17px',
                                    lineHeight: '150%',
                                    color: '#666666',
                                }}
                            >
                                I'm currently working on presenting this project into my portfolio.
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Portfolio: React.FC<{ isWorkPage?: boolean }> = ({ isWorkPage = false }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const match = useMatch('/project/:id');
    const activeProjectId = match?.params.id;
    const activeProject = activeProjectId ? PROJECTS.find(p => p.id === parseInt(activeProjectId)) : null;

    const handleNavigate = (index: number) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Determine current background color based on index
    const displayProjects = isWorkPage ? PROJECTS.filter(p => p.type === 'project') : PROJECTS;
    const currentBg = displayProjects[currentIndex]?.backgroundColor || displayProjects[0].backgroundColor;

    return (
        <div className="relative w-full min-h-screen">
            <CustomCursor />
            <style>{GLOBAL_STYLES}</style>

            {/* Global Fixed Background */}
            <motion.div
                className="fixed inset-0 z-[-1]"
                animate={{ backgroundColor: currentBg }}
                transition={{ duration: 0.4 }}
            />

            <AnimatePresence>
                {activeProject && (
                    <ProjectDetail
                        key="detail"
                        project={activeProject}
                        onBack={() => navigate('/')}
                    />
                )}
            </AnimatePresence>

            <Header
                onNavigate={handleNavigate}
                currentIndex={currentIndex}
            />

            <main className="relative w-full flex flex-col">
                {displayProjects.map((project, index) => {
                    // Render logic based on type
                    if (project.type === 'hero') {
                        return (
                            <SectionObserver
                                key={project.id}
                                index={index}
                                onInView={setCurrentIndex}
                                id={`section-${index}`}
                                className="w-full h-screen relative"
                            >
                                <Hero />
                                <div className="absolute bottom-2 left-[35%] md:left-0 md:right-0 md:flex md:justify-center z-50 pointer-events-none">
                                    <motion.div
                                        animate={{ y: [0, 10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex flex-col items-center gap-2 opacity-30"
                                        style={{ color: '#000000' }}
                                    >
                                        <span className="text-[0.6rem] font-bold tracking-[0.3em] uppercase">Scroll to see more</span>
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </div>
                            </SectionObserver>
                        );
                    }

                    if (project.type === 'testimonials') {
                        return (
                            <SectionObserver
                                key={project.id}
                                index={index}
                                onInView={setCurrentIndex}
                                id={`section-${index}`}
                                className="w-full min-h-screen relative"
                            >
                                <TestimonialsSection />
                            </SectionObserver>
                        );
                    }

                    // Default: Project Section
                    return (
                        <SectionObserver
                            key={project.id}
                            index={index}
                            onInView={setCurrentIndex}
                            id={`section-${index}`}
                            className="w-full min-h-[100vh] relative flex flex-col justify-center"
                        >
                            {/* "Featured Projects" Header before the first project */}
                            {!isWorkPage && index === 1 && (
                                <div className="absolute top-[5%] w-full text-center z-10 w-full">
                                    <h2
                                        className="capitalize"
                                        style={{
                                            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                                            fontWeight: 590,
                                            fontSize: '16px',
                                            lineHeight: '150%',
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        Featured Projects
                                    </h2>
                                </div>
                            )}

                            <ProjectSection project={project} navigate={navigate} />
                        </SectionObserver>
                    );
                })}
            </main>

            {/* NavDots — hidden on Hero section */}
            {displayProjects[currentIndex]?.type !== 'hero' && (
                <div className="hidden md:block">
                    <NavDots
                        projects={displayProjects}
                        currentIndex={currentIndex}
                        onNavigate={handleNavigate}
                        isHovered={false}
                        onHoverChange={() => { }}
                    />
                </div>
            )}
        </div>
    );
};
