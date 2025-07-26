'use client';
import { Project } from '@/app/types/DevData';
import Image from 'next/image';
import React from 'react';

const ProjectTile = ({ project }: { project: Project }) => {
  const { title, description, technologies, link, imageUrl } = project;

  return (
    <div className="p-[2px] rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full">
      <div className="bg-[var(--foreground)] rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        <div className="w-full h-32 relative overflow-hidden rounded-t-xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="100vw"
            className="object-fill"
          />
        </div>

        <div className="border-t border-gray-700 px-4 py-2 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs  font-medium px-3 py-1 rounded-full border border-gray-600 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col justify-between px-4 py-3 flex-grow">
          <h3 className="text-blue-500 font-semibold text-base mb-1">{title}</h3>
          <p className="text-sm line-clamp-5 mb-3">{description}</p>

          <div
            className="relative w-full h-12 cursor-pointer"
            onClick={() => link && window.open(link, '_blank')}
          >
            <Image
              src={link ? '/component-icon/ic_btn_1.svg' : '/component-icon/ic_btn_2.svg'}
              alt={`${title} Link`}
              width={0}
              height={0}
              className="absolute bottom-0 left-0 h-10 w-auto object-contain transition-transform hover:scale-105 invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProjectTile };
