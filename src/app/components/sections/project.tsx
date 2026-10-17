'use client';
import { Project } from '@/app/types/DevData';
import { ProjectTile, FeaturedProject } from '../common';
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, headingReveal, popIn } from '@/app/lib/motion';

type PropType = {
  projects: Project[];
  id: string;
};

const ProjectPageComp = ({ projects, id }: PropType) => {
  const [featured, ...rest] = projects;

  return (
    <section
      id={id}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col overflow-x-hidden px-5 py-20 sm:px-6"
    >
      <motion.div
        className="glow-blob right-10 top-10 h-72 w-72 bg-indigo-500"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="glow-blob left-0 bottom-20 h-72 w-72 bg-pink-500"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.1)}
        className="mb-10"
      >
        <motion.p className="eyebrow mb-3" variants={headingReveal}>
          Selected work
        </motion.p>
        <motion.div
          className="flex flex-wrap items-end justify-between gap-4"
          variants={headingReveal}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="rounded-full px-3 py-1 font-semibold"
              style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
              {projects.length} projects
            </span>
            <span className="hidden sm:inline">Fintech · UPI · Mobile · Full-stack</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Featured */}
      {featured && (
        <div className="mb-8">
          <FeaturedProject project={featured} />
        </div>
      )}

      {/* Grid of the rest */}
      <motion.div
        className="relative w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.12)}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => (
            <motion.div key={index} variants={popIn}>
              <ProjectTile project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ProjectPage = React.memo(ProjectPageComp);
ProjectPage.displayName = 'ProjectPage';

export { ProjectPage };
