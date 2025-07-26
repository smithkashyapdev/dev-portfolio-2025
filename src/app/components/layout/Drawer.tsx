'use client';
import Image from 'next/image';
import { IconCard } from '../common';
import { forwardRef, useCallback, useImperativeHandle, useState, useEffect } from 'react';
import React from 'react';

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

  // ✅ Prevent hydration mismatch by rendering only after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const headerItems = [
    { title: '🧑‍💻 Home', link: '#home' },
    { title: '📝 Overview', link: '#overview' },
    { title: '📁 Projects', link: '#project' },
    { title: '💼 Work Experience', link: '#experience' },
    { title: '👤 About Me', link: '#about' },
  ];

  const open = useCallback(() => {
    console.log('opened');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

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

  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-full h-screen pt-4 pb-2 pl-4 pr-4 bg-black flex flex-col transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2 font-fira-code font-semibold ">
          <Image
            src="/component-icon/icon_portfolio_2.svg"
            alt="Portfolio Icon"
            width={24}
            height={24}
          />
          <h3 className="">{title}</h3>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/icons/ic_cross.svg"
            alt="Portfolio Icon"
            width={24}
            height={24}
            onClick={close}
          />
        </div>
      </div>

      <div className="flex flex-col mt-4">
        {headerItems.map(({ title, link }, index) => (
          <IconCard key={index} title={title} onClick={() => handleItemClick(link)} />
        ))}
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';

const DrawerComp = React.memo(Drawer);
export { DrawerComp as Drawer };
