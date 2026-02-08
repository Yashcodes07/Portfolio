'use client';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    title: 'Helmet detection Model',
    description: 'This project detects whether a person is wearing a helmet or not using a YOLOv8 object detection model helpfull in Online Traffic-Monitoring System.',
    technologies: ['YoloV8', 'Python', 'Flask', 'Tailwind CSS'],
    github: 'https://github.com/Yashcodes07/Online-Traffic-Monitoring-System',
    live: 'https://project1.com',
    image: '/p1.png'
  },
  {
    title: 'Customized Website For client',
    description: 'A Official Website for a Company--Dynatech Controls Which make Automations Parts, SPM and provide harwdware solution ',
    technologies: ['Next.js', 'TypeScript', 'ResendAPI', 'Tailwind CSS'],
    github: 'https://github.com/Yashcodes07/dynatech-controls',
    live: 'https://dynatechcontrols.in',
    image: '/p2.png'
  },
  {
    title: 'Voice Command System',
    description: 'A comprehensive description of your machine learning project. What dataset did you use? What models did you implement? What were the results?',
    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    github: 'https://github.com/yourusername/ml-project',
    live: '',
    image: '/ml-project.jpg'
  },
  {
    title: 'Github-Integrated Personalized Dashboard ',
    description: 'A modern, feature-rich dashboard application built with Next.js 14, featuring GitHub integration, authentication, and personalization options.',
    technologies: ['Next.js', 'Tailwind CSS', 'NextAuth/API Integration', 'MongoDB'],
    github: 'https://github.com/Yashcodes07/Github-Integrated-Dashboard',
    live: 'https://github-integrated-dashboard.vercel.app/dashboard',
    image: '/image.png'
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          A showcase of my work in web development and machine learning
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl overflow-hidden border border-gray-800 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group"
            >
              <div className="h-48 relative overflow-hidden">
  <Image
    src={project.image}
    alt={project.title}
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  />
</div>

              {/* Project Image */}
              {/* <div className="h-48 bg-gradient-to-br from-accent/20 to-accent-dark/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-dark/10 group-hover:from-accent/20 group-hover:to-accent-dark/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl text-gray-700">
                  {project.title.charAt(0)}
                </div>
              </div> */}

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                  >
                    <FaGithub /> GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark rounded-lg transition-colors text-sm"
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
