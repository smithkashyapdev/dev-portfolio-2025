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
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10">
        Projects.
      </h2>

      <div className="relative w-full">
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
