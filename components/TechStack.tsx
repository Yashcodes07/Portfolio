'use client';

import { useRef } from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiSocketdotio,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiPytorch,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiDocker,
  SiGit,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const technologies = [
  { icon: <SiPython />, name: 'Python' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <SiReact />, name: 'React' },
  { icon: <SiNextdotjs />, name: 'Next.js' },
  { icon: <SiNodedotjs />, name: 'Node.js' },
  { icon: <SiExpress />, name: 'Express' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <SiSocketdotio />, name: 'Socket.io' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <SiPostgresql />, name: 'PostgreSQL' },
  { icon: <SiTensorflow />, name: 'TensorFlow' },
  { icon: <SiPytorch />, name: 'PyTorch' },
  { icon: <SiKeras />, name: 'Keras' },
  { icon: <SiScikitlearn />, name: 'Scikit-learn' },
  { icon: <SiDocker />, name: 'Docker' },
  { icon: <SiGit />, name: 'Git' },
  { icon: <SiHtml5 />, name: 'HTML5' },
  { icon: <SiCss3 />, name: 'CSS3' },
];

export default function TechStack() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="skills"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20"
    >
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-3 sm:mb-4">
          <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-12">
          Technologies and frameworks I work with
        </p>
      </div>

      {/* Scroll Container */}
      <div className="relative max-w-7xl mx-auto">

        {/* Left Button (Mobile Only) */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-accent p-2 rounded-full shadow-lg md:hidden"
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth no-scrollbar gap-8 px-10 md:px-0"
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center justify-center group min-w-[80px]"
            >
              <div className="text-4xl sm:text-6xl text-gray-400 group-hover:text-accent transition-all duration-300 group-hover:scale-110">
                {tech.icon}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 group-hover:text-accent transition-colors text-center">
                {tech.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Button (Mobile Only) */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-accent p-2 rounded-full shadow-lg md:hidden"
        >
          <FaChevronRight />
        </button>

      </div>

      <div className="text-center mt-8 sm:mt-12 text-gray-400 text-xs sm:text-sm">
        <p>...and more technologies I'm constantly learning!</p>
      </div>
    </section>
  );
}
