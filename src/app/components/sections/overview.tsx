"use client"
import { SkillCategory } from '@/app/types/DevData';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';
import { useTheme } from '@/app/context/ThemeContext';

type OverviewProps = {
  overview?: string;
  bulletPoints?: string[];
  skills?: SkillCategory[];
  id: string;
};

const Overview = ({ overview, bulletPoints, skills, id }: OverviewProps) => {
  const { theme } = useTheme()
  const categorizedIcons = useMemo(() => {
    const getIcons = (title: string) =>
      skills?.find((skill) => skill.title === title)?.skills?.map((s) => s.icon ?? '') ?? [];

    return {
      languages: [
        ...(skills?.find((skill) => skill.title === 'Languages')?.skills ?? []),
        ...(skills?.find((skill) => skill.title === 'Databases')?.skills ?? []),
      ].map((s) => s.icon ?? ''),
      frameworks: getIcons('Frameworks & Libraries'),
      tools: getIcons('Tools & DevOps'),
      testing: getIcons('Unit Testing & QA'),
    };
  }, [skills]);

  // 📦 Render skill icon list
  const skillCardView = useCallback((title: string, icons: string[]) => {
    if (icons.length === 0) return null;

    return (
      <div key={title} className="glass-card animate-fadeInUp p-6">
        <h3 className="mb-5 text-lg font-bold sm:text-xl">
          <span className="gradient-text">{title}</span>
        </h3>
        <section className="flex flex-wrap gap-3">
          {icons.map((icon, index) => (
            <span
              key={index}
              className="lift flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14"
              style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}
            >
              <Image
                src={icon}
                width={0}
                height={0}
                alt={`${title} Icon ${index + 1}`}
                className={`h-7 w-7 object-contain sm:h-8 sm:w-8 ${theme == 'light' ? '' : 'invert'}`}
              />
            </span>
          ))}
        </section>
      </div>
    );
  }, [theme]);

  return (
    <div id={id} className="relative mx-auto max-w-6xl overflow-x-hidden px-5 py-20 sm:px-6">
      <div className="glow-blob left-0 top-10 h-64 w-64 bg-indigo-500" />

      <p className="eyebrow mb-3">Who I am</p>
      <h2 className="mb-6 text-3xl font-extrabold sm:text-4xl md:text-5xl">
        <span className="gradient-text">Overview</span>
      </h2>

      {overview && (
        <p className="max-w-3xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-muted)' }}>
          {overview}
        </p>
      )}

      {bulletPoints?.length ? (
        <div className="mt-12">
          <h3 className="mb-6 text-xl font-bold sm:text-2xl">Key Highlights</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {bulletPoints.map((point, index) => (
              <div
                key={index}
                className="glass-card lift animate-fadeInUp p-4 text-sm sm:text-base"
                style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {skillCardView('Languages & Databases', categorizedIcons.languages)}
        {skillCardView('Frameworks & Libraries', categorizedIcons.frameworks)}
        {skillCardView('Tools & DevOps', categorizedIcons.tools)}
        {skillCardView('Unit Testing & QA', categorizedIcons.testing)}
      </div>
    </div>
  );
};

const OverviewComp = React.memo(Overview);
OverviewComp.displayName = 'Overview';

export { Overview };
