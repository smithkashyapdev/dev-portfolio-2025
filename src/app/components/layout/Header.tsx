'use client';
import Image from 'next/image';
import ThemeToggle from '../common/ThemeToggle';
import { Drawer, DrawerRef } from './Drawer';
import { useCallback, useState } from 'react';
import React from 'react';
type headerProps = {
  title?: string;
};
const Header = ({ title }: headerProps) => {
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
            width={24}
            height={24}
          />
          <h3>{title}</h3>
        </div>

        <div className="hidden sm:flex flex-row items-center gap-4">
          {headerItems.map(({ title, link }, index) => (
            <a
              href={link}
              key={index}
              className="inline-block md:px-4 md:py-2 sm:px-2 sm:py-2 text-sm bg-blue-500  rounded hover:bg-blue-700 transition"
            >
              {title}
            </a>
          ))}
           <ThemeToggle />
        </div>

        <div className="block sm:hidden" onClick={openDrawer}>
          <Image src="/icons/ic_burger.svg" alt="Burger Icon" width={24} height={24} />
        </div>
      </nav>

      <Drawer ref={drawerRef} title={title ?? 'Portfolio'} />
    </div>
  );
};

export { Header };
