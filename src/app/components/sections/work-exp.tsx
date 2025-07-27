import { workExperience } from '@/app/types/DevData';
import Image from 'next/image';
import React from 'react';

type WorkProp = {
  experiences: workExperience[];
  id: string;
};

const WorkExperienceComponent = ({ experiences, id }: WorkProp) => {
  return (
    <section id={id} className="relative px-4 mt-6 sm:px-6 lg:px-12">
      <h4 className=" text-center uppercase text-sm tracking-widest mb-2">
        What I have done so far
      </h4>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center  mb-10">
        Work Experience
      </h2>

      <div
        className="absolute bottom-12 left-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 z-0"
        style={{ top: '100px' }} // replaces invalid top-25
      />

      <div className="flex flex-col gap-20 relative z-10">
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={exp.company + index}
              className="relative flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="absolute left-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center shadow-lg">
                <Image src={exp.icon} alt={`${exp.company} logo`}
                  fill
                  className="rounded-3xl object-fill" />
              </div>

              <div
                className={`p-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 w-full md:w-[45%] mt-20 md:mt-0 ${isLeft ? 'md:ml-auto' : 'md:mr-auto'
                  }`}
              >
                <div className="bg-[var(--foreground)] shadow-lg border border-gray-700 p-6 rounded-lg h-full">
                  <div className="mb-2">
                    <h3 className="text-blue-400 font-semibold text-lg">{exp.position}</h3>
                    <p className="text-xl font-extrabold ">{exp.company}</p>
                    <p className="text-sm">{exp.duration}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.skill.split(',').map((skill, index) => {
                      const trimmed = skill.trim();
                      return (
                        <span
                          key={index}
                          className="text-xs  font-medium px-3 py-1 rounded-full border border-gray-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                        >
                          {trimmed}
                        </span>
                      );
                    })}
                  </div>
                  <ul className="list-disc list-inside text-sm  space-y-1">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const WorkExpierience = React.memo(WorkExperienceComponent);
WorkExpierience.displayName = 'WorkExpierience';

export { WorkExpierience };
