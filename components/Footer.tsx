'use client';

import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="mailto:your.email@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
               href="https://www.linkedin.com/in/yashcodes07/"
               target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
                href="https://github.com/Yashcodes07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
                href="https://www.instagram.com/thakur_yash2321/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-400 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p className="flex items-center gap-2 justify-center">
              © {currentYear} Made with <FaHeart className="text-red-500" /> by Your Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
