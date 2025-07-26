import { SkillCategory } from '@/app/types/DevData';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';

type OverviewProps = {
  overview?: string;
  bulletPoints?: string[];
  skills?: SkillCategory[];
  id: string;
};

const Overview = ({ overview, bulletPoints, skills, id }: OverviewProps) => {
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
      <div key={title} className="flex flex-col items-center text-center animate-fadeInUp">
        <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-4">{title}</h3>
        <section className="flex flex-wrap justify-center gap-4">
          {icons.map((icon, index) => (
            <Image
              key={index}
              src={icon}
              width={0}
              height={0}
              alt={`${title} Icon ${index + 1}`}
              className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 object-contain invert"
            />
          ))}
        </section>
      </div>
    );
  }, []);

  return (
    <div id={id} className="flex flex-col py-4 px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
        Overview.
      </h2>

      {overview && <p className="text-sm sm:text-lg mb-6">{overview}</p>}

      {bulletPoints?.length ? (
        <div className="mt-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Key Highlights:
          </h3>
          <ul className="list-disc list-inside text-lg  space-y-2">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-sm sm:text-lg">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
