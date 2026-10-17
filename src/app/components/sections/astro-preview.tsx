'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AstroResult } from '@/app/lib/astro-engine';
import { headingReveal, staggerContainer } from '@/app/lib/motion';
import type { PickedCity } from '@/app/components/common/LocationPicker';
import dynamic from 'next/dynamic';

// Lazy-load the location picker (and its large country/state/city dataset)
// so it never bloats the initial page bundle.
const LocationPicker = dynamic(
  () => import('@/app/components/common/LocationPicker').then((m) => m.LocationPicker),
  {
    ssr: false,
    loading: () => (
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Loading location picker…
      </p>
    ),
  },
);

type Props = { id: string };

const WHATSAPP_BOOK =
  'https://wa.me/919878250491?text=' +
  encodeURIComponent(
    'Hi Smith, I tried the KP mini preview and would like to book a full astrology reading. Here are my birth details:',
  );

const verdictColor: Record<string, string> = {
  Good: '#22c55e',
  Average: '#f59e0b',
  Challenging: '#ef4444',
};

const AstroPreviewComp = ({ id }: Props) => {
  const [form, setForm] = useState({ name: '', phone: '', dob: '', time: '' });
  const [city, setCity] = useState<PickedCity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AstroResult | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid mobile number (at least 10 digits).');
      return;
    }
    if (!city) {
      setError('Please select your birth city from the suggestions.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/astro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          place: city.place,
          lat: city.lat,
          lon: city.lon,
          tz: 5.5, // IST default; refine with real tz lookup if going global
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
      } else {
        setResult(data.result as AstroResult);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="glow-blob left-10 top-10 h-72 w-72 bg-fuchsia-500" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.1)}
        className="mb-10 text-center"
      >
        <motion.p className="eyebrow mb-3" variants={headingReveal}>
          Free mini preview ✦
        </motion.p>
        <motion.h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl" variants={headingReveal}>
          <span className="gradient-text">KP Astrology — 7-Day Preview</span>
        </motion.h2>
        <motion.p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base" style={{ color: 'var(--text-muted)' }} variants={headingReveal}>
          Enter your birth details for an instant mini KP &amp; D2 snapshot with a good/average/bad
          outlook for the next 7 days. For the full reading, book a session.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form */}
        <form onSubmit={submit} className="glass-card flex flex-col gap-4 p-6">
          <div>
            <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Full name</label>
            <input required value={form.name} onChange={update('name')} placeholder="Your name"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
              Mobile number <span className="text-red-500">*</span>
            </label>
            <input required type="tel" inputMode="tel" value={form.phone} onChange={update('phone')}
              placeholder="e.g. +91 98765 43210"
              pattern="[0-9+\-\s()]{10,}"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text)' }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Date of birth</label>
              <input required type="date" value={form.dob} onChange={update('dob')} max="2025-12-31"
                className="astro-datetime w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text)', colorScheme: 'dark' }} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Time of birth</label>
              <input required type="time" value={form.time} onChange={update('time')}
                className="astro-datetime w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text)', colorScheme: 'dark' }} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Place of birth</label>
            <LocationPicker onSelect={setCity} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60">
            {loading ? 'Reading the stars…' : '✦ Get my 7-day preview'}
          </motion.button>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Automated preview for guidance only. Your details are stored securely for your reading.
          </p>
        </form>

        {/* Result */}
        <div className="glass-card min-h-[20rem] p-6">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center justify-center text-center" style={{ color: 'var(--text-muted)' }}>
                <span className="mb-3 text-4xl">🔮</span>
                <p className="text-sm">Your mini KP preview will appear here.</p>
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center">
                <motion.span className="text-4xl" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>✦</motion.span>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div key="result" initial="hidden" animate="show" variants={staggerContainer(0.08)}>
                <motion.div variants={headingReveal} className="mb-3 grid grid-cols-3 gap-2">
                  {[
                    { l: 'Ascendant', v: result.kpAscendant },
                    { l: 'Moon Sign', v: result.moonSign },
                    { l: 'Nakshatra', v: result.nakshatra },
                  ].map((x) => (
                    <div key={x.l} className="rounded-xl p-2 text-center" style={{ background: 'var(--surface-muted)' }}>
                      <div className="gradient-text text-sm font-extrabold">{x.v}</div>
                      <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{x.l}</div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={headingReveal} className="mb-4 rounded-xl p-3 text-xs" style={{ background: 'var(--surface-muted)', color: 'var(--text-muted)' }}>
                  <p className="mb-1"><b>KP lords:</b> Star {result.kpStarLord} · Sub {result.kpSubLord}</p>
                  <p className="mb-1"><b>Dasha:</b> {result.mahadasha} › {result.antardasha} › {result.pratyantardasha}</p>
                  <p><b>D2 ({result.d2Sign}):</b> {result.d2Insight}</p>
                </motion.div>

                <motion.p variants={headingReveal} className="mb-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  Next 7 days
                </motion.p>
                <motion.div variants={headingReveal} className="mb-4 flex items-end justify-between gap-1.5">
                  {result.next7Days.map((d) => (
                    <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                      <div className="relative flex h-24 w-full items-end justify-center overflow-hidden rounded-md" style={{ background: 'var(--surface-muted)' }}>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${d.good}%` }} transition={{ duration: 0.6 }}
                          className="w-full" style={{ background: verdictColor[d.verdict] }} title={`${d.verdict} · ${d.good}% good`} />
                      </div>
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.label}</span>
                      <span className="text-[9px] font-bold" style={{ color: verdictColor[d.verdict] }}>{d.good}%</span>
                    </div>
                  ))}
                </motion.div>

                <motion.p variants={headingReveal} className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {result.summary}
                </motion.p>

                <motion.a variants={headingReveal} href={WHATSAPP_BOOK} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white">
                  Book full reading on WhatsApp →
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AstroPreview = React.memo(AstroPreviewComp);
AstroPreview.displayName = 'AstroPreview';

export { AstroPreview };
