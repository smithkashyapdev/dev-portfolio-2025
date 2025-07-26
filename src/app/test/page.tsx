'use client';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Container } from '@tsparticles/engine';
import { useEffect, useState } from 'react';

export default function ParticleTestPage() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  return (
     <main className="p-8">
      <h1 className="text-red-500 text-2xl font-bold">Default Tailwind Red</h1>
      <h1 className="text-redtest text-2xl font-bold">Custom Redtest (Should be black)</h1>
    </main>
  );
}
