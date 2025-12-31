"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experienceData = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "J.B. Hunt Transport Services, Inc.",
    location: "Lowell, AR",
    duration: "May 2025 - July 2025",
    type: "Internship",
    achievements: [
      'Built features for 35,000+ daily users and improved app performance.',
      'Built and integrated AI tools into internal developer workflows.',
      'Contributed to a projected $250K operational savings over five years.',
    ],
    technologies: [
      "TypeScript", "Angular", "Java", "Spring Boot", "MongoDB", "Elasticsearch",
      "Redis", "BigQuery", "Kubernetes", "Azure", "Git", "RAG"
    ]
  },
  {
    id: 2,
    title: "Accessibility Research",
    company: "University of North Texas",
    location: "Denton, TX",
    duration: "Aug 2024 - Dec 2024",
    type: "Research",
    achievements: [
      "Analyzed 50+ Unity accessibility plugins against WCAG 2.0 to uncover major compliance gaps.",
      "Built a Unity plugin with 14 automated accessibility checks and automated compliance reporting."
    ],
    technologies: ["Unity", "C#", '.NET', "AWS Polly", "OpenAI API"]
  }
];

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-amber-400 to-amber-600" />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white dark:border-gray-900 z-10" />

                {/* Content Card */}
                <div className="w-full md:w-5/12">
                  <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4">
                            <Briefcase className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <Badge
                              variant="secondary"
                              className="mb-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                            >
                              {exp.type}
                            </Badge>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {exp.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Company Info */}
                      <div className="mb-4">
                        <div className="flex items-center text-amber-600 dark:text-amber-400 font-medium mb-1">
                          <Building className="w-4 h-4 mr-2" />
                          {exp.company}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {exp.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Description
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p> */}

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2"></h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start text-sm">
                              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
