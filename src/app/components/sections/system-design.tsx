'use client';
import React, { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { FLOW_NODES, TIMELINE, CONCERNS } from '@/app/constants/system-design';
import { headingReveal, staggerContainer } from '@/app/lib/motion';

type Props = { id: string };

const groupColor: Record<string, string> = {
  frontend: '#6366f1',
  edge: '#0ea5e9',
  backend: '#8b5cf6',
  messaging: '#ec4899',
  data: '#10b981',
  external: '#f59e0b',
};

// Order the packet travels through (ids). Response retraces in reverse.
const PATH_ORDER = [
  'app', 'security', 'token', 'dns', 'cdn', 'gw', 'lb', 'svc', 'npci', 'kafka', 'db', 'sqs',
];

type Pt = { x: number; y: number };

const SystemDesignComp = ({ id }: Props) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [litId, setLitId] = useState<string | null>(null);
  const [phase, setPhase] = useState<'idle' | 'request' | 'response' | 'done'>('idle');
  const [trail, setTrail] = useState<Pt[]>([]);
  const packet = useAnimationControls();

  // Measure node centers relative to the stage (live, at play time).
  const measurePoints = useCallback((): Record<string, Pt> => {
    const stage = stageRef.current;
    if (!stage) return {};
    const base = stage.getBoundingClientRect();
    const out: Record<string, Pt> = {};
    for (const nid of PATH_ORDER) {
      const el = nodeRefs.current[nid];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      out[nid] = { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 };
    }
    return out;
  }, []);

  const play = useCallback(async () => {
    const pts = measurePoints();
    if (!pts[PATH_ORDER[0]]) return;

    setTrail([]);
    setPhase('request');

    // Position packet at the start instantly.
    packet.set({ x: pts[PATH_ORDER[0]].x, y: pts[PATH_ORDER[0]].y, opacity: 1, scale: 1 });
    setLitId(PATH_ORDER[0]);

    // Forward journey.
    for (let i = 1; i < PATH_ORDER.length; i++) {
      const id = PATH_ORDER[i];
      const p = pts[id];
      if (!p) continue;
      setLitId(id);
      setTrail((t) => [...t, pts[PATH_ORDER[i - 1]], p]);
      await packet.start({
        x: p.x,
        y: p.y,
        transition: { duration: 0.42, ease: 'easeInOut' },
      });
      await new Promise((r) => setTimeout(r, 120));
    }

    // Turn into a response packet and travel back.
    setPhase('response');
    await packet.start({ scale: 1.3, transition: { duration: 0.2 } });
    for (let i = PATH_ORDER.length - 2; i >= 0; i--) {
      const id = PATH_ORDER[i];
      const p = pts[id];
      if (!p) continue;
      setLitId(id);
      await packet.start({
        x: p.x,
        y: p.y,
        transition: { duration: 0.28, ease: 'easeInOut' },
      });
    }

    await packet.start({ scale: 0, opacity: 0, transition: { duration: 0.3 } });
    setLitId(null);
    setPhase('done');
  }, [measurePoints, packet]);

  const frontendNodes = FLOW_NODES.filter((n) => n.lane === 'frontend');
  const backendNodes = FLOW_NODES.filter((n) => n.lane === 'backend');

  const renderNode = (node: (typeof FLOW_NODES)[number]) => {
    const lit = litId === node.id;
    const color = groupColor[node.group];
    return (
      <motion.div
        key={node.id}
        ref={(el) => {
          nodeRefs.current[node.id] = el;
        }}
        className="relative flex w-32 flex-shrink-0 flex-col rounded-xl p-3 sm:w-36"
        style={{ background: 'var(--surface)', border: `1px solid ${lit ? color : 'var(--border)'}` }}
        animate={lit ? { scale: 1.06, boxShadow: `0 0 26px ${color}77` } : { scale: 1, boxShadow: '0 0 0 transparent' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        <span className="text-xl">{node.icon}</span>
        <span className="mt-1 text-xs font-bold leading-tight">{node.label}</span>
        <span className="mt-0.5 text-[10px] leading-snug" style={{ color: 'var(--text-muted)' }}>
          {node.sub}
        </span>
        <span className="mt-2 h-1 w-8 rounded-full" style={{ background: color }} />
      </motion.div>
    );
  };

  const playing = phase === 'request' || phase === 'response';

  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="glow-blob left-0 top-10 h-72 w-72 bg-indigo-500" />
      <div className="glow-blob right-0 bottom-10 h-72 w-72 bg-emerald-500" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer(0.1)}
        className="mb-8 text-center"
      >
        <motion.p className="eyebrow mb-3" variants={headingReveal}>
          Architecture deep-dive
        </motion.p>
        <motion.h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl" variants={headingReveal}>
          <span className="gradient-text">UPI Payment — Request Journey</span>
        </motion.h2>
        <motion.p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-muted)' }} variants={headingReveal}>
          Press play and watch a single request travel from the mobile app, down through the
          backend to NPCI, then the confirmation travel all the way back.
        </motion.p>
      </motion.div>

      {/* Controls + phase badge */}
      <div className="mb-6 flex items-center justify-center gap-3">
        <motion.button
          onClick={play}
          disabled={playing}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
        >
          {phase === 'idle' ? '▶ Play request journey' : phase === 'done' ? '↻ Replay journey' : '⏳ In flight…'}
        </motion.button>
        <AnimatePresence>
          {phase !== 'idle' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                background: 'var(--surface-muted)',
                color: phase === 'response' ? '#10b981' : phase === 'done' ? '#10b981' : '#6366f1',
              }}
            >
              {phase === 'request' && '→ Request in flight'}
              {phase === 'response' && '← Response returning'}
              {phase === 'done' && '✓ Completed ~340 ms'}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Animated stage: lanes + traveling packet + trail */}
      <div ref={stageRef} className="relative mb-10">
        {/* Trail (SVG) sits behind the nodes */}
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden>
          {trail.length > 1 &&
            Array.from({ length: trail.length / 2 }).map((_, i) => {
              const a = trail[i * 2];
              const b = trail[i * 2 + 1];
              if (!a || !b) return null;
              return (
                <motion.line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="url(#flowGrad)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}
          <defs>
            <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6366f1" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 space-y-5">
          {/* Frontend lane */}
          <div className="rounded-2xl p-4" style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#6366f1' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6366f1' }}>
                Frontend · Client Request
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[620px] items-stretch gap-3">
                {frontendNodes.map(renderNode)}
              </div>
            </div>
          </div>

          {/* Handoff */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span className="h-px w-10" style={{ background: 'var(--border)' }} />
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              ⇵ HTTPS over the edge ⇵
            </motion.span>
            <span className="h-px w-10" style={{ background: 'var(--border)' }} />
          </div>

          {/* Backend lane */}
          <div className="rounded-2xl p-4" style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)' }}>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#10b981' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>
                Backend · Server Processing
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex min-w-[720px] items-stretch gap-3">
                {backendNodes.map(renderNode)}
              </div>
            </div>
          </div>
        </div>

        {/* The traveling packet */}
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            marginLeft: -12,
            marginTop: -12,
            background:
              phase === 'response'
                ? 'radial-gradient(circle,#34d399,#059669)'
                : 'radial-gradient(circle,#818cf8,#db2777)',
            boxShadow: phase === 'response' ? '0 0 18px #34d399' : '0 0 18px #818cf8',
            opacity: 0,
          }}
          animate={packet}
        >
          <span className="text-[10px]">{phase === 'response' ? '✓' : '⚡'}</span>
        </motion.div>
      </div>

      {/* Step details timeline */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TIMELINE.map((step) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl p-3"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span className="gradient-text text-xs font-extrabold">{step.t}</span>
            <p className="mt-1 text-xs font-bold">{step.title}</p>
            <p className="mt-1 text-[11px] leading-snug" style={{ color: 'var(--text-muted)' }}>
              {step.detail}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Non-functional concerns */}
      <div>
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Scale &amp; reliability
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {CONCERNS.map((c) => (
            <motion.span
              key={c}
              whileHover={{ scale: 1.06 }}
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

const SystemDesign = React.memo(SystemDesignComp);
SystemDesign.displayName = 'SystemDesign';

export { SystemDesign };
