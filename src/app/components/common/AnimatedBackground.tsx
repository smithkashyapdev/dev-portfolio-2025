'use client';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState, useRef } from 'react';
import { loadSlim } from '@tsparticles/slim';
import { Container } from '@tsparticles/engine';
import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

const AnimatedBackground = React.memo(function AnimatedBackground() {
  const [init, setInit] = useState(false);
  const initializedRef = useRef(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!initializedRef.current) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        setInit(true);
        initializedRef.current = true;
      });
    }
  }, []);

  const particlesLoaded = async (container?: Container) => {};

  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          className="w-full h-full"
          options={{
            fullScreen: { enable: false },
            background: { color: 'transparent' },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
              number: { value: 160, density: { enable: true } },
              color: { value: theme == 'dark' ? '#f2f2f2' : '#000000' },
              links: {
                enable: true,
                color: theme == 'dark' ? '#3B82F6' : '#000000',
                distance: 150,
                opacity: 0.7,
                width: 2,
              },
              move: {
                enable: true,
                speed: 1,
                outModes: { default: 'out' },
              },
              shape: { type: 'circle' },
              size: { value: { min: 2, max: 4 } },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'repulse' },
              },
              modes: {
                grab: {
                  distance: 140,
                  links: { opacity: 0.7 },
                },
                repulse: {
                  distance: 200,
                  duration: 0.8,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
});

export default AnimatedBackground;
