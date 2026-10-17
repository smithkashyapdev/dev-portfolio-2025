'use client';

import { useEffect } from 'react';

/**
 * Fires a single tracking beacon to /api/track once per browser session.
 * Renders nothing. Failures are swallowed so analytics never affects UX.
 */
export function VisitTracker() {
  useEffect(() => {
    const SESSION_KEY = 'visit-tracked';
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — track anyway.
    }

    fetch('/api/track', { method: 'POST', keepalive: true }).catch(() => {
      // Ignore — tracking is best-effort.
    });
  }, []);

  return null;
}
