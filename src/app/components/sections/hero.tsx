'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '@/app/hooks';
import AnimatedBackground from '@/app/components/common/AnimatedBackground';
import { DauBadge } from '@/app/components/common';
import Image from 'next/image';

type heroProps = {
  skills?: string[];
  subtitle?: string;
  id: string;
  moto?: string;
};

const Hero = ({ skills, id, moto }: heroProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const text = useTypingEffect(skills ?? [], 100, 60, 1000);
  const cvLink = process.env.NEXT_PUBLIC_CV_LINK;
  const quote = moto?.trim() || 'Code is poetry.';
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div id={id} className="relative w-full min-h-screen overflow-x-hidden overflow-y-hidden">
      <AnimatedBackground />

      {/* Ambient glow */}
      <div className="glow-blob left-10 top-24 h-80 w-80 bg-indigo-500" />
      <div className="glow-blob right-10 bottom-24 h-80 w-80 bg-pink-500" />

      {/* Timeline */}
      <div className="flex flex-col absolute top-20 left-3 items-cente">
        <div className="w-5 h-5 rounded-full z-10 bg-gradient-to-br from-indigo-500 to-pink-500"></div>
        <div className="ml-2 w-[2px] h-96 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"></div>
      </div>

      <main className="relative z-10 flex flex-col justify-center items-start gap-5 h-full px-5 py-16 sm:px-10 lg:px-16">
        <span className="eyebrow animate-fadeInUp text-[10px] sm:text-xs">Senior Software Engineer · Technical Lead · 10+ yrs</span>
        <h1 className="animate-fadeInUp text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold">
          Hi, I&apos;m
          <span className="gradient-text font-extrabold block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {' '}Smith Kashyap
          </span>
        </h1>

        {/* Typing effect safely rendered after hydration */}
        <div className="min-h-[80px]">
          <p className="font-bold">
            <span className="text-blue-500 text-2xl">
              {hasMounted ? text : ''}
            </span>
          </p>
        </div>

        {/* Live daily active users */}
        {hasMounted && <DauBadge />}

        {/* Buttons */}
        <div className="inline-flex items-center gap-4 flex-wrap">
          <a
            href={cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="lift inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg sm:text-base"
          >
            📄 Download Resume
          </a>

          <a
            href="#about"
            className="lift inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold sm:text-base"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            💼 Hire Me
          </a>
        </div>

        {/* Quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={hasMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 w-full max-w-xl"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-6 pl-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {/* Accent bar */}
            <span className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

            {/* Big quotation mark */}
            <span className="gradient-text pointer-events-none absolute -top-2 right-4 select-none text-7xl font-black leading-none opacity-20">
              ”
            </span>

            <blockquote className="relative z-10 text-lg font-semibold leading-snug sm:text-xl">
              <span className="gradient-text">{quote}</span>
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="h-px w-6 bg-gradient-to-r from-indigo-500 to-pink-500" />
              Smith Kashyap · Engineering philosophy
            </figcaption>
          </div>
        </motion.figure>

        {/* Bottom Images */}
        <div className="relative mt-8 hidden h-44 w-full sm:block">
          <Image
            src="/component-icon/icon_portfolio_1.svg"
            alt="Portfolio Icon"
            width={100}
            height={100}
          />
          <Image
            src="/component-icon/ic_developer_image.svg"
            alt="Developer Icon"
            width={300}
            height={100}
            className="absolute top-0 right-0 max-w-[60%] object-contain"
          />
          <Image
            src="/icons/ic_dot_dev.svg"
            alt="Dot Icon"
            width={70}
            height={50}
            className="absolute right-0 bottom-0"
          />
        </div>
      </main>
    </div>
  );
};

export { Hero };
