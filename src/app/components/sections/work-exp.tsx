'use client';
import { workExperience } from '@/app/types/DevData';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { headingReveal, slideIn } from '@/app/lib/motion';

type WorkProp = {
  experiences: workExperience[];
  id: string;
};

const WorkExperienceComponent = ({ experiences, id }: WorkProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline to "draw" the line.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section id={id} className="relative mx-auto mt-6 max-w-6xl px-4 py-16 sm:px-6 lg:px-12">
      <motion.div
        className="glow-blob right-0 top-20 h-72 w-72 bg-pink-500"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.p
        className="eyebrow mb-3 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={headingReveal}
      >
        What I have done so far
      </motion.p>
      <motion.h2
        className="mb-14 text-center text-3xl font-extrabold sm:text-4xl lg:text-5xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={headingReveal}
      >
        <span className="gradient-text">Work Experience</span>
      </motion.h2>

      <div ref={containerRef} className="relative">
        {/* Static track */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{ background: 'var(--border)' }}
        />
        {/* Animated gradient line that draws on scroll */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 z-0 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
          style={{ scaleY: lineScale }}
        />

        <div className="relative z-10 flex flex-col gap-20">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isCurrent = index === 0;

            return (
              <div
                key={exp.company + index}
                className="relative flex flex-col items-center justify-between gap-6 md:flex-row"
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-[var(--surface)] shadow-lg"
                  style={{ border: '3px solid var(--primary)' }}
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  whileHover={{ scale: 1.12 }}
                >
                  <Image
                    src={exp.icon}
                    alt={`${exp.company} logo`}
                    fill
                    className="rounded-full object-cover p-1"
                  />
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`gradient-border relative mt-24 w-full md:mt-0 md:w-[45%] ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={slideIn(isLeft ? 1 : -1)}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="h-full rounded-2xl p-6" style={{ background: 'var(--surface)' }}>
                    <div className="mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                          style={{ background: 'var(--surface-muted)', color: 'var(--primary)' }}
                        >
                          {exp.duration}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 text-xl font-extrabold">{exp.company}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        {exp.position}
                      </p>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {exp.skill.split(',').map((skill, i) => {
                        const trimmed = skill.trim();
                        if (!trimmed) return null;
                        return (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.08 }}
                            className="cursor-default rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white"
                            style={{ border: '1px solid var(--border)' }}
                          >
                            {trimmed}
                          </motion.span>
                        );
                      })}
                    </div>

                    <motion.ul
                      className="space-y-2 text-sm"
                      style={{ color: 'var(--text-muted)' }}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                    >
                      {exp.responsibilities.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex gap-2"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            show: { opacity: 1, x: 0 },
                          }}
                        >
                          <span className="gradient-text mt-0.5 font-bold">▹</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WorkExpierience = React.memo(WorkExperienceComponent);
WorkExpierience.displayName = 'WorkExpierience';

export { WorkExpierience };
