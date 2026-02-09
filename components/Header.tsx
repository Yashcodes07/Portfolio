'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gradient cursor-pointer" onClick={() => scrollToSection('home')}>
            Portfolio
          </div>

          {/* Desktop Navigation & Social Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-accent transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-accent transition-colors">
              Skills
            </button>
            <button onClick={() => scrollToSection('achievements')} className="text-gray-300 hover:text-accent transition-colors">
              Achievements
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-accent transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('blogs')} className="text-gray-300 hover:text-accent transition-colors">
              Blogs
            </button>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yashk40491@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-accent transition-colors"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>

              <a
                href="https://www.linkedin.com/in/yashcodes07/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Yashcodes07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/thakur_yash2321/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-accent transition-colors text-left">
                Home
              </button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-300 hover:text-accent transition-colors text-left">
                Skills
              </button>
              <button onClick={() => scrollToSection('achievements')} className="text-gray-300 hover:text-accent transition-colors text-left">
                Achievements
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-accent transition-colors text-left">
                Projects
              </button>
              <button onClick={() => scrollToSection('blogs')} className="text-gray-300 hover:text-accent transition-colors text-left">
                Blogs
              </button>

              {/* Mobile Social Icons */}
              <div className="flex space-x-6 pt-4 border-t border-gray-800">
                <a
                  href="mailto:your.email@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-gray-400 hover:text-accent transition-colors"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-gray-400 hover:text-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-gray-400 hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-gray-400 hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
