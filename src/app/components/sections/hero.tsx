'use client';
import { useEffect, useState } from 'react';
import { useTypingEffect } from '@/app/hooks';
import AnimatedBackground from '@/app/components/common/AnimatedBackground';
import Image from 'next/image';
import { useTheme } from '@/app/context/ThemeContext';

type heroProps = {
  skills?: string[];
  subtitle?: string;
  id: string;
};

const Hero = ({ skills, id }: heroProps) => {
  const [hasMounted, setHasMounted] = useState(false);
  const text = useTypingEffect(skills ?? [], 100, 60, 1000);
  const { theme } = useTheme();
  const cvLink = process.env.NEXT_PUBLIC_CV_LINK;
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div id={id} className="relative w-full min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Timeline */}
      <div className="flex flex-col absolute top-20 left-3 items-cente">
        <div className="w-5 h-5 bg-blue-500 rounded-full z-10"></div>
        <div className="ml-2 w-[2px] h-96 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
      </div>

      <main className="relative z-10 flex flex-col justify-center items-start px-15 py-16 gap-6 h-full">
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold">
          Hi, I&apos;m
          <span className="text-blue-500 font-extrabold block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {' '}Smith Kashyap
          </span>
        </h1>

        {/* Typing effect safely rendered after hydration */}
        <div className="min-h-[80px]">
          <p className="font-bold">
            <span className="text-blue-500 text-2xl">
              {hasMounted ? text : ''}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="inline-flex items-center gap-4 flex-wrap">
          <a
            href={cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm sm:text-base bg-blue-600  rounded hover:bg-blue-700 transition-all"
          >
            📄 Download Resume
          </a>

          <a
            href="#about"
            className="inline-block px-4 py-2 text-sm sm:text-base  rounded border border-transparent bg-black bg-clip-padding relative z-10
              before:content-[''] before:absolute before:inset-0 before:rounded before:z-[-1]
              before:bg-gradient-to-r before:from-purple-500 before:to-pink-500
              hover:before:opacity-80 transition-all"
          >
            💼 Hire Me
          </a>
        </div>

        {/* Quote */}
        <Image
          src="/component-icon/quote.svg"
          alt="Quote"
          width={0}
          height={0}
          sizes="100vw"
          className={`w-full h-42 mt-4 ${theme == 'light' ? 'invert' : ''}`}
        />

        {/* Bottom Images */}
        <div className="relative h-44 mt-8 w-full">
          <Image
            src="/component-icon/icon_portfolio_1.svg"
            alt="Portfolio Icon"
            width={100}
            height={100}
          />
          <Image
            src="/component-icon/ic_developer_image.svg"
            alt="Developer Icon"
            width={300}
            height={100}
            className="absolute top-0 right-0"
          />
          <Image
            src="/icons/ic_dot_dev.svg"
            alt="Dot Icon"
            width={70}
            height={50}
            className="absolute right-0 bottom-0"
          />
        </div>
      </main>
    </div>
  );
};

export { Hero };
