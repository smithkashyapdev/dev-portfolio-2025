'use client';
import { Project } from '@/app/types/DevData';
import Image from 'next/image';
import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const ProjectTile = ({ project }: { project: Project }) => {
  const { title, description, technologies, link, imageUrl, stats } = project;
  const hasLink = Boolean(link && link !== '#');

  const ref = useRef<HTMLDivElement>(null);

  // Pointer-tracking 3D tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  // Cursor-following spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mx}% ${my}%, rgba(129,140,248,0.18), transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
    mx.set((px + 0.5) * 100);
    my.set((py + 0.5) * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="gradient-border group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{ background: 'var(--surface)' }}
      >
        {/* Cursor-following spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        {/* Cover image with gradient overlay + hover zoom + shine */}
        <div className="relative h-40 w-full overflow-hidden">
          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {/* Sliding shine */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white drop-shadow">
            {title}
          </h3>
        </div>

        {/* Body */}
        <div className="flex flex-grow flex-col p-5">
          {/* Highlight stats (e.g. store metrics) */}
          {stats?.length ? (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="rounded-xl py-2 text-center"
                  style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}
                >
                  <div className="gradient-text text-sm font-extrabold sm:text-base">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}

          <p
            className="mb-4 line-clamp-4 text-sm leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {description}
          </p>

          {/* Tech chips */}
          <div className="mb-5 flex flex-wrap gap-2">
            {technologies.slice(0, 6).map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.08 }}
                className="cursor-default rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--surface-muted)',
                }}
              >
                {tech}
              </motion.span>
            ))}
            {technologies.length > 6 && (
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                +{technologies.length - 6} more
              </span>
            )}
          </div>

          {/* Action */}
          <div className="mt-auto">
            {hasLink ? (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: 'var(--primary)' }}
              >
                View project
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H8M17 7v9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                🔒 Private / Enterprise
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { ProjectTile };
