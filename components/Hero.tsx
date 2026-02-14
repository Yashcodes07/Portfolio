'use client';

import { FaFileAlt, FaBlog } from 'react-icons/fa';
import Image from "next/image";



export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    // Opens resume.pdf from public folder
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
<div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[36rem] flex-shrink-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-accent-dark p-1">
              <div className="w-full h-full bg-secondary rounded-2xl overflow-hidden">
                {/* Placeholder for profile image - replace with your actual image */}
               <Image
                 src="/pf-1.webp"
                 alt="Me"
                 priority
                 fill
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a colored div if image doesn't exist
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left ">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 mr-10">
              Hi, I'm <span className="text-gradient">Yash Kumar</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6">
              Web Developer & ML Enthusiast
            </h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl">
I am a B.Tech student specializing in Artificial Intelligence and Machine Learning at GGSIPU (EDC). I have a strong interest in full-stack development, data science, applied Machine learning and Deep Learning , with hands-on experience in building real-world projects.            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl">
              As a web developer, I enjoy turning ideas into clean, responsive, and user-focused digital experiences. I've worked with modern web technologies to build projects that emphasize performance, usability, and maintainable code.
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Alongside web development, I'm actively learning Machine Learning and concepts of Deep learning(NLP), focusing on understanding data, building models, and applying ML concepts to real-world problems. 
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Fun Fact--Debugging is like being a detective in a crime movie where you're also the murderer.....
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              <button
                onClick={handleResumeClick}
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-accent/50 hover:scale-105 transform"
              >
                <FaFileAlt /> View Resume
              </button>
              <button
                onClick={() => scrollToSection('blogs')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-accent rounded-lg transition-all duration-300 font-semibold hover:scale-105 transform"
              >
                <FaBlog /> Read Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
