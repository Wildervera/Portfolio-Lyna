import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Target, User, Check, TrendingUp, Key } from 'lucide-react';
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
      viewport={{ once: true, margin: "-100px" }}
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

const SectionHeader: React.FC<{ title: string; id: string; color?: string; className?: string }> = ({ title, id, color, className }) => (
  <div id={id} className={`flex justify-center py-20 scroll-mt-24 ${className || ''}`}>
    <h2
      style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontWeight: 510,
        fontSize: '50px',
        lineHeight: '60px',
        color: color || '#262E71',
      }}
    >
      {title}
    </h2>
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
    <div className="flex justify-center sticky top-6 z-[190] mb-12 pointer-events-auto">
      <div
        className="flex items-center justify-center overflow-x-auto"
        style={{
          width: '716px',
          maxWidth: '90vw',
          height: '73px',
          background: '#FFFFFF',
          border: '1px solid rgba(217, 217, 217, 0.3)',
          borderRadius: '45px',
          gap: '45px',
          padding: '0 32px',
          boxSizing: 'border-box' as const,
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="transition-colors whitespace-nowrap"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: activeSection === item.id ? 700 : 400,
              fontSize: '18px',
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
      width: '336px',
      height: '328px',
      background: '#FFFFFF',
      borderTop: `8px solid ${accentColor || '#262E71'}`,
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
        top: '34px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '65px',
        height: '65px',
        fontSize: '64.8px',
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
        top: '129px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '299px',
        padding: '0 8px',
        gap: '17px',
        display: 'flex',
        boxSizing: 'border-box' as const,
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '22px',
          lineHeight: '27px',
          color: '#000000',
          width: '283px',
        }}
      >
        {title}
      </h4>

      <div className="flex flex-col" style={{ gap: '17px', width: '283px' }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19px',
            textTransform: 'uppercase' as const,
            color: '#565555',
          }}
        >
          {subtitle}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '22px',
            color: '#000000',
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
    className="flex flex-col justify-center"
    style={{
      background: '#FFFFFF',
      borderRadius: '23px',
      padding: '24px',
      boxSizing: 'border-box' as const,
    }}
  >
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: '17px',
        lineHeight: '150%',
        color: '#565555',
        marginBottom: '13px',
      }}
    >
      Pain point {index + 1}
    </p>
    <p
      style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontWeight: 590,
        fontSize: '29px',
        lineHeight: '35px',
        color: '#000000',
        marginBottom: '13px',
      }}
    >
      "{finding.content}".
    </p>
    {finding.subtext && (
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '150%',
          color: '#000000',
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
      padding: '24px',
      boxSizing: 'border-box' as const,
    }}
  >
    <p
      style={{
        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        fontWeight: 510,
        fontSize: '48px',
        lineHeight: '58px',
        color: '#FFFFFF',
        marginBottom: '13px',
      }}
    >
      {finding.value}
    </p>
    <p
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        fontSize: '18px',
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
    <div className="bg-[#3D3D5C] rounded-2xl p-6 text-white h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-bold text-sm">{title}</h4>
        {status && (
          <span className={`text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${status === 'winner' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
            {status}
          </span>
        )}
      </div>

      {video && (
        <div className="rounded-lg overflow-hidden mb-6">
          <video
            src={video}
            className="w-full rounded-lg"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      )}

      {!video && image && (
        <div className="rounded-lg overflow-hidden mb-6">
          <img src={image} alt={title} className="w-full rounded-lg" />
        </div>
      )}

      <div className="space-y-2 mt-auto">
        {pros && pros.map((pro, i) => (
          <div key={`pro-${i}`} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-200">{pro}</span>
          </div>
        ))}
        {cons && cons.map((con, i) => (
          <div key={`con-${i}`} className="flex items-start gap-2 text-sm">
            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-200">{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ number: number; title: string; description: string }> = ({
  number, title, description
}) => (
  <div className="flex gap-4">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
      <span className="text-sm font-bold text-gray-700">{number}</span>
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
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

const TeamAvatars: React.FC<{ team: ProjectTeam }> = ({ team }) => {
  return (
    <div className="flex items-center" style={{ marginLeft: '0' }}>
      {team.members.map((member, i) => (
        <div
          key={i}
          className="rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold overflow-hidden"
          style={{
            width: '47px',
            height: '47px',
            backgroundColor: '#262E71',
            zIndex: team.members.length - i,
            marginLeft: i > 0 ? '-11px' : '0',
          }}
        >
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            member.name.charAt(0)
          )}
        </div>
      ))}
      {team.additionalCount && team.additionalCount > 0 && (
        <div
          className="rounded-full border-2 border-white flex items-center justify-center"
          style={{
            width: '47px',
            height: '47px',
            backgroundColor: '#262E71',
            zIndex: 0,
            marginLeft: '-11px',
          }}
        >
          <span
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
              fontWeight: 590,
              fontSize: '16px',
              lineHeight: '19px',
              color: '#FFFFFF',
            }}
          >
            +{team.additionalCount}
          </span>
        </div>
      )}
    </div>
  );
};

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
                  className="flex flex-col"
                  style={{ width: '450px', maxWidth: '100%', gap: '46px' }}
                >
                  <h1
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 700,
                      fontSize: '35px',
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
                      fontSize: '25px',
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
                  className="flex flex-wrap items-start justify-center mx-auto"
                  style={{ gap: '50px', padding: '40px 35px 50px' }}
                >
                  {caseStudy.projectInfo.map((info, i) => (
                    <div key={i} className="flex flex-col" style={{ gap: '15px' }}>
                      <p
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                          fontWeight: 590,
                          fontSize: '22px',
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
                          fontSize: '18px',
                          lineHeight: '22px',
                          color: '#565555',
                        }}
                      >
                        {info.value}
                      </p>
                    </div>
                  ))}
                  {caseStudy.team && (
                    <div className="flex flex-col" style={{ gap: '10px' }}>
                      <p
                        style={{
                          fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                          fontWeight: 590,
                          fontSize: '22px',
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
              <div className="!py-0 !mb-12 flex justify-center scroll-mt-24">
                <h2
                  style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                    fontWeight: 510,
                    fontSize: '50px',
                    lineHeight: '60px',
                    textAlign: 'center',
                    color: caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71',
                  }}
                >
                  Overview
                </h2>
              </div>

              {/* Overview rows — Frame 282 */}
              <div
                className="flex flex-col"
                style={{ gap: '34px', padding: '8px', maxWidth: '1078px', margin: '0 auto' }}
              >
                {/* Problem */}
                <div className="flex flex-col md:flex-row flex-wrap items-start" style={{ gap: '20px' }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '35px',
                      lineHeight: '42px',
                      color: '#000000',
                      flexShrink: 0,
                    }}
                  >
                    {caseStudy.overview.problem.title}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#595959',
                      maxWidth: '649px',
                    }}
                  >
                    {caseStudy.overview.problem.description}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Goal */}
                <div className="flex flex-col md:flex-row flex-wrap items-start" style={{ gap: '20px' }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '35px',
                      lineHeight: '42px',
                      color: '#000000',
                      flexShrink: 0,
                    }}
                  >
                    {caseStudy.overview.goal.title}
                  </h3>
                  <p
                    className="flex-1"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '24px',
                      color: '#595959',
                      maxWidth: '649px',
                    }}
                  >
                    {caseStudy.overview.goal.description}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Outcome or Role */}
                {caseStudy.overview.outcome ? (
                  <div className="flex flex-col md:flex-row flex-wrap items-start" style={{ gap: '20px' }}>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '35px',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                      }}
                    >
                      {caseStudy.overview.outcome.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#595959',
                        maxWidth: '649px',
                      }}
                    >
                      {caseStudy.overview.outcome.description}
                    </p>
                  </div>
                ) : caseStudy.overview.role ? (
                  <div className="flex flex-col md:flex-row flex-wrap items-start" style={{ gap: '20px' }}>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '35px',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                      }}
                    >
                      {caseStudy.overview.role.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#595959',
                        maxWidth: '649px',
                      }}
                    >
                      {caseStudy.overview.role.description}
                    </p>
                  </div>
                ) : null}

                {/* Divider */}
                <div style={{ width: '100%', height: '0px', border: '1px solid rgba(0, 0, 0, 0.1)' }} />

                {/* Additional Outcome if explicit */}
                {caseStudy.outcome && !caseStudy.overview.outcome && (
                  <div className="flex flex-col md:flex-row flex-wrap items-start" style={{ gap: '20px' }}>
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '35px',
                        lineHeight: '42px',
                        color: '#000000',
                        flexShrink: 0,
                      }}
                    >
                      Outcome
                    </h3>
                    <RichText
                      text={caseStudy.outcome.description}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#595959',
                        maxWidth: '649px',
                      }}
                      className="flex-1"
                    />
                  </div>
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
            <SectionHeader id="research" title="Research" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} />
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1280px' }}>
              <FadeIn>

                {/* Research title + description — Frame 292 */}
                {/* Research title + description — Frame 292 */}
                <div className="flex flex-col" style={{ gap: '44px', maxWidth: '1200px', margin: '0 auto' }}>
                  <div className="flex flex-col" style={{ gap: '18px' }}>
                    <h3
                      style={{
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                        fontWeight: 510,
                        fontSize: '35px',
                        lineHeight: '42px',
                        color: '#000000',
                      }}
                    >
                      {caseStudy.research.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '150%',
                        color: '#000000',
                      }}
                    >
                      {caseStudy.research.description}
                    </p>
                  </div>

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
                      className="flex flex-wrap items-center justify-center md:justify-start"
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

      {/* Key Findings Section (Phase Style) */}
      {
        caseStudy.keyFindings && (
          <section className="mx-auto px-6 py-16" style={{ maxWidth: '1220px' }}>
            <FadeIn>
              {/* Title + Description — Frame 289 header */}
              <h2
                style={{
                  fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                  fontWeight: 510,
                  fontSize: '35px',
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
                    fontSize: '18px',
                    lineHeight: '150%',
                    color: '#000000',
                    marginBottom: '48px',
                  }}
                >
                  {caseStudy.keyFindings.description}
                </p>
              )}

              {/* 2x2 Grid: quote + stat pairs — "My values" layout */}
              {caseStudy.keyFindings.findings.length > 0 && (
                <div
                  className="flex flex-wrap"
                  style={{ gap: '51px 37px', maxWidth: '1141px', margin: '0 auto' }}
                >
                  {caseStudy.keyFindings.findings
                    .filter(f => f.type === 'quote')
                    .map((quote, i) => {
                      const stat = caseStudy.keyFindings!.findings.filter(f => f.type === 'stat')[i];
                      return (
                        <React.Fragment key={i}>
                          <div style={{ width: '552px', minHeight: '200px', flex: '0 0 auto' }}>
                            <FadeIn delay={i * 0.2}>
                              <KeyFindingQuote finding={quote} index={i} />
                            </FadeIn>
                          </div>
                          {stat && (
                            <div style={{ width: '552px', minHeight: '200px', flex: '0 0 auto' }}>
                              <FadeIn delay={i * 0.2 + 0.1}>
                                <KeyFindingStat finding={stat} />
                              </FadeIn>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
              )}
            </FadeIn>
          </section>
        )
      }

      {/* Development/Strategy Section (Phase Style) */}
      {
        caseStudy.strategy && (
          <>
            <SectionHeader id="development" title="Development" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} />
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1220px' }}>
              <FadeIn>
                {caseStudy.strategy.sectionNumber && <SectionLabel number={caseStudy.strategy.sectionNumber} title="STRATEGY" />}

                {project.id === 2 && caseStudy.strategy.diagramImage ? (
                  // Simple 2-column layout for Project 2 Strategy (User Flow)
                  <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
                    <div className="md:w-1/3 flex flex-col gap-6 sticky top-24">
                      <FadeIn delay={0.1}>
                        <h2
                          style={{
                            fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                            fontWeight: 510,
                            fontSize: '35px',
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
                            fontSize: '18px',
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
                    <h2
                      style={{
                        fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                        fontWeight: 510,
                        fontSize: '35px',
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
                        fontSize: '18px',
                        lineHeight: '150%',
                        color: '#000000',
                        maxWidth: '1049px',
                        marginBottom: '48px',
                      }}
                    >
                      {caseStudy.strategy.description}
                    </p>

                    {/* IA Diagram Container — Frame 287 */}
                    {caseStudy.strategy.diagramImage && (
                      <div
                        className="mx-auto"
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
                      </div>
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
          <>
            <SectionHeader id="testing" title="Testing" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} />
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1220px' }}>
              <FadeIn>
                {caseStudy.iteration.sectionNumber && <SectionLabel number={caseStudy.iteration.sectionNumber} title="ITERATION" />}

                {caseStudy.iteration.title && (
                  <h2
                    style={{
                      fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                      fontWeight: 510,
                      fontSize: '35px',
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
                      fontSize: '18px',
                      lineHeight: '150%',
                      color: '#000000',
                      maxWidth: '1049px',
                      marginBottom: '48px',
                    }}
                  >
                    {caseStudy.iteration.description}
                  </p>
                )}

                {caseStudy.iteration.versions.length > 0 && (
                  project.id === 2 ? (
                    // Custom 4-column layout for Project 2
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                      {/* Column 1: Team (Index 2) -> Project Type (Index 0) */}
                      <div className="flex flex-col gap-6">
                        <FadeIn delay={0.1}>
                          {caseStudy.iteration.versions[2] && <DesignVersionCard {...caseStudy.iteration.versions[2]} variant="minimal" />}
                          {caseStudy.iteration.versions[0] && <DesignVersionCard {...caseStudy.iteration.versions[0]} variant="minimal" />}
                        </FadeIn>
                      </div>

                      {/* Column 2: General Info (Index 1) */}
                      <div className="flex flex-col gap-6">
                        <FadeIn delay={0.2}>
                          {caseStudy.iteration.versions[1] && <DesignVersionCard {...caseStudy.iteration.versions[1]} variant="minimal" />}
                        </FadeIn>
                      </div>

                      {/* Column 3: Scope & Specs (Index 3) */}
                      <div className="flex flex-col gap-6">
                        <FadeIn delay={0.3}>
                          {caseStudy.iteration.versions[3] && <DesignVersionCard {...caseStudy.iteration.versions[3]} variant="minimal" />}
                        </FadeIn>
                      </div>

                      {/* Column 4: Finalize (Index 4) -> Confirmation (Index 5) */}
                      <div className="flex flex-col gap-6">
                        <FadeIn delay={0.4}>
                          {caseStudy.iteration.versions[4] && <DesignVersionCard {...caseStudy.iteration.versions[4]} variant="minimal" />}
                          {caseStudy.iteration.versions[5] && <DesignVersionCard {...caseStudy.iteration.versions[5]} variant="minimal" />}
                        </FadeIn>
                      </div>
                    </div>
                  ) : (
                    // Standard grid for other projects
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </>
        )
      }

      {/* Final Product/Solution Section (Phase Style) */}
      {
        caseStudy.solution && (
          <>
            <SectionHeader id="final-product" title="Final Product" color={caseStudy.sectionHeaderColor || caseStudy.research?.cardAccentColor || '#262E71'} />
            <section className="mx-auto px-6 py-16" style={{ maxWidth: '1220px' }}>
              <FadeIn>
                {caseStudy.solution.sectionNumber && <SectionLabel number={caseStudy.solution.sectionNumber} title="SOLUTION" />}
                <h2 className="text-3xl md:text-5xl font-serif text-center text-gray-900 mb-4">
                  {caseStudy.solution.title}
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
                  {caseStudy.solution.description}
                </p>

                {caseStudy.solution.demoVideo && (
                  <div
                    className="mx-auto mb-16"
                    style={{
                      maxWidth: '1178px',
                      background: '#FFFFFF',
                      borderRadius: '24px',
                      padding: '24px',
                      overflow: 'hidden',
                    }}
                  >
                    <video
                      src={caseStudy.solution.demoVideo}
                      className="w-full rounded-2xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
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

      // When next project hero is mostly visible, transition
      if (progress >= 0.85 && !isTransitioning) {
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
      }
    } else {
      setTransitionProgress(0);
    }
  }, [nextProject, isTransitioning, onProjectChange]);

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
      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[220]">
        <div
          className="h-full bg-[#E07A5F] transition-all duration-100 ease-out"
          style={{ width: `${transitionProgress * 100}%` }}
        />
      </div>

      {/* Fixed Back Button */}
      <div className="fixed top-6 left-6 z-[210]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
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
          className="relative w-full flex flex-col items-center justify-center"
          style={{
            minHeight: '595px',
            backgroundColor: nextProject.backgroundColor || '#B4CAD5',
            padding: '20px 0',
          }}
        >
          {/* "Next Project" label */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '25px',
              lineHeight: '150%',
              color: '#FFFFFF',
              marginBottom: '40px',
            }}
          >
            Next Project
          </p>

          {/* Content row — Frame 294 */}
          <div
            className="flex flex-col md:flex-row items-center justify-center mx-auto"
            style={{ maxWidth: '1171px', gap: '75px', padding: '0 24px' }}
          >
            {/* Left: Image mockup */}
            <div
              className="relative flex-shrink-0"
              style={{ width: '472px', maxWidth: '100%' }}
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
              className="flex flex-col"
              style={{ maxWidth: '633px', gap: '40px', padding: '0 11px' }}
            >
              {/* Title + Description */}
              <div className="flex flex-col" style={{ gap: '11px' }}>
                <h2
                  style={{
                    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
                    fontWeight: 590,
                    fontSize: '45px',
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
                    fontSize: '25px',
                    lineHeight: '150%',
                    color: '#565555', // Updated from CSS
                  }}
                >
                  {nextProject.caseStudy?.heroSubtitle || nextProject.description}
                </p>
              </div>

              {/* Tags */}
              {nextProject.tags && nextProject.tags.length > 0 && (
                <div className="flex flex-wrap" style={{ gap: '9px' }}>
                  {nextProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center capitalize"
                      style={{
                        padding: '0 12px',
                        height: '23px',
                        background: '#FFFFFF',
                        borderRadius: '11px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '14px',
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
                onClick={() => {
                  if (nextProjectRef.current) {
                    nextProjectRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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

        {/* Hidden next project trigger for scroll transition */}
        <div
          ref={nextProjectRef}
          className="min-h-screen relative"
          style={{ backgroundColor: nextProject.backgroundColor }}
        >
          {/* Next project hero preview for transition */}
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                className="text-5xl md:text-7xl font-serif mb-6"
                style={{ color: nextProject.textColor }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: transitionProgress > 0.1 ? 1 : 0,
                  y: transitionProgress > 0.1 ? 0 : 30
                }}
                transition={{ duration: 0.4 }}
              >
                {nextProject.caseStudy?.heroTitle || nextProject.title}
              </motion.h1>
            </div>

            {nextProject.caseStudy?.heroImage && (
              <motion.div
                className="relative rounded-3xl overflow-hidden p-8 mt-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: transitionProgress > 0.2 ? 1 : 0,
                  scale: transitionProgress > 0.2 ? 1 : 0.95
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <img
                  src={nextProject.caseStudy.heroImage}
                  alt={nextProject.title}
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
            )}

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: transitionProgress > 0.1 ? 1 : 0 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center animate-bounce"
                style={{ backgroundColor: `${nextProject.textColor}20` }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: nextProject.textColor }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default ProjectDetail;
