'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TopmateButtonProps = {
  /** Full Topmate profile URL */
  url?: string;
};

const DEFAULT_URL = 'https://topmate.io/smith_kashyap';

const SERVICES = [
  'React Native / React / TypeScript mentorship',
  'System design & scalable architecture',
  'Resume, portfolio & interview prep',
  'Career roadmap for fintech / full-stack roles',
];

/**
 * Floating Topmate button for 1:1 IT career guidance bookings.
 * Sits above the WhatsApp (Astro) FAB and reveals a service tooltip on hover/focus.
 */
export function TopmateButton({ url = DEFAULT_URL }: TopmateButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-24 right-4 z-[9999] flex flex-col items-end"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="mb-3 w-64 rounded-2xl p-4 text-sm shadow-xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="mb-2 font-bold">
              <span className="gradient-text">IT Career Guidance ‹/›</span>
            </p>
            <ul className="space-y-1.5" style={{ color: 'var(--text-muted)' }}>
              {SERVICES.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="gradient-text font-bold">✧</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-semibold" style={{ color: 'var(--primary)' }}>
              Book a 1:1 on Topmate →
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book IT career guidance on Topmate"
        title="Book IT Career Guidance on Topmate"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-white shadow-lg shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
          {/* Code / developer icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative h-6 w-6"
            aria-hidden="true"
          >
            <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 5l-2 14" />
          </svg>
        </span>
        <span className="hidden text-sm font-semibold sm:inline">Career Guidance</span>
      </motion.a>
    </div>
  );
}
