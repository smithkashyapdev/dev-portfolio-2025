'use client';
import Image from 'next/image';
import ThemeToggle from '../common/ThemeToggle';
import { Drawer, DrawerRef } from './Drawer';
import { useCallback, useState } from 'react';
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';
type headerProps = {
  title?: string;
};
const Header = ({ title }: headerProps) => {
  const { theme } = useTheme();
  const drawerRef = React.useRef<DrawerRef>(null);
  const headerItems = [
    { title: '🧑‍💻 Home', link: '#home' },
    { title: '📝 Overview', link: '#overview' },
    { title: '📁 Projects', link: '#project' },
    { title: '💼 Work Experience', link: '#experience' },
    { title: '👤 About Me', link: '#about' },
  ];

  const openDrawer = useCallback(() => {
    if (drawerRef.current && !drawerRef.current.isOpen) {
      drawerRef.current.open();
    }
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-[var(--background)] px-4 backdrop-blur-lg border-[var(--foreground)]">
      <nav className="w-full pt-4 pb-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2 font-fira-code font-semibold ">
          <Image
            src="/component-icon/icon_portfolio_2.svg"
            alt="Portfolio Icon"
            width={0}
            height={0}
            className={`w-5 h-5 ${theme == 'light' ? 'invert' : ''}`}
          />
          <h3>{title}</h3>
        </div>

        <div className="hidden sm:flex flex-row items-center gap-4">
          {headerItems.map(({ title, link }, index) => (
            <a
              href={link}
              key={index}
              className={`inline-block md:px-4 md:py-2 sm:px-2 sm:py-2 text-sm  rounded transition ${theme == 'light' ? 'text-white bg-black hover:bg-blue-700' : 'text-black bg-white hover:bg-blue-700'}`}
            >
              {title}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="block sm:hidden" onClick={openDrawer}>
          <Image src="/icons/ic_burger.svg" alt="Burger Icon" width={0}
            height={0}
            className={`w-7 h-7 ${theme == 'light' ? 'invert' : ''}`} />
        </div>
      </nav>

      <Drawer ref={drawerRef} title={title ?? 'Portfolio'} />
    </div>
  );
};

export { Header };
