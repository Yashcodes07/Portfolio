'use client';

import { FaTrophy, FaCertificate, FaMedal, FaStar } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaTrophy className="text-4xl text-accent" />,
    title: 'Achievement Title 1',
    description: 'Cleared the University-Level Rounds of Smart India Hackathon (SIH) 2025, successfully qualifying among top teams after problem statement evaluation and internal screening.',
    date: '2025'
  },
  {
    icon: <FaCertificate className="text-4xl text-accent" />,
    title: 'Achievement Title 2',
    description: 'Delivered a fully functional production-ready website for a client, managing the complete lifecycle from planning and design to deployment and maintenance.',
    date: '2026'
  },
  // {
  //   icon: <FaMedal className="text-4xl text-accent" />,
  //   title: 'Achievement Title 3',
  //   description: 'Brief description of your achievement. What did you accomplish and why is it significant?',
  //   date: '2023'
  // },
  // {
  //   icon: <FaStar className="text-4xl text-accent" />,
  //   title: 'Achievement Title 4',
  //   description: 'Brief description of your achievement. What did you accomplish and why is it significant?',
  //   date: '2023'
  // },
];

export default function Achievements() {
  return (
    <section id="achievements" className="h-[75vh] py-10 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Achievements</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Milestones and recognitions that mark my journey in tech
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-8 border border-gray-800 hover:border-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-gray-500">{achievement.date}</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
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
