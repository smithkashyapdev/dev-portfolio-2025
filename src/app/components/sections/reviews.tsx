'use client';
import { Review, ReviewCategory } from '@/app/types/DevData';
import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { headingReveal, popIn, staggerContainer } from '@/app/lib/motion';

type ReviewsProps = {
  reviews: Review[];
  id: string;
};

type Tab = { key: ReviewCategory; label: string; emoji: string };
const TABS: Tab[] = [
  { key: 'career', label: 'Career Coaching', emoji: '‹/›' },
  { key: 'astrology', label: 'Astro Guidance', emoji: '✦' },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-amber-400' : 'opacity-25'}>
          ★
        </span>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const ReviewsComp = ({ reviews, id }: ReviewsProps) => {
  const [active, setActive] = useState<ReviewCategory>('career');

  const counts = useMemo(
    () => ({
      career: reviews.filter((r) => r.category === 'career').length,
      astrology: reviews.filter((r) => r.category === 'astrology').length,
    }),
    [reviews],
  );

  const filtered = useMemo(
    () => reviews.filter((r) => r.category === active),
    [reviews, active],
  );

  const avg = useMemo(() => {
    if (!filtered.length) return '0.0';
    const sum = filtered.reduce((a, r) => a + r.rating, 0);
    return (sum / filtered.length).toFixed(1);
  }, [filtered]);

  return (
    <section id={id} className="relative mx-auto max-w-6xl overflow-x-hidden px-5 py-20 sm:px-6">
      <motion.div
        className="glow-blob left-10 top-10 h-72 w-72 bg-amber-400"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.32, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.1)}
        className="mb-8 text-center"
      >
        <motion.p className="eyebrow mb-3" variants={headingReveal}>
          Kind words
        </motion.p>
        <motion.h2
          className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
          variants={headingReveal}
        >
          <span className="gradient-text">Reviews & Recommendations</span>
        </motion.h2>
        <motion.p
          className="mt-3 text-sm sm:text-base"
          style={{ color: 'var(--text-muted)' }}
          variants={headingReveal}
        >
          Real guidance across IT careers and personal astrology — from people all across India.
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                isActive ? 'text-white' : ''
              }`}
              style={
                isActive
                  ? undefined
                  : { background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text-muted)' }
              }
            >
              {isActive && (
                <motion.span
                  layoutId="review-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                />
              )}
              <span className="relative z-10">
                {t.emoji} {t.label}
                <span className="ml-1.5 opacity-70">({counts[t.key]})</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Average badge */}
      <div className="mb-8 flex justify-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <span className="text-amber-400 text-base">★</span>
          <span className="font-extrabold">{avg}</span>
          <span style={{ color: 'var(--text-muted)' }}>average · {filtered.length} reviews</span>
        </div>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: 10 }}
          variants={staggerContainer(0.07)}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((r, i) => (
            <motion.div
              key={r.name + i}
              variants={popIn}
              whileHover={{ y: -5 }}
              className="glass-card flex flex-col p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
                  {initials(r.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{r.name}</p>
                  <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                    {r.location}
                  </p>
                </div>
              </div>
              <Stars rating={r.rating} />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <span className="gradient-text mr-1 text-lg font-bold">“</span>
                {r.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const Reviews = React.memo(ReviewsComp);
Reviews.displayName = 'Reviews';

export { Reviews };
