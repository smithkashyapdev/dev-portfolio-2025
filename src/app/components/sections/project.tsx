'use client';
import { Project } from '@/app/types/DevData';
import { IconCard, ProjectTile } from '../common';
import React from 'react';

type PropType = {
  projects: Project[];
  id: string;
};

const ProjectPageComp = ({ projects, id }: PropType) => {
  return (
    <section
      id={id}
      className="flex flex-col min-h-screen mt-10 px-4 sm:px-6"
    >
      <div className="flex flex-row gap-2">
        <IconCard title="projects" isHovered={false} disableSrc="/icons/hash_disable.svg" />
      </div>

      <div className="relative w-full overflow-x-auto overflow-y-hidden scroll-smooth mt-5 px-2 touch-pan-x scrollbar-hide">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 snap-x snap-mandatory">
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectTile project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectPage = React.memo(ProjectPageComp);
ProjectPage.displayName = 'ProjectPage';

export { ProjectPage };
