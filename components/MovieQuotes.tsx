'use client';

import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaFilm } from 'react-icons/fa';

const movieQuotes = [
  
  {
    quote: "Chaos isn’t a pit. Chaos is a ladder.",
    movie: "Game of thrones",
    year: "2011-2019"
  },
  
  {
    quote: "I am not in danger. I am the danger.",
    movie: "Breaking Bad ",
    year: "2008-2013"
  },
  
  {
    quote: "I don’t pay for suits. My suits are on the house or the house burns down.",
    movie: "Peaky Blinders",
    year: "2013-2018"
  },
  {
    quote: "Every lie we tell incurs a debt to the truth.",
    movie: "Chernobyl",
    year: "2019"
  },
  {
    quote: "I don’t play the odds, I play the man.",
    movie: "Suits",
    year: "2011-2019"
  },
  {
    quote: "I think human consciousness was a tragic misstep in evolution.",
    movie: "True Detective",
    year: "2014"
  },
  {
    quote: "The greatest trick the Devil ever pulled was convincing the world he didn't exist.",
    movie: "The Usual Suspects",
    year: "1995"
  },
 
];

export default function MovieQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movieQuotes.length);
        setIsAnimating(false);
      }, 500);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentQuote = movieQuotes[currentIndex];

  const nextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movieQuotes.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? movieQuotes.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
  };
return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-secondary/30 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaFilm className="text-2xl text-accent" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-gradient">Off the Keyboard</span>
            </h2>
            <FaFilm className="text-2xl text-accent" />
          </div>
          <p className="text-gray-400 text-xs sm:text-sm">
            Because even developers need a break with cinematic wisdom
          </p>
        </div>

        {/* Quote Box */}
        <div className="relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-2xl blur-xl"></div>
          
          {/* Main Quote Container */}
          <div className="relative bg-secondary/80 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 sm:p-8 shadow-2xl">
            {/* Quote Icon Top */}
            <FaQuoteLeft className="text-2xl text-accent/30 mb-4" />
            
            {/* Quote Text */}
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-light leading-relaxed mb-6 min-h-[60px] flex items-center">
                "{currentQuote.quote}"
              </p>
              
              {/* Movie Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-10 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
                  <div>
                    <p className="text-accent font-semibold text-base">
                      {currentQuote.movie}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {currentQuote.year}
                    </p>
                  </div>
                </div>
                
                {/* Navigation Dots */}
                <div className="hidden sm:flex items-center gap-2">
                  {movieQuotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentIndex(index);
                          setIsAnimating(false);
                        }, 500);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-accent w-8' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                      aria-label={`Go to quote ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Icon Bottom */}
            <FaQuoteRight className="text-2xl text-accent/30 mt-4 ml-auto" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-4 sm:mt-6">
            <button
              onClick={prevQuote}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 border border-gray-700/50 hover:border-accent/50 group"
              aria-label="Previous quote"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-gray-400 group-hover:text-accent transition-colors hidden sm:inline text-sm">Previous</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-accent font-semibold">{currentIndex + 1}</span>
              <span>/</span>
              <span>{movieQuotes.length}</span>
            </div>

            <button
              onClick={nextQuote}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 border border-gray-700/50 hover:border-accent/50 group"
              aria-label="Next quote"
            >
              <span className="text-gray-400 group-hover:text-accent transition-colors hidden sm:inline text-sm">Next</span>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-1 bg-gray-800/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent to-accent-dark transition-all duration-300 ease-linear"
              style={{
                width: `${((currentIndex + 1) / movieQuotes.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}