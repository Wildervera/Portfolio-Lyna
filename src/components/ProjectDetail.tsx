import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Target, User, Check, TrendingUp, Key, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, KeyFinding, ContentSection, ProjectTeam } from '../types';
import { PROJECTS } from '../data/projects';

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  duration?: number;
  scale?: boolean;
}> = ({
  children,
  delay = 0,
  className,
  yOffset = 24,
  duration = 0.8,
  scale = false
}) => (
    <motion.div
      initial={{ opacity: 0, y: yOffset, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ margin: "-100px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onProjectChange?: (project: Project) => void;
}

const RichText: React.FC<{ text: string; className?: string; style?: React.CSSProperties }> = ({ text, className, style }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className={className} style={style}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
          : part
      )}
    </p>
  );
};

const SectionLabel: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="mb-4">
    <span className="text-[#E07A5F] text-xs font-bold tracking-[0.2em] uppercase">
      {number} {title}
    </span>
  </div>
);

const OverviewCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => {
  const getIcon = () => {
    switch (icon) {
      case 'x':
        return <X className="w-5 h-5 text-red-500" />;
      case 'target':
        return <Target className="w-5 h-5 text-green-600" />;
      case 'user':
        return <User className="w-5 h-5 text-gray-600" />;
      case 'check':
        return <Check className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center text-center gap-4 h-full">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${icon === 'x' ? 'bg-red-50' : icon === 'target' ? 'bg-green-50' : 'bg-gray-100'
        }`}>
        {getIcon()}
      </div>
      <div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; id: string; color?: string; className?: string; hideTitle?: boolean }> = ({ title, id, color, className, hideTitle }) => (
  <div id={id} className={`flex justify-center scroll-mt-24 ${className || ''}`} style={{ marginTop: hideTitle ? '160px' : '140px', marginBottom: hideTitle ? '120px' : '80px' }}>
    {!hideTitle && (
      <h2
        style={{
          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
          fontWeight: 400,
          fontSize: 'clamp(18px, 2.93vw, 30px)',
          lineHeight: '36px',
          color: '#565555',
        }}
      >
        {title}
      </h2>
    )}
  </div>
);

const ProjectNavBar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['final-product', 'testing', 'development', 'research', 'overview'];
      const container = document.querySelector('[data-scroll-container]');
      if (!container) return;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    const container = document.querySelector('[data-scroll-container]');
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'research', label: 'Research' },
    { id: 'development', label: 'Development' },
    { id: 'testing', label: 'Testing' },
    { id: 'final-product', label: 'Final Product' },
  ];

  return (
    <div className="flex justify-center sticky top-6 z-[190] mb-12 pointer-events-auto px-4">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="flex items-center justify-start lg:justify-center overflow-x-auto no-scrollbar w-max max-w-[95vw] md:max-w-[560px] lg:max-w-[716px] h-[46px] md:h-[58px] lg:h-[73px]"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(217, 217, 217, 0.3)',
          borderRadius: '45px',
          gap: 'clamp(10px, 2.5vw, 45px)',
          padding: '0 clamp(16px, 4vw, 32px)',
          boxSizing: 'border-box' as const,
          scrollbarWidth: 'none',   /* Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="transition-colors whitespace-nowrap flex-shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: activeSection === item.id ? 700 : 400,
              fontSize: 'clamp(11px, 2.5vw, 18px)',
              lineHeight: '22px',
              color: '#000000',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
        {/* Spacer trick: WebKit ignores right padding on scrollable containers.
            This invisible element guarantees empty space after "Final Product". */}
        <div className="w-[1px] h-[1px] flex-shrink-0 lg:hidden" />
      </div>
    </div>
  );
};

const PersonaCard: React.FC<{ icon: string; title: string; subtitle: string; description: string; accentColor?: string }> = ({
  icon, title, subtitle, description, accentColor
}) => (
  <div
    className="relative flex flex-col items-center"
    style={{
      width: 'clamp(260px, 32.8vw, 336px)',
      height: 'clamp(280px, 34.6vw, 354px)',
      background: '#FFFFFF',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      borderRadius: '24px',
      boxSizing: 'border-box' as const,
    }}
  >
    {/* Emoji */}
    <div
      className="flex items-center justify-center"
      style={{
        position: 'absolute',
        top: 'clamp(20px, 3.3vw, 34px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(42px, 6.35vw, 65px)',
        height: 'clamp(42px, 6.35vw, 65px)',
        fontSize: 'clamp(40px, 6.3vw, 64.8px)',
        lineHeight: '78px',
      }}
    >
      {icon}
    </div>

    {/* Text content */}
    <div
      className="flex flex-col items-start"
      style={{
        position: 'absolute',
        top: 'clamp(78px, 12.6vw, 129px)',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(240px, 29.2vw, 299px)',
        padding: '0 8px',
        gap: 'clamp(10px, 1.66vw, 17px)',
        display: 'flex',
        boxSizing: 'border-box' as const,
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(14px, 2.15vw, 22px)',
          lineHeight: '27px',
          color: '#000000',
          width: '100%',
          textAlign: 'left',
        }}
      >
        {title}
      </h4>

      <div className="flex flex-col items-start" style={{ gap: 'clamp(10px, 1.66vw, 17px)', width: '100%' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(11px, 1.56vw, 16px)',
            lineHeight: '19px',
            textTransform: 'uppercase' as const,
            color: '#565555',
            textAlign: 'left',
            width: '100%',
          }}
        >
          {subtitle}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(12px, 1.76vw, 18px)',
            lineHeight: '22px',
            color: '#000000',
            textAlign: 'left',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
);

const KeyFindingQuote: React.FC<{ finding: KeyFinding; index: number }> = ({ finding, index }) => (
  <div
    className="flex flex-col items-start justify-center"
    style={{
      background: '#FFFFFF',
      borderRadius: '23px',
      padding: '20px',
      boxSizing: 'border-box' as const,
      height: '180px',
    }}
  >
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '150%',
        color: '#313131',
        textAlign: 'left',
        width: '100%',
        marginBottom: '8px',
      }}
    >
      Pain point {index + 1}
    </p>
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 590,
        fontSize: 'clamp(13px, 2.15vw, 22px)',
        lineHeight: '28px',
        color: '#313131',
        textAlign: 'left',
        width: '100%',
        marginBottom: '8px',
      }}
    >
      <span style={{ marginLeft: '-0.3em' }}>"</span>{finding.content}"
    </p>
    {finding.subtext && (
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '15px',
          lineHeight: '150%',
          color: '#313131',
          textAlign: 'left',
          width: '100%',
        }}
      >
        {finding.subtext}
      </p>
    )}
  </div>
);

const KeyFindingStat: React.FC<{ finding: KeyFinding }> = ({ finding }) => (
  <div
    className="flex flex-col justify-center"
    style={{
      background: '#262E71',
      borderRadius: '23px',
      padding: '20px',
      boxSizing: 'border-box' as const,
      height: '180px',
    }}
  >
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 510,
        fontSize: 'clamp(22px, 3.52vw, 36px)',
        lineHeight: '42px',
        color: '#FFFFFF',
        marginBottom: '8px',
      }}
    >
      {finding.value}
    </p>
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: '15px',
        lineHeight: '150%',
        color: '#FFFFFF',
      }}
    >
      {finding.content}
    </p>
  </div>
);

const DesignVersionCard: React.FC<{
  title: string;
  status?: 'winner' | 'discarded';
  pros?: string[];
  cons?: string[];
  image?: string;
  video?: string;
  variant?: 'default' | 'minimal';
}> = ({ title, status, pros, cons, image, video, variant = 'default' }) => {
  if (variant === 'minimal') {
    return (
      <div className="h-full flex flex-col">
        {video && (
          <div className="rounded-lg overflow-hidden w-full">
            <video
              src={video}
              className="w-full h-auto rounded-lg shadow-lg"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        )}
        {!video && image && (
          <div className="rounded-lg overflow-hidden w-full">
            <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 text-[#313131] h-full flex flex-col">
      {/* Top Status Badge */}
      {status && (
        <div className={`flex items-center self-center w-fit gap-2 px-4 py-1.5 rounded-[10px] border shadow-sm transition-all mb-6 ${status === 'winner'
          ? 'bg-[#F2FCE2] border-[#D4F4B8] text-[#3F7C16]'
          : 'bg-[#F5F5F5] border-[#E8E8E8] text-[#8C8C8C]'
          }`}>
          {status === 'winner' ? (
            <Check className="w-4 h-4" strokeWidth={3.5} />
          ) : (
            <X className="w-4 h-4" strokeWidth={3} />
          )}
          <span className="text-xs font-bold tracking-[0.1em] uppercase">
            {status}
          </span>
        </div>
      )}

      {video && (
        <div className="relative w-full max-w-[520px] mx-auto mt-4 mb-10">
          {/* Screen Bezel */}
          <div className="relative bg-[#1A1A1A] rounded-[16px] p-[6px] pb-[8px] shadow-xl border border-gray-200/10 z-10">
            {/* Notch */}
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[90px] h-[18px] bg-[#1A1A1A] rounded-b-[10px] z-20 flex justify-center items-center pt-0.5">
              {/* Camera dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-black/50 border border-white/5 shadow-inner"></div>
            </div>

            {/* Screen Content */}
            <div className="relative w-full aspect-[16/10] bg-white rounded-[10px] overflow-hidden border border-black/20">
              <video
                src={video}
                className="w-full h-full object-cover object-top"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Bottom Base (Body) */}
          <div className="relative mx-auto -mt-[3px] z-20">
            <div className="h-[12px] bg-gradient-to-b from-[#A5AAB0] to-[#6A7077] rounded-b-[16px] rounded-t-[2px] w-[108%] -ml-[4%] shadow-[0_8px_20px_rgba(0,0,0,0.25)] flex justify-center">
              {/* Little indent for opening */}
              <div className="w-20 h-1.5 bg-[#4A4F54] rounded-b-[6px] opacity-70"></div>
            </div>
          </div>
          {/* Floor Shadow */}
          <div className="absolute -bottom-5 left-[5%] right-[5%] h-6 bg-black/15 blur-[14px] rounded-[100%]" />
        </div>
      )}

      {!video && image && (
        <div className="rounded-lg overflow-hidden mb-10 shadow-sm border border-gray-100">
          <img src={image} alt={title} className="w-full rounded-lg" />
        </div>
      )}

      {/* Caption & Status Badge */}
      <div className="flex flex-col items-center justify-center gap-3 mb-8 w-full">
        <div className="w-full max-w-[480px] flex flex-col gap-3">
          <h4 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(13px, 1.76vw, 18px)',
            color: '#000000',
            lineHeight: '150%',
            textAlign: 'left'
          }}>
            {title}
          </h4>
        </div>

        {/* Pros and Cons List */}
        <div className="space-y-4 mt-auto pt-6 border-t border-gray-100 flex flex-col items-center w-full">
          <div className="w-full max-w-[480px] flex flex-col gap-4">
            {pros && pros.map((pro, i) => (
              <div key={`pro-${i}`} className="flex items-start gap-3.5 group">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#EAF5E5] text-[#3F7C16] flex-shrink-0 mt-[1.5px] transition-colors group-hover:bg-[#3F7C16] group-hover:text-white">
                  <Check className="w-3.5 h-3.5" strokeWidth={4} />
                </div>
                <span className="text-left" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.76vw, 18px)',
                  lineHeight: '150%',
                  color: '#000000'
                }}>
                  {pro}
                </span>
              </div>
            ))}
            {cons && cons.map((con, i) => (
              <div key={`con-${i}`} className="flex items-start gap-3.5 group">
                <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#F5E5E5] text-[#D83232] flex-shrink-0 mt-[1.5px] transition-colors group-hover:bg-[#D83232] group-hover:text-white">
                  <X className="w-3.5 h-3.5" strokeWidth={3.5} />
                </div>
                <span className="text-left" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(13px, 1.76vw, 18px)',
                  lineHeight: '150%',
                  color: '#000000'
                }}>
                  {con}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ number: number; title: string; description: string }> = ({
  number, title, description
}) => (
  <div className="flex gap-5">
    <div className="w-[38px] h-[38px] rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 mt-0.5">
      <span style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(13px, 1.76vw, 18px)',
        color: '#000000'
      }}>{number}</span>
    </div>
    <div className="pt-1">
      <h4 style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(13px, 2.15vw, 22px)',
        color: '#000000',
        marginBottom: '8px'
      }}>
        {title}
      </h4>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(13px, 1.76vw, 18px)',
        lineHeight: '150%',
        color: '#000000'
      }}>
        {description}
      </p>
    </div>
  </div>
);

const LaptopMockup: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="relative w-full max-w-[520px] mx-auto">
    {/* Screen */}
    <div className="relative bg-[#1a1a2e] rounded-t-[12px] border-[8px] border-[#2d2d3d] overflow-hidden shadow-2xl">
      <div className="relative w-full aspect-[16/10]">
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
      </div>
    </div>
    {/* Hinge / Bottom bar */}
    <div className="relative mx-auto">
      <div className="h-[14px] bg-gradient-to-b from-[#c0c0c8] to-[#a8a8b0] rounded-b-[4px] mx-[8%]" />
      <div className="h-[6px] bg-gradient-to-b from-[#d0d0d8] to-[#b8b8c0] rounded-b-[8px] mx-[4%]" />
    </div>
    {/* Shadow */}
    <div className="absolute -bottom-3 left-[10%] right-[10%] h-4 bg-black/10 blur-lg rounded-full" />
  </div>
);

import { TeamAvatars } from './TeamAvatars';

const ContentSectionComponent: React.FC<{ section: ContentSection; index: number }> = ({ section, index }) => (
  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
    <div className="md:w-1/2">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.title}</h3>
      <p className="text-gray-600 leading-relaxed">{section.description}</p>
    </div>
    {section.image && (
      <div className="md:w-1/2">
        <img
          src={section.image}
          alt={section.title}
          className="w-full rounded-2xl shadow-lg"
        />
        {section.imageCaption && (
          <p className="text-sm text-gray-500 mt-2 text-center">{section.imageCaption}</p>
        )}
      </div>
    )}
  </div>
);

// Iteration After Testing Section — split Before/After carousel with arrows & descriptions
const IATSection: React.FC<{
  title: string;
  description: string;
  images: string[];
  descriptions?: { before?: string; after?: string }[];
}> = ({ title, description, images, descriptions = [] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const total = images.length;
  const lastScrollTime = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef(activeSlide);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  const goTo = useCallback((i: number) => {
    setActiveSlide(Math.max(0, Math.min(i, total - 1)));
  }, [total]);

  const canPrev = activeSlide > 0;
  const canNext = activeSlide < total - 1;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleWheelNative = (e: WheelEvent) => {
      // Determine if the scroll is primarily horizontal
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault(); // <-- Prevents Safari/Chrome native "swipe to go back/forward"

        if (Math.abs(e.deltaX) > 15) {
          const now = Date.now();
          // Throttle slide changes to one every 800ms
          if (now - lastScrollTime.current > 800) {
            if (e.deltaX > 0 && activeSlideRef.current < total - 1) {
              goTo(activeSlideRef.current + 1);
              lastScrollTime.current = now;
            } else if (e.deltaX < 0 && activeSlideRef.current > 0) {
              goTo(activeSlideRef.current - 1);
              lastScrollTime.current = now;
            }
          }
        }
      }
    };

    // passive: false allows e.preventDefault() to work
    el.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', handleWheelNative);
  }, [goTo, total]);

  const LABEL: React.CSSProperties = {
    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: '28px',
    lineHeight: '36px',
    color: '#000000',
    display: 'block',
    marginBottom: '10px',
  };

  const DESC: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '160%',
    color: '#555555',
    maxWidth: '340px',
  };

  const ARROW_BTN: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    background: 'rgba(255,255,255,0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    transition: 'opacity 0.2s',
  };

  return (
    <FadeIn>
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Section title + description */}
        <motion.div
          style={{ maxWidth: '1076px', margin: '0 auto 48px', width: '100%' }}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ margin: '-50px' }}
        >
          <h2 style={{ fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 400, fontSize: 'clamp(22px, 3.42vw, 35px)', lineHeight: '42px', color: '#000000', marginBottom: '18px' }}>
            {title}
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 'clamp(13px, 1.76vw, 18px)', lineHeight: '150%', color: '#000000', maxWidth: '480px' }}>
            {description}
          </p>
        </motion.div>

        {/* Carousel wrapper — relative for arrow buttons */}
        <div style={{ position: 'relative', maxWidth: '960px', margin: '0 auto', width: '100%' }}>

          {/* ← Prev arrow */}
          {canPrev && (
            <button onClick={() => goTo(activeSlide - 1)} style={{ ...ARROW_BTN, left: '16px' }} aria-label="Previous">
              <ChevronLeft size={22} color="#000" />
            </button>
          )}
          {/* → Next arrow */}
          {canNext && (
            <button onClick={() => goTo(activeSlide + 1)} style={{ ...ARROW_BTN, right: '16px' }} aria-label="Next">
              <ChevronRight size={22} color="#000" />
            </button>
          )}

          {/* Viewport */}
          <div
            ref={viewportRef}
            style={{ overflow: 'hidden', borderRadius: '24px', width: '100%', userSelect: 'none', cursor: 'grab' }}
          >
            {/* Sliding track */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, info) => {
                const T = 50; // drag distance required to snap
                const V = 300; // drag velocity required
                if (info.offset.x < -T || info.velocity.x < -V) goTo(activeSlide + 1);
                else if (info.offset.x > T || info.velocity.x > V) goTo(activeSlide - 1);
              }}
              animate={{ x: `-${(activeSlide * 100) / total}%` }}
              transition={{ type: 'spring', stiffness: 320, damping: 38, mass: 0.8 }}
              style={{ display: 'flex', width: `${total * 100}%` }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {images.map((img, i) => {
                const desc = descriptions[i] ?? {};
                return (
                  <div key={i} className="flex-col md:flex-row" style={{ width: `${100 / total}%`, flexShrink: 0, display: 'flex', minHeight: '480px' }}>

                    {/* ── Before panel (white) ── */}
                    <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                      {/* Text header */}
                      <div style={{ padding: '36px 36px 0', overflow: 'hidden' }}>
                        <motion.span
                          initial={false}
                          animate={{ x: activeSlide === i ? 0 : -40, opacity: activeSlide === i ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut', delay: activeSlide === i ? 0.2 : 0 }}
                          style={{ ...LABEL, display: 'block' }}
                        >
                          Before
                        </motion.span>
                        {desc.before && (
                          <motion.p
                            initial={false}
                            animate={{ x: activeSlide === i ? 0 : -40, opacity: activeSlide === i ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: activeSlide === i ? 0.3 : 0 }}
                            style={DESC}
                          >
                            {desc.before}
                          </motion.p>
                        )}
                      </div>
                      {/* Image — left half of composite, anchored to bottom */}
                      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', marginTop: '24px' }}>
                        <img
                          src={img}
                          alt={`Before – slide ${i + 1}`}
                          draggable={false}
                          style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'contain' }}
                        />
                      </div>
                    </div>

                    {/* ── After panel (blue) ── */}
                    <div style={{ flex: 1, background: '#B4CAD5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      {/* Text header */}
                      <div style={{ padding: '36px 36px 0', overflow: 'hidden' }}>
                        <motion.span
                          initial={false}
                          animate={{ x: activeSlide === i ? 0 : -40, opacity: activeSlide === i ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: 'easeOut', delay: activeSlide === i ? 0.4 : 0 }}
                          style={{ ...LABEL, display: 'block' }}
                        >
                          After
                        </motion.span>
                        {desc.after && (
                          <motion.p
                            initial={false}
                            animate={{ x: activeSlide === i ? 0 : -40, opacity: activeSlide === i ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: activeSlide === i ? 0.5 : 0 }}
                            style={DESC}
                          >
                            {desc.after}
                          </motion.p>
                        )}
                      </div>
                      {/* Image — right half of composite, anchored to bottom */}
                      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
                        <img
                          src={img}
                          alt={`After – slide ${i + 1}`}
                          draggable={false}
                          style={{ width: '200%', maxWidth: 'none', height: 'auto', display: 'block', objectFit: 'contain', marginLeft: '-100%' }}
                        />
                      </div>
                    </div>

                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Dot pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: '12px', height: '12px', borderRadius: '50%', border: 'none',
                cursor: 'pointer', padding: 0,
                background: i === activeSlide ? '#313131' : '#D9D9D9',
                transition: 'background 0.25s ease',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </FadeIn>
  );
};

// Project Content Component (renders one project's case study content)

const ProjectContent: React.FC<{ project: Project }> = ({ project }) => {
  const caseStudy = project.caseStudy;

  if (!caseStudy) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-serif text-gray-900 mb-8">{project.title}</h1>
        <p className="text-xl text-gray-600">{project.description}</p>
      </div>
    );
  }

  const isNarrativeStyle = caseStudy.approach || caseStudy.contentSections;

  const pageBg = '#FAF9F6';

  return (
    <div style={{ backgroundColor: pageBg, position: 'relative' }}>
      {/* Project NavBar - for projects with caseStudy sections */}
      {(caseStudy.research || caseStudy.strategy || caseStudy.solution) && <ProjectNavBar />}

      {/* Hero Section */}
      <section className="mx-auto px-6 pt-12 pb-12" style={{ maxWidth: '1200px' }}>
        {isNarrativeStyle ? (
          <>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6">
                  {caseStudy.heroTitle}
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
                  {caseStudy.heroSubtitle}
                </p>
              </FadeIn>
            </div>

            {caseStudy.heroImage && (
              <FadeIn delay={0.3} scale>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8E4F0] to-[#D4CCE8] p-8 mb-12">
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={caseStudy.heroImage}
                    alt={project.title}
                    className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </FadeIn>
            )}

            {/* Project Info Bar - Narrative */}
            {caseStudy.projectInfo && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border border-gray-200 rounded-xl p-6 bg-white">
                {caseStudy.projectInfo.map((info, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-2">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{info.value}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : caseStudy.heroStyle === 'open' ? (
          <>
            {/* Open-style: White container card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm border border-gray-100 mx-auto w-full max-w-[80%] min-h-[85vh] flex flex-col justify-between">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 flex-1">
                {/* Left: Title + Description */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <FadeIn delay={0.1}>
                    <h1 className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-gray-900 leading-[1.15] mb-6">
                      {caseStudy.heroTitle}
                    </h1>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <p className="text-base text-gray-500 leading-relaxed max-w-md">
                      {caseStudy.heroSubtitle}
                    </p>
                  </FadeIn>
                </div>

                {/* Right: Mockup image */}
                {caseStudy.heroImage && (
                  <div className="md:w-1/2 flex items-center justify-center">
                    <FadeIn delay={0.3} scale>
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                        src={caseStudy.heroImage}
                        alt={project.title}
                        className="w-full max-w-md rounded-2xl"
                      />
                    </FadeIn>
                  </div>
                )}
              </div>

              {/* Project Info Bar - bottom of card */}
              {caseStudy.projectInfo && (
                <div className="flex flex-wrap items-start justify-between gap-8 mt-10 pt-8 border-t border-gray-100">
                  {caseStudy.projectInfo.map((info, i) => (
                    <div key={i} className="flex flex-col">
                      <p className="text-xs font-semibold tracking-wide text-gray-900 mb-1">
                        {info.label}
                      </p>
                      <p className="text-sm text-gray-500">{info.value}</p>
                    </div>
                  ))}
                  {caseStudy.team && (
                    <div className="flex flex-col">
                      <p className="text-xs font-semibold tracking-wide text-gray-900 mb-1">
                        Team
                      </p>
                      <TeamAvatars team={caseStudy.team} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <FadeIn>
            {/* Card-style: White hero card — Figma Frame 268 */}
            <div
              className="mx-auto w-full"
              style={{
                maxWidth: '1129px',
                background: '#FFFFFF',
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              {/* Content row: text + image */}
              <div
                className="flex flex-col md:flex-row items-center"
                style={{ padding: '73px 35px 0', gap: '27px' }}
              >
                {/* Left: Title + Description — Frame 280 */}
                <div
                  className="flex flex-col flex-shrink-0"
                  style={{ width: 'clamp(280px, 40vw, 450px)', maxWidth: '100%', gap: 'clamp(24px, 4.5vw, 46px)' }}
                >
                  <h1
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(18px, 2.8vw, 35px)',
                      lineHeight: '42px',
                      color: caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71',
                    }}
                  >
                    {caseStudy.heroTitle}
                  </h1>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(14px, 2vw, 25px)',
                      lineHeight: '160%',
                      color: '#565555',
                    }}
                  >
                    {caseStudy.heroSubtitle}
                  </p>
                </div>

                {/* Right: Thumbnail image */}
                {caseStudy.heroImage && (
                  <div className="flex items-center justify-center flex-1">
                    <img
                      src={caseStudy.heroImage}
                      alt={project.title}
                      className="w-full"
                      style={{
                        maxWidth: '580px',
                        aspectRatio: '573 / 407',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '24px',
                        transform: 'rotate(0.2deg)',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Project Info Bar — Frame 277 */}
              {caseStudy.projectInfo && (
                <div
                  className="flex flex-wrap md:flex-nowrap items-start justify-start sm:justify-center mx-auto"
                  style={{ gap: 'clamp(20px, 5vw, 100px)', padding: 'clamp(40px, 7.8vw, 80px) clamp(16px, 5vw, 35px) 50px' }}
                >
                  {caseStudy.projectInfo.map((info, i) => (
                    <div key={i} className="flex flex-col flex-shrink-0" style={{ gap: '15px' }}>
                      <p
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                          fontWeight: 590,
                          fontSize: 'clamp(14px, 2.15vw, 22px)',
                          lineHeight: '26px',
                          color: '#565555',
                        }}
                      >
                        {info.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(12px, 1.76vw, 18px)',
                          lineHeight: '22px',
                          color: '#565555',
                        }}
                      >
                        {info.value}
                      </p>
                    </div>
                  ))}
                  {caseStudy.team && (
                    <div className="flex flex-col flex-shrink-0" style={{ gap: '10px' }}>
                      <p
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                          fontWeight: 590,
                          fontSize: 'clamp(14px, 2.15vw, 22px)',
                          lineHeight: '26px',
                          color: '#565555',
                        }}
                      >
                        Team
                      </p>
                      <TeamAvatars team={caseStudy.team} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        )}
      </section>

      {/* Overview Section */}
      <div id="overview" className="scroll-mt-32">
        <FadeIn>
          {isNarrativeStyle ? (
            <section className="max-w-6xl mx-auto px-6 py-16">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <FadeIn delay={0.1} className="h-full"><OverviewCard {...caseStudy.overview.problem} /></FadeIn>
                  <FadeIn delay={0.2} className="h-full"><OverviewCard {...caseStudy.overview.goal} /></FadeIn>
                  {caseStudy.overview.outcome ? (
                    <FadeIn delay={0.3} className="h-full"><OverviewCard {...caseStudy.overview.outcome} /></FadeIn>
                  ) : caseStudy.overview.role ? (
                    <FadeIn delay={0.3} className="h-full"><OverviewCard {...caseStudy.overview.role} /></FadeIn>
                  ) : null}
                </div>
              </div>
            </section>
          ) : (
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1120px' }}>
              {/* Overview title — SF Pro 510 50px, mismo estilo para todos los proyectos */}
              {project.id !== 1 && project.id !== 2 ? (
                <div className="!py-0 !mb-12 flex justify-center scroll-mt-24">
                  <h2
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(18px, 2.93vw, 30px)',
                      lineHeight: '36px',
                      textAlign: 'center',
                      color: '#565555',
                    }}
                  >
                    Overview
                  </h2>
                </div>
              ) : (
                <div className="mb-24 mt-16" />
              )}

              {/* Overview rows — Frame 282 */}
              <div
                className="flex flex-col"
                style={{ gap: '34px', padding: '8px', maxWidth: '1078px', margin: '0 auto' }}
              >
                {/* Context */}
                {caseStudy.overview.context && (
                  <>
                    <motion.div
                      initial={{ x: -150, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ margin: "-50px" }}
                      className="flex flex-col md:flex-row flex-wrap items-start"
                      style={{ gap: '20px' }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: 'clamp(22px, 3.42vw, 35px)',
                          lineHeight: '42px',
                          color: '#000000',
                          flexShrink: 0,
                          width: '100%',
                          maxWidth: '300px',
                        }}
                      >
                        {caseStudy.overview.context.title}
                      </h3>
                      <p
                        className="flex-1"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(14px, 1.95vw, 20px)',
                          lineHeight: '150%',
                          color: '#000000',
                          maxWidth: '649px',
                        }}
                      >
                        {caseStudy.overview.context.description}
                      </p>
                    </motion.div>

                    {/* Divider */}
                    <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />
                  </>
                )}

                {/* Problem */}
                <motion.div
                  initial={{ x: -150, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ margin: "-50px" }}
                  className="flex flex-col md:flex-row flex-wrap items-start"
                  style={{ gap: '20px' }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(22px, 3.42vw, 35px)',
                      lineHeight: '42px',
                      color: '#000000',
                      flexShrink: 0,
                      width: '300px',
                    }}
                  >
                    {caseStudy.overview.problem.title}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(14px, 1.95vw, 20px)',
                      lineHeight: '150%',
                      color: '#000000',
                      maxWidth: '649px',
                    }}
                  >
                    {caseStudy.overview.problem.description}
                  </p>
                </motion.div>

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Goal */}
                <motion.div
                  initial={{ x: -150, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ margin: "-50px" }}
                  className="flex flex-col md:flex-row flex-wrap items-start"
                  style={{ gap: '20px' }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: 'clamp(22px, 3.42vw, 35px)',
                      lineHeight: '42px',
                      color: '#000000',
                      flexShrink: 0,
                      width: '300px',
                    }}
                  >
                    {caseStudy.overview.goal.title}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(14px, 1.95vw, 20px)',
                      lineHeight: '150%',
                      color: '#000000',
                      maxWidth: '649px',
                    }}
                  >
                    {caseStudy.overview.goal.description}
                  </p>
                </motion.div>

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Outcome or Role */}
                {caseStudy.overview.outcome ? (
                  <motion.div
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                    className="flex flex-col md:flex-row flex-wrap items-start"
                    style={{ gap: '20px' }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(22px, 3.42vw, 35px)',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                        width: '300px',
                      }}
                    >
                      {caseStudy.overview.outcome.title}
                    </h3>
                    <div className="flex-1 flex flex-col gap-6 max-w-[649px]">
                      {caseStudy.overview.outcome.description && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: 'clamp(14px, 1.95vw, 20px)',
                            lineHeight: '150%',
                            color: '#000000',
                          }}
                        >
                          {caseStudy.overview.outcome.description}
                        </p>
                      )}
                      {caseStudy.overview.outcome.metrics && caseStudy.overview.outcome.metrics.length > 0 && (
                        <div className="flex flex-col gap-4">
                          {caseStudy.overview.outcome.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-4"
                              style={{
                                backgroundColor: '#FFFFFF',
                                padding: '16px 24px',
                                borderRadius: '100px',
                                width: 'fit-content'
                              }}
                            >
                              {metric.trend === 'up' ? (
                                <ArrowUp style={{ color: project.id === 2 ? '#B4CAD5' : (caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'), flexShrink: 0, marginTop: '2px' }} size={40} strokeWidth={2} />
                              ) : (
                                <ArrowDown style={{ color: project.id === 2 ? '#B4CAD5' : (caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'), flexShrink: 0, marginTop: '2px' }} size={40} strokeWidth={2} />
                              )}
                              <span
                                style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontWeight: 400,
                                  fontSize: 'clamp(14px, 1.95vw, 20px)',
                                  color: '#333333',
                                }}
                              >
                                {metric.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : caseStudy.overview.role ? (
                  <motion.div
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                    className="flex flex-col md:flex-row flex-wrap items-start"
                    style={{ gap: '20px' }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(22px, 3.42vw, 35px)',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                        width: '300px',
                      }}
                    >
                      {caseStudy.overview.role.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(14px, 1.95vw, 20px)',
                        lineHeight: '150%',
                        color: '#000000',
                        maxWidth: '649px',
                      }}
                    >
                      {caseStudy.overview.role.description}
                    </p>
                  </motion.div>
                ) : null}

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Additional Outcome if explicit */}
                {caseStudy.outcome && !caseStudy.overview.outcome && (
                  <motion.div
                    initial={{ x: -150, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                    className="flex flex-col md:flex-row flex-wrap items-start"
                    style={{ gap: '20px' }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 'clamp(22px, 3.42vw, 35px)',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                        width: '300px',
                      }}
                    >
                      Outcome
                    </h3>
                    <RichText
                      text={caseStudy.outcome.description}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(14px, 1.95vw, 20px)',
                        lineHeight: '150%',
                        color: '#000000',
                        maxWidth: '649px',
                      }}
                      className="flex-1"
                    />
                  </motion.div>
                )}
              </div>
            </section>
          )}
        </FadeIn>
      </div>

      {/* Approach Section (Narrative Style) */}
      {
        caseStudy.approach && (
          <section className="max-w-4xl mx-auto px-6 py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {caseStudy.approach.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {caseStudy.approach.description}
              </p>
            </FadeIn>
          </section>
        )
      }

      {/* Key Insight (Narrative Style) */}
      {
        caseStudy.keyInsight && (
          <section className="max-w-4xl mx-auto px-6 py-12">
            <FadeIn scale>
              <div className="flex items-center justify-center gap-6">
                <Key className="w-12 h-12 text-gray-400" />
                <p className="text-xl md:text-2xl font-medium text-gray-900">
                  {caseStudy.keyInsight.text}
                </p>
              </div>
            </FadeIn>
          </section>
        )
      }

      {/* Content Sections (Narrative Style) */}
      {
        caseStudy.contentSections && caseStudy.contentSections.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 py-16 space-y-24">
            {caseStudy.contentSections.map((section, i) => (
              <ContentSectionComponent key={i} section={section} index={i} />
            ))}
          </section>
        )
      }

      {/* Impact Section (Narrative Style) */}
      {
        caseStudy.impact && (
          <section className="max-w-4xl mx-auto px-6 py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {caseStudy.impact.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {caseStudy.impact.description}
              </p>
            </FadeIn>
          </section>
        )
      }

      {/* Quote (Narrative Style) */}
      {
        caseStudy.quote && (
          <section className="max-w-4xl mx-auto px-6 py-12">
            <FadeIn scale>
              <blockquote className="text-xl md:text-2xl font-serif italic text-gray-700 text-center border-l-4 border-[#E07A5F] pl-6 py-4">
                {caseStudy.quote}
              </blockquote>
            </FadeIn>
          </section>
        )
      }

      {/* Lesson Learned (Narrative Style) */}
      {
        caseStudy.lessonLearned && (
          <section className="max-w-4xl mx-auto px-6 py-16">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {caseStudy.lessonLearned.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {caseStudy.lessonLearned.description}
              </p>
            </FadeIn>
          </section>
        )
      }

      {/* Research Section (Phase Style) */}
      {
        caseStudy.research && (
          <>
            <SectionHeader id="research" title="Research" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} hideTitle={project.id === 1 || project.id === 2} />
            <section className="mx-auto px-6 pb-16 pt-0" style={{ maxWidth: '1280px' }}>
              <FadeIn>

                {/* Research title + description — Frame 292 */}
                {/* Research title + description — Frame 292 */}
                <div className="flex flex-col items-center" style={{ gap: '44px', maxWidth: '1200px', margin: '0 auto' }}>
                  <motion.div
                    className="flex flex-col w-full text-left"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                    style={{ gap: '18px', maxWidth: '1076px' }}
                  >
                    <h3
                      style={{
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(22px, 3.42vw, 35px)',
                        lineHeight: '42px',
                        color: '#313131',
                      }}
                    >
                      {caseStudy.research.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(13px, 1.76vw, 18px)',
                        lineHeight: '150%',
                        color: '#000000',
                        maxWidth: '480px',
                      }}
                    >
                      {caseStudy.research.description}
                    </p>
                  </motion.div>

                  {/* Persona Image (if present) or Cards */}
                  {caseStudy.research.personaImage ? (
                    <div className="w-full mt-8">
                      <img
                        src={caseStudy.research.personaImage}
                        alt="Research Personas"
                        className="w-full h-auto rounded-2xl shadow-sm"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex flex-wrap items-center justify-center"
                      style={{ gap: '34px', padding: '4px' }}
                    >
                      {caseStudy.research.personas.map((persona, i) => (
                        <FadeIn key={i} delay={i * 0.15}>
                          <PersonaCard {...persona} accentColor={caseStudy.research!.cardAccentColor || '#262E71'} />
                        </FadeIn>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            </section>
          </>
        )
      }

      {
        caseStudy.keyFindings && (
          <section className="mx-auto" style={{ maxWidth: caseStudy.keyFindings.backgroundImage ? '100%' : '1200px', padding: caseStudy.keyFindings.backgroundImage ? '0' : '4rem 1.5rem', marginTop: caseStudy.keyFindings.backgroundImage ? '120px' : '0' }}>
            <FadeIn>
              {caseStudy.keyFindings.backgroundImage ? (
                <div className="relative w-full overflow-hidden flex items-center justify-center bg-black">
                  <img
                    src={caseStudy.keyFindings.backgroundImage}
                    alt="Key Insight Background"
                    className="w-full object-cover block"
                    style={{ height: '85vh', maxHeight: '850px', objectPosition: 'center 25%' }}
                  />
                  <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-6"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ margin: "-50px" }}
                    >
                      <h2
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(16px, 2vw, 24px)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {caseStudy.keyFindings.title}
                      </h2>
                      {caseStudy.keyFindings.description && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: 'clamp(20px, 3.5vw, 32px)',
                            lineHeight: '140%',
                            color: '#FFFFFF',
                          }}
                        >
                          {caseStudy.keyFindings.description}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Title + Description — Frame 289 header */}
                  <motion.div
                    style={{ maxWidth: '1076px', margin: '0 auto', width: '100%' }}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                  >
                    <h2
                      style={{
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(22px, 3.42vw, 35px)',
                        lineHeight: '42px',
                        color: '#000000',
                        marginBottom: '18px',
                      }}
                    >
                      {caseStudy.keyFindings.title}
                    </h2>
                    {caseStudy.keyFindings.description && (
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(13px, 1.76vw, 18px)',
                          lineHeight: '150%',
                          color: '#000000',
                          maxWidth: '480px',
                          marginBottom: '48px',
                        }}
                      >
                        {caseStudy.keyFindings.description}
                      </p>
                    )}
                  </motion.div>

                  {/* 2x2 Grid: quote + stat pairs — "My values" layout */}
                  {caseStudy.keyFindings.findings.length > 0 && (
                    <div
                      className="grid grid-cols-1 md:grid-cols-2"
                      style={{ gap: '51px 37px', maxWidth: '1141px', margin: '0 auto' }}
                    >
                      {caseStudy.keyFindings.findings
                        .filter(f => f.type === 'quote')
                        .map((quote, i) => {
                          const stat = caseStudy.keyFindings!.findings.filter(f => f.type === 'stat')[i];
                          return (
                            <React.Fragment key={i}>
                              <div className="h-full">
                                <motion.div
                                  className="h-full"
                                  initial={{ y: 50, opacity: 0 }}
                                  whileInView={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                                  viewport={{ margin: "-50px" }}
                                >
                                  <KeyFindingQuote finding={quote} index={i} />
                                </motion.div>
                              </div>
                              {stat && (
                                <div className="h-full">
                                  <motion.div
                                    className="h-full"
                                    initial={{ y: 50, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 + 0.1 }}
                                    viewport={{ margin: "-50px" }}
                                  >
                                    <KeyFindingStat finding={stat} />
                                  </motion.div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                  )}
                </>
              )}
            </FadeIn>
          </section>
        )
      }

      {/* Development/Strategy Section (Phase Style) */}
      {
        caseStudy.strategy && (
          <>
            <SectionHeader id="development" title="Development" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} hideTitle={project.id === 1 || project.id === 2} />
            <section className="mx-auto px-6 pb-16 pt-0" style={{ maxWidth: '1200px' }}>
              <FadeIn>


                {project.id === 2 && caseStudy.strategy.diagramImage ? (
                  // Simple 2-column layout for Project 2 Strategy (User Flow)
                  <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
                    <div className="md:w-1/3 flex flex-col gap-6 sticky top-24">
                      <FadeIn delay={0.1}>
                        <h2
                          style={{
                            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                            fontWeight: 400,
                            fontSize: 'clamp(22px, 3.42vw, 35px)',
                            lineHeight: '42px',
                            color: '#000000',
                          }}
                        >
                          {caseStudy.strategy.title}
                        </h2>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: 'clamp(13px, 1.76vw, 18px)',
                            lineHeight: '150%',
                            color: '#000000',
                            marginTop: '24px'
                          }}
                        >
                          {caseStudy.strategy.description}
                        </p>
                      </FadeIn>
                    </div>
                    <div className="md:w-2/3">
                      <FadeIn delay={0.3} scale>
                        <img
                          src={caseStudy.strategy.diagramImage}
                          alt={caseStudy.strategy.title}
                          className="w-full h-auto rounded-2xl shadow-sm"
                        />
                      </FadeIn>
                    </div>
                  </div>
                ) : (
                  // Default Stacked Layout
                  <>
                    <motion.div
                      style={{ maxWidth: '1076px', margin: '0 auto', width: '100%' }}
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ margin: "-50px" }}
                    >
                      <h2
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(22px, 3.42vw, 35px)',
                          lineHeight: '42px',
                          color: '#000000',
                          marginBottom: '18px',
                        }}
                      >
                        {caseStudy.strategy.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(13px, 1.76vw, 18px)',
                          lineHeight: '150%',
                          color: '#000000',
                          maxWidth: '480px',
                          marginBottom: '48px',
                        }}
                      >
                        {caseStudy.strategy.description}
                      </p>
                    </motion.div>

                    {/* IA Diagram Container — Frame 287 */}
                    {caseStudy.strategy.diagramImage && (
                      <motion.div
                        className="mx-auto"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ margin: "-50px" }}
                        style={{
                          maxWidth: '1178px',
                          background: '#FFFFFF',
                          borderRadius: '24px',
                          padding: '57px 64px',
                        }}
                      >
                        <img
                          src={caseStudy.strategy.diagramImage}
                          alt="Information Architecture"
                          className="w-full mx-auto"
                          style={{ maxWidth: '1050px', borderRadius: '24px' }}
                        />
                      </motion.div>
                    )}

                    {/* Wireframes Scrolling Gallery */}
                    {caseStudy.strategy.wireframes && caseStudy.strategy.wireframes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ margin: "-50px" }}
                        className="mt-[150px] w-full overflow-x-hidden"
                      >
                        <div className="flex w-max relative pt-4 pb-12">
                          <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="flex gap-8 px-4 items-start"
                          >
                            {[...caseStudy.strategy.wireframes, ...caseStudy.strategy.wireframes].map((src, i) => (
                              <div
                                key={i}
                                className="flex-shrink-0 w-[300px] md:w-[450px] lg:w-[600px] rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-transform hover:scale-105 bg-white"
                                style={{ aspectRatio: '1440 / 1024' }}
                              >
                                <img src={src} alt={`Wireframe ${i}`} className="w-full h-full object-cover object-top block" />
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </FadeIn>
            </section>
          </>
        )
      }

      {/* Testing/Iteration Section (Phase Style) */}
      {
        caseStudy.iteration && (
          <section className="mx-auto px-6 py-16" style={{ maxWidth: '1200px' }}>
            <FadeIn>


              <motion.div
                style={{ maxWidth: '1076px', margin: '0 auto', width: '100%' }}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ margin: "-50px" }}
              >
                {caseStudy.iteration.title && (
                  <h2
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(22px, 3.42vw, 35px)',
                      lineHeight: '42px',
                      color: '#000000',
                      marginBottom: '18px',
                    }}
                  >
                    {caseStudy.iteration.title}
                  </h2>
                )}
                {caseStudy.iteration.description && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(13px, 1.76vw, 18px)',
                      lineHeight: '150%',
                      color: '#000000',
                      maxWidth: '480px',
                      marginBottom: '120px',
                    }}
                  >
                    {caseStudy.iteration.description}
                  </p>
                )}
                {caseStudy.iteration.image && (
                  <div style={{ marginTop: '80px', marginBottom: '80px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={caseStudy.iteration.image}
                      alt="Wireframes Overview"
                      draggable={false}
                      style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }}
                    />
                  </div>
                )}
              </motion.div>

              {caseStudy.iteration.versions?.length > 0 && (
                project.id === 2 ? (
                  // Custom 4-column layout for Project 2
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {/* Column 1: Team (Index 2) -> Project Type (Index 0) */}
                    <div className="flex flex-col gap-6">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        viewport={{ margin: "-50px" }}
                      >
                        {caseStudy.iteration.versions[2] && <DesignVersionCard {...caseStudy.iteration.versions[2]} variant="minimal" />}
                        {caseStudy.iteration.versions[0] && <DesignVersionCard {...caseStudy.iteration.versions[0]} variant="minimal" />}
                      </motion.div>
                    </div>

                    {/* Column 2: General Info (Index 1) */}
                    <div className="flex flex-col gap-6">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ margin: "-50px" }}
                      >
                        {caseStudy.iteration.versions[1] && <DesignVersionCard {...caseStudy.iteration.versions[1]} variant="minimal" />}
                      </motion.div>
                    </div>

                    {/* Column 3: Scope & Specs (Index 3) */}
                    <div className="flex flex-col gap-6">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        viewport={{ margin: "-50px" }}
                      >
                        {caseStudy.iteration.versions[3] && <DesignVersionCard {...caseStudy.iteration.versions[3]} variant="minimal" />}
                      </motion.div>
                    </div>

                    {/* Column 4: Finalize (Index 4) -> Confirmation (Index 5) */}
                    <div className="flex flex-col gap-6">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ margin: "-50px" }}
                      >
                        {caseStudy.iteration.versions[4] && <DesignVersionCard {...caseStudy.iteration.versions[4]} variant="minimal" />}
                        {caseStudy.iteration.versions[5] && <DesignVersionCard {...caseStudy.iteration.versions[5]} variant="minimal" />}
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  // Standard grid for other projects
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24">
                    {caseStudy.iteration.versions.map((version, i) => (
                      <FadeIn key={i} delay={i * 0.15}>
                        <DesignVersionCard {...version} />
                      </FadeIn>
                    ))}
                  </div>
                )
              )}
            </FadeIn>
          </section>
        )
      }

      {/* Iteration After Testing Section */}
      {
        caseStudy.iterationAfterTesting && (
          <>
            <SectionHeader id="testing" title="Testing" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} hideTitle={project.id === 1 || project.id === 2} />
            <IATSection
              title={caseStudy.iterationAfterTesting.title}
              description={caseStudy.iterationAfterTesting.description}
              images={caseStudy.iterationAfterTesting.images}
              descriptions={caseStudy.iterationAfterTesting.descriptions}
            />
          </>
        )
      }

      {/* Final Product/Solution Section (Phase Style) */}
      {
        caseStudy.solution && (
          <>
            <SectionHeader id="final-product" title="Final Product" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} hideTitle={project.id === 1 || project.id === 2} />
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1200px' }}>
              <FadeIn>
                <div style={{ maxWidth: '1076px', margin: '0 auto', width: '100%' }}>
                  <h2
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(22px, 3.42vw, 35px)',
                      lineHeight: '42px',
                      color: '#000000',
                      marginBottom: '18px',
                    }}
                  >
                    {caseStudy.solution.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(13px, 1.76vw, 18px)',
                      lineHeight: '150%',
                      color: '#000000',
                      maxWidth: '480px',
                      marginBottom: '48px',
                    }}
                  >
                    {caseStudy.solution.description}
                  </p>
                </div>

                {caseStudy.solution.demoVideo && (
                  <motion.div
                    className="relative mx-auto mb-20 mt-10"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ margin: "-50px" }}
                    style={{
                      maxWidth: project.id === 2 ? '500px' : '800px', // Slimmer max-width for portrait tablet
                      width: '100%',
                    }}
                  >
                    {project.id === 2 ? (
                      /* Tablet Mockup (iPad Portrait style) */
                      <div className="relative">
                        <div className="relative bg-[#1A1A1A] rounded-[32px] md:rounded-[48px] p-[12px] md:p-[16px] shadow-2xl border border-gray-200/20 z-10 w-full">
                          {/* Top Camera dot (Tablet portrait) */}
                          <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/5 shadow-inner z-20"></div>

                          {/* Screen Content */}
                          <div className="relative w-full aspect-[3/4] bg-black rounded-[22px] md:rounded-[34px] overflow-hidden border border-black/20 flex items-center justify-center">
                            <video
                              src={caseStudy.solution.demoVideo}
                              className="w-full h-full object-contain"
                              autoPlay
                              muted
                              playsInline
                              onTimeUpdate={(e) => {
                                // Loop from 2s to 18s for project 2 tablet video
                                if (e.currentTarget.currentTime >= 18) {
                                  e.currentTarget.currentTime = 2;
                                  e.currentTarget.play();
                                }
                              }}
                              onLoadedMetadata={(e) => {
                                e.currentTarget.currentTime = 2;
                              }}
                            />
                          </div>
                        </div>
                        {/* Floor Shadow */}
                        <div className="absolute -bottom-8 left-[5%] right-[5%] h-10 bg-black/25 blur-[20px] rounded-[100%]" />
                      </div>
                    ) : (
                      /* Laptop Mockup (MacBook style) */
                      <>
                        <div className="relative bg-[#1A1A1A] rounded-[32px] p-[14px] pb-[16px] shadow-2xl border border-gray-200/10 z-10 w-full">
                          {/* Notch */}
                          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-[#1A1A1A] rounded-b-[14px] z-20 flex justify-center items-center pt-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-black/50 border border-white/5 shadow-inner"></div>
                          </div>

                          {/* Screen Content */}
                          <div className="relative w-full aspect-[1872/1334] bg-gradient-to-b from-[#8B7FF0] via-[#C3B8FD] to-[#F1EEFE] rounded-[18px] overflow-hidden border border-black/20 flex items-center justify-center">
                            <video
                              src={caseStudy.solution.demoVideo}
                              className="w-full h-full object-contain"
                              style={{ backgroundColor: '#FAF9F6' }}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          </div>
                        </div>

                        {/* Bottom Base (Body) */}
                        <div className="relative mx-auto -mt-[6px] z-20">
                          <div className="h-[24px] bg-gradient-to-b from-[#A5AAB0] to-[#6A7077] rounded-b-[32px] rounded-t-[2px] w-[120%] -ml-[10%] shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex justify-center">
                            <div className="w-32 h-2.5 bg-[#4A4F54] rounded-b-[10px] opacity-70"></div>
                          </div>
                        </div>
                        {/* Floor Shadow */}
                        <div className="absolute -bottom-10 left-[2%] right-[2%] h-14 bg-black/20 blur-[24px] rounded-[100%]" />
                      </>
                    )}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {caseStudy.solution.features.map((feature, i) => (
                    <FadeIn key={feature.number} delay={i * 0.1}>
                      <FeatureItem {...feature} />
                    </FadeIn>
                  ))}
                </div>
              </FadeIn>
            </section>
          </>
        )
      }

      {/* Outcome Section removed as per request */}

    </div >
  );
};


const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onProjectChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextProjectRef = useRef<HTMLDivElement>(null);

  // Get all projects with case studies
  const projectsWithCaseStudies = PROJECTS.filter(p => p.type === 'project' && p.caseStudy);

  // Current project state
  const [currentProject, setCurrentProject] = useState(project);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Lock body scroll when component mounts
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Get next project in sequence
  const currentIndex = projectsWithCaseStudies.findIndex(p => p.id === currentProject.id);
  const nextIndex = (currentIndex + 1) % projectsWithCaseStudies.length;
  const nextProject = projectsWithCaseStudies[nextIndex];

  const triggerNextProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Update URL without reload
    const projectSlug = nextProject.title.toLowerCase().replace(/\s+/g, '-');
    window.history.pushState({ projectId: nextProject.id }, '', `/project/${projectSlug}`);

    // Notify parent if callback exists
    if (onProjectChange) {
      onProjectChange(nextProject);
    }

    // Smooth fade transition
    setTimeout(() => {
      // First scroll to top instantly but keep opacity at 0
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }

      // Then update project which will trigger fade in animation
      setCurrentProject(nextProject);
      setTransitionProgress(0);

      // Small delay before allowing new transitions
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 200);
  }, [isTransitioning, nextProject, onProjectChange]);

  // Handle scroll for transition progress
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !nextProjectRef.current || isTransitioning) return;

    const container = containerRef.current;
    const nextProjectEl = nextProjectRef.current;

    const containerRect = container.getBoundingClientRect();
    const nextProjectRect = nextProjectEl.getBoundingClientRect();

    // Calculate progress based on how much of next project is visible
    const nextProjectTop = nextProjectRect.top;
    const viewportHeight = containerRect.height;

    // Progress starts when next project enters viewport
    if (nextProjectTop < viewportHeight) {
      const visibleHeight = viewportHeight - nextProjectTop;
      const progress = Math.min(1, visibleHeight / viewportHeight);
      setTransitionProgress(progress);
    } else {
      setTransitionProgress(0);
    }
  }, [isTransitioning, triggerNextProject]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Reset when project prop changes externally
  useEffect(() => {
    setCurrentProject(project);
    setTransitionProgress(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [project]);

  return (
    <div className="fixed inset-0 z-[200]">

      {/* Fixed Back Button */}
      <div className="fixed top-6 left-6 z-[210]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 px-3 md:px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden md:inline">Back home</span>
        </button>
      </div>

      {/* Single scrollable container */}
      <div
        ref={containerRef}
        data-scroll-container
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* Spacer for fixed button */}
        <div className="h-20" style={{ background: '#FAF9F6' }} />

        {/* Current project content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ProjectContent project={currentProject} />
          </motion.div>
        </AnimatePresence>

        {/* Next Project Section — Frame 293 */}
        <section
          ref={nextProjectRef}
          className="relative w-full flex flex-col items-center"
          style={{
            minHeight: 'clamp(300px, 50vw, 595px)',
            backgroundColor: nextProject.backgroundColor || '#B4CAD5',
            paddingTop: 'clamp(32px, 5vw, 65px)',
            paddingBottom: 'clamp(40px, 6vw, 80px)',
          }}
        >
          {/* "Next Project" label */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(16px, 2.44vw, 25px)',
              lineHeight: '150%',
              color: '#FFFFFF',
              marginBottom: 'clamp(24px, 5.37vw, 55px)',
            }}
          >
            Next Project
          </p>

          {/* Content row — Frame 294 */}
          <div
            className="flex flex-col md:flex-row items-center justify-center mx-auto"
            style={{ maxWidth: '1171px', gap: 'clamp(24px, 7.3vw, 75px)', padding: '0 24px' }}
          >
            {/* Left: Image mockup */}
            <div
              className="relative flex-shrink-0"
              style={{ width: 'clamp(220px, 46vw, 472px)', maxWidth: '100%' }}
            >
              <img
                src={nextProject.mockup || nextProject.images[0]}
                alt={nextProject.title}
                className="w-full h-auto"
                style={{ borderRadius: '18.27px' }}
              />
            </div>

            {/* Right: Text content — Frame 256 */}
            <div
              className="flex flex-col items-center text-center md:items-start md:text-left"
              style={{ maxWidth: '633px', gap: '40px', padding: '0 11px' }}
            >
              {/* Title + Description */}
              <div className="flex flex-col" style={{ gap: '11px' }}>
                <h2
                  style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                    fontWeight: 590,
                    fontSize: 'clamp(22px, 4.39vw, 45px)',
                    lineHeight: '130%',
                    textTransform: 'capitalize' as const,
                    color: '#FFFFFF',
                  }}
                >
                  {nextProject.caseStudy?.heroTitle || nextProject.title}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1.76vw, 18px)',
                    lineHeight: '150%',
                    color: '#FFFFFF',
                  }}
                >
                  {nextProject.caseStudy?.heroSubtitle || nextProject.description}
                </p>
              </div>

              {/* Tags */}
              {nextProject.tags && nextProject.tags.length > 0 && (
                <div className="flex flex-nowrap justify-center md:justify-start" style={{ gap: 'clamp(5px, 0.88vw, 9px)' }}>
                  {nextProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center capitalize whitespace-nowrap"
                      style={{
                        padding: '0 clamp(7px, 1.17vw, 12px)',
                        height: 'clamp(18px, 2.25vw, 23px)',
                        background: '#FFFFFF',
                        borderRadius: '11px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 'clamp(11px, 1.37vw, 14px)',
                        lineHeight: '162.5%',
                        color: '#000000',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={triggerNextProject}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 19px',
                  gap: '7px',
                  width: '167px',
                  height: '38px',
                  background: 'rgba(255, 255, 255, 0.2)', // Transparent/Glassmorphic
                  backgroundBlendMode: 'overlay',
                  boxShadow: '0px 0px 1.76px rgba(0,0,0,0.05), 0px 0.88px 7.05px rgba(0,0,0,0.05), inset 0px 0px 0px 0.5px rgba(255,255,255,0.4)', // Softer shadows
                  backdropFilter: 'blur(10px)',
                  borderRadius: '88px',
                  border: '1px solid rgba(255, 255, 255, 0.3)', // Added border for visibility
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '13px',
                  lineHeight: '18px',
                  letterSpacing: '-0.09px',
                  textTransform: 'uppercase' as const,
                  color: '#FFFFFF',
                }}
              >
                {nextProject.cta || 'SEE CASE STUDY'}
              </motion.button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectDetail;
