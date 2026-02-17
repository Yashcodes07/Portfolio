'use client';

import { FaTrophy, FaCertificate } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaTrophy className="text-3xl sm:text-4xl text-accent" />,
    title: 'Smart India Hackathon 2025',
    description:
      'Cleared the University-Level Rounds of SIH 2025, qualifying among top teams after problem statement evaluation and internal screening.',
    date: '2025',
  },
  {
    icon: <FaCertificate className="text-3xl sm:text-4xl text-accent" />,
    title: 'Client Website Deployment',
    description:
      'Delivered a fully production-ready website, handling planning, development, deployment, and maintenance.',
    date: '2026',
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Achievements</span>
        </h2>

        <p className="text-center text-gray-400 mb-10 sm:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
          Milestones and recognitions that mark my journey in tech
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl p-6 sm:p-8 border border-gray-800 transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                {/* Icon */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                  {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {achievement.date}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
