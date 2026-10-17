'use client';
import { Project } from '@/app/types/DevData';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const FeaturedProject = ({ project }: { project: Project }) => {
  const { title, description, technologies, link, imageUrl, stats } = project;
  const hasLink = Boolean(link && link !== '#');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: 'spring', stiffness: 70, damping: 18 }}
      className="gradient-border group relative overflow-hidden"
    >
      <div
        className="grid grid-cols-1 gap-0 overflow-hidden rounded-[15px] lg:grid-cols-2"
        style={{ background: 'var(--surface)' }}
      >
        {/* Media */}
        <div className="relative h-56 w-full overflow-hidden lg:h-full lg:min-h-[22rem]">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            ⭐ Featured
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <h3 className="text-2xl font-extrabold sm:text-3xl">{title}</h3>

          {stats?.length ? (
            <div className="mt-4 flex flex-wrap gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="gradient-text text-xl font-extrabold sm:text-2xl">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {technologies.slice(0, 8).map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.08 }}
                className="cursor-default rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white"
                style={{ border: '1px solid var(--border)', background: 'var(--surface-muted)' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {hasLink && (
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
            >
              View project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export { FeaturedProject };
