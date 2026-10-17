'use client';

import { useEffect, useState } from 'react';

/** Baseline shown before data loads or if the API is unreachable. */
const BASELINE = 100;

/**
 * Live "Daily Active Users" badge.
 * Shows `100+` as a fallback, and `100 + realVisitors` once /api/stats responds.
 */
export function DauBadge() {
  const [dau, setDau] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (active && typeof data?.dau === 'number') setDau(data.dau);
      })
      .catch(() => {
        // Keep the fallback on error.
      });
    return () => {
      active = false;
    };
  }, []);

  // Before load or on error: show the baseline as "100+".
  const label = dau === null || dau <= BASELINE ? `${BASELINE}+` : `${dau}`;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm font-medium backdrop-blur-sm"
      title="Daily active users on this portfolio"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
      </span>
      <span className="text-blue-500 font-bold">{label}</span>
      <span className="opacity-70">daily active users</span>
    </div>
  );
}
