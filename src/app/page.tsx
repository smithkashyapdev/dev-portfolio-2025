import { Header } from '@/app/components/layout';
import React from 'react';
import { devData } from './constants';
import { Hero, ProjectPage, WorkExpierience, AboutPage, Overview, Reviews, Services, AstroPreview, SystemDesign } from './components/sections';

export default function Home() {
  const {
    title,
    heading,
    overview,
    workExperience,
    bulletPoints,
    skills,
    projects,
    about,
    reviews,
    services,
    moto,
  } = devData;
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <Hero id="home" skills={heading} subtitle={''} moto={moto} />
      <Overview id="overview" overview={overview} bulletPoints={bulletPoints} skills={skills} />
      <ProjectPage id="project" projects={projects} />
      <SystemDesign id="system-design" />
      <WorkExpierience id="experieance" experiences={workExperience} />
      <Services id="services" services={services} />
      <AstroPreview id="astro" />
      <Reviews id="reviews" reviews={reviews} />
      <AboutPage id="about" data={about} />
    </div>
  );
}
