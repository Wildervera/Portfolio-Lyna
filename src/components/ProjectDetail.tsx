import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Target, User, Check, TrendingUp, Key } from 'lucide-react';
import { Project, KeyFinding, ContentSection, ProjectTeam } from '../types';
import { PROJECTS } from '../data/projects';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onProjectChange?: (project: Project) => void;
}

const RichText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className={className}>
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
  <div id={id} className={`flex justify-center py-20 scroll-mt-24 ${className}`}>
    <h2 style={{ color: color || '#262E71' }} className="font-sans text-[32px] md:text-[50px] font-bold leading-tight text-center">
      {title}
    </h2>
  </div>
);

const ProjectNavBar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center sticky top-6 z-[190] mb-12 pointer-events-auto">
      <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-[45px] border border-gray-200/50 shadow-sm flex items-center gap-8 md:gap-12 overflow-x-auto max-w-[90vw]">
        {['Overview', 'Research', 'Development', 'Testing', 'Final Product'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
            className="text-sm md:text-lg font-medium hover:text-[#262E71] transition-colors text-gray-900 whitespace-nowrap"
          >
            {item}
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
    className={`bg-white rounded-3xl p-6 ${accentColor ? 'border border-gray-200 border-t-[5px]' : 'shadow-md'}`}
    style={accentColor ? { borderTopColor: accentColor } : undefined}
  >
    <div className="text-5xl mb-4 text-center">{icon}</div>
    <h4 className="font-bold text-xl text-gray-900 mb-1">{title}</h4>
    <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-3">{subtitle}</p>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

const KeyFindingQuote: React.FC<{ finding: KeyFinding; index: number }> = ({ finding, index }) => (
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <p className="text-sm text-gray-400 mb-3">Pain point {index + 1}</p>
    <p className="text-xl font-bold text-gray-900 mb-3">"{finding.content}".</p>
    {finding.subtext && (
      <p className="text-gray-500 text-sm">{finding.subtext}</p>
    )}
  </div>
);

const KeyFindingStat: React.FC<{ finding: KeyFinding }> = ({ finding }) => (
  <div className="bg-[#3D3D7A] rounded-2xl p-8 text-white flex flex-col justify-center">
    <p className="text-4xl md:text-5xl font-bold mb-3">{finding.value}</p>
    <p className="text-gray-300 text-sm leading-relaxed">{finding.content}</p>
  </div>
);

const DesignVersionCard: React.FC<{
  title: string;
  status: 'winner' | 'discarded';
  pros: string[];
  cons: string[];
  image?: string;
}> = ({ title, status, pros, cons, image }) => (
  <div className="bg-[#3D3D5C] rounded-2xl p-6 text-white">
    <div className="flex justify-between items-start mb-4">
      <h4 className="font-bold text-sm">{title}</h4>
      <span className={`text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded-full uppercase ${status === 'winner' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
        {status}
      </span>
    </div>

    {image && (
      <div className="bg-gray-300 rounded-lg h-40 mb-6"></div>
    )}

    <div className="space-y-2">
      {pros.map((pro, i) => (
        <div key={`pro-${i}`} className="flex items-start gap-2 text-sm">
          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-200">{pro}</span>
        </div>
      ))}
      {cons.map((con, i) => (
        <div key={`con-${i}`} className="flex items-start gap-2 text-sm">
          <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          <span className="text-gray-200">{con}</span>
        </div>
      ))}
    </div>
  </div>
);

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
  const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed'];
  return (
    <div className="flex items-center -space-x-2">
      {team.members.map((member, i) => (
        <div
          key={i}
          className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
          style={{ backgroundColor: colors[i % colors.length], zIndex: team.members.length - i }}
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
          className="w-8 h-8 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-white text-xs font-semibold"
          style={{ zIndex: 0 }}
        >
          +{team.additionalCount}
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
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-12">
        {isNarrativeStyle ? (
          <>
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6">
                {caseStudy.heroTitle}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
                {caseStudy.heroSubtitle}
              </p>
            </div>

            {caseStudy.heroImage && (
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8E4F0] to-[#D4CCE8] p-8 mb-12">
                <img
                  src={caseStudy.heroImage}
                  alt={project.title}
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
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
                  <h1 className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-gray-900 leading-[1.15] mb-6">
                    {caseStudy.heroTitle}
                  </h1>
                  <p className="text-base text-gray-500 leading-relaxed max-w-md">
                    {caseStudy.heroSubtitle}
                  </p>
                </div>

                {/* Right: Mockup image */}
                {caseStudy.heroImage && (
                  <div className="md:w-1/2 flex items-center justify-center">
                    <img
                      src={caseStudy.heroImage}
                      alt={project.title}
                      className="w-full max-w-md rounded-2xl"
                    />
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
          <>
            {/* Card-style: Two-column hero card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Left: Title + Description */}
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight mb-6">
                    {caseStudy.heroTitle}
                  </h1>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {caseStudy.heroSubtitle}
                  </p>
                </div>

                {/* Right: Laptop Mockup */}
                {caseStudy.heroImage && (
                  <div className="md:w-1/2 flex items-center justify-center">
                    <LaptopMockup src={caseStudy.heroImage} alt={project.title} />
                  </div>
                )}
              </div>

              {/* Project Info Bar - inside card */}
              {caseStudy.projectInfo && (
                <div className="flex justify-center mt-10 pt-8 border-t border-gray-100">
                  <div className="flex flex-wrap items-start justify-between gap-8 w-full max-w-[65%]">
                    {caseStudy.projectInfo.map((info, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <p className="text-xs font-semibold tracking-wide text-gray-900 mb-1">
                          {info.label}
                        </p>
                        <p className="text-sm text-gray-500">{info.value}</p>
                      </div>
                    ))}
                    {caseStudy.team && (
                      <div className="flex flex-col items-center text-center">
                        <p className="text-xs font-semibold tracking-wide text-gray-900 mb-1">
                          Team
                        </p>
                        <TeamAvatars team={caseStudy.team} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Overview Section */}
      <div id="overview" className="scroll-mt-32">
        {isNarrativeStyle ? (
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <OverviewCard {...caseStudy.overview.problem} />
                <OverviewCard {...caseStudy.overview.goal} />
                {caseStudy.overview.outcome ? (
                  <OverviewCard {...caseStudy.overview.outcome} />
                ) : caseStudy.overview.role ? (
                  <OverviewCard {...caseStudy.overview.role} />
                ) : null}
              </div>
            </div>
          </section>
        ) : (
          <section className="max-w-4xl mx-auto px-6 py-16">
            {caseStudy.sectionHeaderColor !== undefined || project.id === 1 ? (
              <SectionHeader id="overview-header" title="Overview" color={caseStudy.sectionHeaderColor} className="!py-0 !mb-12" />
            ) : (
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 text-center mb-12">
                Overview
              </h2>
            )}

            <div className="divide-y divide-gray-200">
              {/* Problem */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-16 py-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-1/3 shrink-0">
                  {caseStudy.overview.problem.title}
                </h3>
                <p className="text-gray-500 leading-relaxed md:w-2/3">
                  {caseStudy.overview.problem.description}
                </p>
              </div>

              {/* Goal */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-16 py-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-1/3 shrink-0">
                  {caseStudy.overview.goal.title}
                </h3>
                <p className="text-gray-500 leading-relaxed md:w-2/3">
                  {caseStudy.overview.goal.description}
                </p>
              </div>

              {/* Outcome or Role */}
              {caseStudy.overview.outcome ? (
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 py-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-1/3 shrink-0">
                    {caseStudy.overview.outcome.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed md:w-2/3">
                    {caseStudy.overview.outcome.description}
                  </p>
                </div>
              ) : caseStudy.overview.role ? (
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 py-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-1/3 shrink-0">
                    {caseStudy.overview.role.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed md:w-2/3">
                    {caseStudy.overview.role.description}
                  </p>
                </div>
              ) : null}

              {/* Additional Outcome if explicit (usually at bottom, but checking if legacy content left here) */}
              {caseStudy.outcome && !caseStudy.overview.outcome && (
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 py-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-1/3 shrink-0">
                    Outcome
                  </h3>
                  <RichText
                    text={caseStudy.outcome.description}
                    className="text-gray-500 leading-relaxed md:w-2/3"
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Approach Section (Narrative Style) */}
      {caseStudy.approach && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {caseStudy.approach.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {caseStudy.approach.description}
          </p>
        </section>
      )}

      {/* Key Insight (Narrative Style) */}
      {caseStudy.keyInsight && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center gap-6">
            <Key className="w-12 h-12 text-gray-400" />
            <p className="text-xl md:text-2xl font-medium text-gray-900">
              {caseStudy.keyInsight.text}
            </p>
          </div>
        </section>
      )}

      {/* Content Sections (Narrative Style) */}
      {caseStudy.contentSections && caseStudy.contentSections.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-24">
          {caseStudy.contentSections.map((section, i) => (
            <ContentSectionComponent key={i} section={section} index={i} />
          ))}
        </section>
      )}

      {/* Impact Section (Narrative Style) */}
      {caseStudy.impact && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {caseStudy.impact.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {caseStudy.impact.description}
          </p>
        </section>
      )}

      {/* Quote (Narrative Style) */}
      {caseStudy.quote && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <blockquote className="text-xl md:text-2xl font-serif italic text-gray-700 text-center border-l-4 border-[#E07A5F] pl-6 py-4">
            {caseStudy.quote}
          </blockquote>
        </section>
      )}

      {/* Lesson Learned (Narrative Style) */}
      {caseStudy.lessonLearned && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {caseStudy.lessonLearned.title}
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {caseStudy.lessonLearned.description}
          </p>
        </section>
      )}

      {/* Research Section (Phase Style) */}
      {caseStudy.research && (
        <>
          {caseStudy.sectionHeaderColor !== undefined || project.id === 1 ? <SectionHeader id="research" title="Research" color={caseStudy.sectionHeaderColor} /> : null}
          <section className="max-w-5xl mx-auto px-6 py-16">
            {!(caseStudy.sectionHeaderColor !== undefined || project.id === 1) && (
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 text-center mb-10">
                Research
              </h2>
            )}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {caseStudy.research.title}
            </h3>
            <p className="text-gray-500 max-w-3xl mb-12">
              {caseStudy.research.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.research.personas.map((persona, i) => (
                <PersonaCard key={i} {...persona} accentColor={caseStudy.research!.cardAccentColor} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Key Findings Section (Phase Style) */}
      {caseStudy.keyFindings && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {caseStudy.keyFindings.title}
          </h2>
          <p className="text-gray-500 mb-12">
            {caseStudy.keyFindings.description}
          </p>

          {/* Paired rows: quote + stat */}
          <div className="space-y-8">
            {caseStudy.keyFindings.findings
              .filter(f => f.type === 'quote')
              .map((quote, i) => {
                const stat = caseStudy.keyFindings!.findings.filter(f => f.type === 'stat')[i];
                return (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <KeyFindingQuote finding={quote} index={i} />
                    {stat && <KeyFindingStat finding={stat} />}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Development/Strategy Section (Phase Style) */}
      {caseStudy.strategy && (
        <>
          {caseStudy.sectionHeaderColor !== undefined || project.id === 1 ? <SectionHeader id="development" title="Development" color={caseStudy.sectionHeaderColor} /> : null}
          <section className="max-w-6xl mx-auto px-6 py-16">
            {!(caseStudy.sectionHeaderColor !== undefined || project.id === 1) && <SectionLabel number={caseStudy.strategy.sectionNumber} title="STRATEGY" />}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {caseStudy.strategy.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mb-12">
              {caseStudy.strategy.description}
            </p>

            {caseStudy.strategy.diagramImage && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <img
                  src={caseStudy.strategy.diagramImage}
                  alt="Information Architecture"
                  className="w-full max-w-4xl mx-auto"
                />
              </div>
            )}
          </section>
        </>
      )}

      {/* Testing/Iteration Section (Phase Style) */}
      {caseStudy.iteration && (
        <>
          {caseStudy.sectionHeaderColor !== undefined || project.id === 1 ? <SectionHeader id="testing" title="Testing" color={caseStudy.sectionHeaderColor} /> : null}
          <section className="max-w-6xl mx-auto px-6 py-16">
            {!(caseStudy.sectionHeaderColor !== undefined || project.id === 1) && <SectionLabel number={caseStudy.iteration.sectionNumber} title="ITERATION" />}

            {caseStudy.iteration.title && (
              <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-900 mb-4">
                {caseStudy.iteration.title}
              </h2>
            )}
            {caseStudy.iteration.description && (
              <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                {caseStudy.iteration.description}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.iteration.versions.map((version, i) => (
                <DesignVersionCard key={i} {...version} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Final Product/Solution Section (Phase Style) */}
      {caseStudy.solution && (
        <>
          {caseStudy.sectionHeaderColor !== undefined || project.id === 1 ? <SectionHeader id="final-product" title="Final Product" color={caseStudy.sectionHeaderColor} /> : null}
          <section className="max-w-6xl mx-auto px-6 py-16">
            {!(caseStudy.sectionHeaderColor !== undefined || project.id === 1) && <SectionLabel number={caseStudy.solution.sectionNumber} title="SOLUTION" />}
            <h2 className="text-3xl md:text-5xl font-serif text-center text-gray-900 mb-4">
              {caseStudy.solution.title}
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
              {caseStudy.solution.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {caseStudy.solution.features.map((feature) => (
                <FeatureItem key={feature.number} {...feature} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Outcome Section (Phase Style with Metrics) */}
      {caseStudy.outcome && (
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-[#FBF7F3] rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              {caseStudy.outcome.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              {caseStudy.outcome.description}
            </p>

            <div className="flex justify-center gap-16 flex-wrap">
              {caseStudy.outcome.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <p className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">{metric.value}</p>
                  <p className="text-[#E07A5F] text-xs font-bold tracking-[0.15em] uppercase">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
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
            containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
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
        className="h-full overflow-y-auto overflow-x-hidden"
        style={{ scrollbarGutter: 'stable' }}
      >
        {/* Spacer for fixed button */}
        <div className="h-20 bg-[#FBF9F5]" />

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

        {/* "Let's work together" / End section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Let's work together!</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-2">Enjoyed the journey?</h3>
              </div>
              <div>
                <p className="text-gray-300">
                  Hit me up at{' '}
                  <a href="mailto:lyna@example.com" className="underline hover:text-white">
                    lyna@example.com
                  </a>{' '}
                  and let's embark on a new design adventure together!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transition text */}
        <div
          className="bg-gray-900 text-white py-8 text-center cursor-pointer"
          onClick={() => {
            if (nextProjectRef.current) {
              nextProjectRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <p className="text-sm text-gray-400 italic">
            Keep scrolling or click to go to my next project
          </p>
        </div>

        {/* Next project preview */}
        <div
          ref={nextProjectRef}
          className="min-h-screen relative"
          style={{ backgroundColor: nextProject.backgroundColor }}
        >
          {/* Next project hero */}
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
      </div>
    </div>
  );
};

export default ProjectDetail;
