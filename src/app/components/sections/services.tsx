'use client';
import { Service } from '@/app/types/DevData';
import React from 'react';
import { motion } from 'framer-motion';
import { headingReveal, popIn, staggerContainer } from '@/app/lib/motion';

type ServicesProps = {
  services: Service[];
  id: string;
};

const WHATSAPP_PHONE = '919878250491';

function bookingHref(service: Service, priceLabel: string, amount: number) {
  const msg = `Hi Smith, I would like to book "${service.title}" (${priceLabel} · ₹${amount}). Please share the next available slot.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

const ServicesComp = ({ services, id }: ServicesProps) => {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-20">
      <motion.div
        className="glow-blob right-10 top-10 h-72 w-72 bg-emerald-400"
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={staggerContainer(0.1)}
        className="mb-12 text-center"
      >
        <motion.p className="eyebrow mb-3" variants={headingReveal}>
          Book a 1:1
        </motion.p>
        <motion.h2
          className="text-3xl font-extrabold sm:text-4xl lg:text-5xl"
          variants={headingReveal}
        >
          <span className="gradient-text">Guidance & Services</span>
        </motion.h2>
        <motion.p
          className="mt-3 text-sm sm:text-base"
          style={{ color: 'var(--text-muted)' }}
          variants={headingReveal}
        >
          Transparent pricing. Book instantly over WhatsApp.
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer(0.12)}
      >
        {services.map((service) => {
          const isAstro = service.category === 'astrology';
          return (
            <motion.div
              key={service.title}
              variants={popIn}
              whileHover={{ y: -8 }}
              className={service.highlight ? 'gradient-border' : ''}
            >
              <div
                className="relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
                style={{
                  background: 'var(--surface)',
                  border: service.highlight ? 'none' : '1px solid var(--border)',
                }}
              >
                {service.highlight && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-[11px] font-bold text-white">
                    ⭐ Most popular
                  </span>
                )}

                <span
                  className="inline-block w-fit rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ background: 'var(--surface-muted)', color: isAstro ? '#a855f7' : 'var(--primary)' }}
                >
                  {isAstro ? '✦ Astrology' : '‹/› Career'}
                </span>

                <h3 className="mt-3 text-xl font-extrabold">{service.title}</h3>

                {/* Price(s) */}
                <div className="mt-4 flex flex-wrap items-end gap-5">
                  {service.prices.map((p) => (
                    <div key={p.label}>
                      <span className="gradient-text text-3xl font-extrabold">₹{p.amount}</span>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {p.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {service.description}
                </p>

                <ul className="mt-4 space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Booking buttons (one per price tier) */}
                <div className="mt-6 flex flex-wrap gap-2 pt-2">
                  {service.prices.map((p) => (
                    <motion.a
                      key={p.label}
                      href={bookingHref(service, p.label, p.amount)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
                      </svg>
                      Book{service.prices.length > 1 ? ` (${p.label})` : ' on WhatsApp'}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

const Services = React.memo(ServicesComp);
Services.displayName = 'Services';

export { Services };
