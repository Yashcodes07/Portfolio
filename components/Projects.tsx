'use client';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: 'Helmet Detection Model',
    description:
      'Detects whether a person is wearing a helmet using YOLOv8. Useful for traffic monitoring systems.',
    technologies: ['YOLOv8', 'Python', 'Flask', 'Tailwind CSS'],
    github: 'https://github.com/Yashcodes07/Online-Traffic-Monitoring-System',
    live: '',
    image: '/p1.png',
  },
  {
    title: 'Customized Website for Client',
    description:
      'Official website for Dynatech Controls — Automation Parts, SPM & Hardware Solutions.',
    technologies: ['Next.js', 'TypeScript', 'ResendAPI', 'Tailwind CSS'],
    github: 'https://github.com/Yashcodes07/dynatech-controls',
    live: 'https://dynatechcontrols.in',
    image: '/p2.png',
  },
  {
    title: 'Voice Command System',
    description: 'Speech recognition based ML system (Currently Working).',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/yourusername/ml-project',
    live: '',
    image: '/po-1.webp',
  },
  {
    title: 'GitHub Integrated Dashboard',
    description:
      'Modern personalized dashboard built with Next.js 14 featuring GitHub API integration & authentication.',
    technologies: ['Next.js', 'Tailwind CSS', 'NextAuth', 'MongoDB'],
    github: 'https://github.com/Yashcodes07/Github-Integrated-Dashboard',
    live: 'https://github-integrated-dashboard.vercel.app/dashboard',
    image: '/image.png',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full py-14 sm:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Projects</span>
        </h2>

        <p className="text-center text-gray-400 mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
          A showcase of my work in Web Development & Machine Learning
        </p>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
            >
              
              {/* Project Image */}
              <div className="relative w-full h-44 sm:h-52 md:h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs sm:text-sm bg-accent/10 text-accent rounded-full border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
                  >
                    <FaGithub /> GitHub
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg text-sm transition"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
