import { Header } from '@/app/components/layout';
import React from 'react';
import { devData } from './constants';
import { Hero, ProjectPage, WorkExpierience, AboutPage, Overview } from './components/sections';

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
  } = devData;
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <Hero id="home" skills={heading} subtitle={''} />
      <Overview id="overview" overview={overview} bulletPoints={bulletPoints} skills={skills} />
      <ProjectPage id="project" projects={projects} />
      <WorkExpierience id="experieance" experiences={workExperience} />
      <AboutPage id="about" data={about} />
    </div>
  );
}
