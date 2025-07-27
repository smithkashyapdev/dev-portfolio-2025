'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Image from 'next/image';
import { IconCard } from '../common';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '@/app/context/ThemeContext';

type DrawerProps = {
  title: string;
};

export type DrawerRef = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Drawer = forwardRef<DrawerRef, DrawerProps>(({ title }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔒 Prevent scroll + touch gestures when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none'; // disables swipe gestures
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const headerItems = [
    { title: '🧑‍💻 Home', link: '#home' },
    { title: '📝 Overview', link: '#overview' },
    { title: '📁 Projects', link: '#project' },
    { title: '💼 Work Experience', link: '#experience' },
    { title: '👤 About Me', link: '#about' },
  ];

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    isOpen,
    open,
    close,
  }));

  const handleItemClick = (item: string) => {
    const target = document.getElementById(item.replace('#', ''));
    target?.scrollIntoView({ behavior: 'smooth' });
    close();
  };

  if (!mounted || !isOpen) return null; // Prevent SSR issues and remove from DOM when closed

  return (
    <div
      style={{ willChange: 'transform' }}
      className="fixed top-0 right-0 w-full h-screen pt-4 pb-2 px-4 bg-[color:var(--background)] text-[color:var(--text)] flex flex-col transform transition-transform duration-300 ease-in-out z-50 translate-x-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2 font-fira-code font-semibold">
          <Image
            src="/component-icon/icon_portfolio_2.svg"
            alt="Portfolio Icon"
            width={20}
            height={20}
            className={`w-5 h-5 ${theme === 'light' ? 'invert' : ''}`}
          />
          <h3>{title}</h3>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button onClick={close} aria-label="Close drawer">
            <Image
              src="/icons/ic_cross.svg"
              alt="Close Icon"
              width={24}
              height={24}
            />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-6 h-full">
        {headerItems.map(({ title, link }, index) => {
          const isLast = index === headerItems.length - 1;
          return (
            <div
              key={index}
              className={`${
                isLast ? 'col-span-2 h-[30%]' : ''
              } overflow-hidden`}
            >
              <IconCard title={title} onClick={() => handleItemClick(link)} />
            </div>
          );
        })}
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';

const DrawerComp = React.memo(Drawer);
export { DrawerComp as Drawer };
