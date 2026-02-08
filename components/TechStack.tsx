'use client';

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
  SiCss3
} from 'react-icons/si';

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
  // Duplicate the array to create seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Technologies and frameworks I work with
        </p>
      </div>

      {/* Infinite Scrolling Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary via-primary/50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary via-primary/50 to-transparent z-10"></div>
        
        {/* Scrolling Track */}
        <div className="flex animate-slide">
          {duplicatedTechnologies.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-8 flex flex-col items-center justify-center group"
            >
              <div className="text-6xl text-gray-400 group-hover:text-accent transition-all duration-400 group-hover:scale-110 transform">
                {tech.icon}
              </div>
              <p className="text-sm text-gray-500 mt-3 group-hover:text-accent transition-colors">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional info */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>...and more technologies I'm constantly learning!</p>
      </div>
    </section>
  );
}
