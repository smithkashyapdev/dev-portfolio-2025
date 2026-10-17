'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { answer, BotReply } from '@/app/lib/portfolio-bot';

type Msg = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  suggestions?: string[];
  link?: BotReply['link'];
};

let counter = 0;
const nextId = () => ++counter;

const GREETING: Msg = {
  id: nextId(),
  from: 'bot',
  text: "Hi! I'm Smith's AI assistant. Ask me about his experience, skills, projects, or how to book guidance.",
  suggestions: ['Experience', 'Skills', 'Projects', 'Contact', 'Astro guidance', 'IT career guidance'],
};

export function PortfolioBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: nextId(), from: 'user', text }]);
    setInput('');
    setTyping(true);

    // Small delay to feel conversational.
    setTimeout(() => {
      const reply = answer(text);
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          from: 'bot',
          text: reply.text,
          suggestions: reply.suggestions,
          link: reply.link,
        },
      ]);
    }, 450);
  };

  return (
    <>
      {/* Launcher FAB — bottom-left so it doesn't collide with the right-side FABs */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open portfolio assistant"
        title="Ask Smith's AI"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-4 z-[9999] flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-white shadow-lg shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
          <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6" aria-hidden="true">
            <path d="M12 2a9 9 0 00-9 9c0 1.6.42 3.1 1.15 4.4L3 21l5.8-1.1A9 9 0 1012 2zm-3 8h6a1 1 0 010 2H9a1 1 0 010-2zm0 3h4a1 1 0 010 2H9a1 1 0 010-2z" />
          </svg>
        </span>
        <span className="hidden text-sm font-semibold sm:inline">Ask Smith&apos;s AI</span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 left-4 z-[9999] flex h-[28rem] w-[min(92vw,22rem)] flex-col overflow-hidden rounded-2xl shadow-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-white">
              <div>
                <p className="text-sm font-bold">Smith&apos;s AI Assistant</p>
                <p className="text-[11px] opacity-80">Ask about experience, projects & more</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-full p-1 transition-colors hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                      m.from === 'user' ? 'ml-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white' : ''
                    }`}
                    style={
                      m.from === 'bot'
                        ? { background: 'var(--surface-muted)', color: 'var(--text)' }
                        : undefined
                    }
                  >
                    {m.text}
                  </div>

                  {m.link && (
                    <a
                      href={m.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      {m.link.label} →
                    </a>
                  )}

                  {m.suggestions?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:text-white"
                          style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              {typing && (
                <div
                  className="flex w-14 items-center justify-center gap-1 rounded-2xl px-3 py-2.5"
                  style={{ background: 'var(--surface-muted)' }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--text-muted)' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t p-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                aria-label="Message"
                className="flex-1 rounded-full px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--surface-muted)', color: 'var(--text)' }}
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
