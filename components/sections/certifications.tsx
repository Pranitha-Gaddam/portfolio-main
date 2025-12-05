"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const certificationsData = [
  {
    id: 1,
    title: "Goldman Sachs - Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Aug 2024",
    credentialId: "Wnz2mGR7SPj5DQQKP",
    verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Goldman%20Sachs/NPdeQ43o8P9HJmJzg_Goldman%20Sachs_5fnETx27mJj5M5PMS_1724820677144_completion_certificate.pdf",
    description: "Completed a Goldman Sachs virtual experience simulating governance analysis by identifying password security flaws and recommending cryptographic improvements.",
    skills: ["CRYPTOGRAPHY BASICS", "PASSWORD BEST-PRACTICE", "PASSWORD CRACKING"]
  },
  {
    id: 2,
    title: "J.P. Morgan - Software Engineering Job Simulation",
    issuer: "Forage",
    date: "Aug 2024",
    credentialId: "yibCtZMH4voFrypbR",
    verifyUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_5fnETx27mJj5M5PMS_1724177528212_completion_certificate.pdf",
    description: "Built and debugged a web application using JPMorgan’s Perspective library to create a real-time data visualization dashboard for traders.",
    skills: ["FINANCIAL ANALYSIS", "WEB APPLICATIONS", "GIT", "CONTRIBUTING TO THE OPEN SOURCE COMMUNITY"]
  },
  {
    id: 3,
    title: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024",
    credentialId: "UC-da333d85-5a2f-4c0d-94e5-74b6302d032c",
    verifyUrl: "https://udemy-certificate.s3.amazonaws.com/image/UC-da333d85-5a2f-4c0d-94e5-74b6302d032c.jpg",
    description: "Completed a full-stack web development bootcamp with hands-on projects using React, Node.js, Express, PostgreSQL, and REST APIs, while gaining practical experience with Git, authentication, and deployment workflows.",
    skills: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Git", "REST APIs", "User Authentication"]
  },
  {
    id: 4,
    title: 'Certified in Cybersecurity (CC)',
    issuer: 'ISC2',
    date: 'Oct 2024',
    verifyUrl: 'https://www.credly.com/badges/9e9b6fbd-bb9c-45a5-acf1-a0e165ed1ccb/public_url',
    description: 'Achieved ISC2 Certified in Cybersecurity (CC) certification, demonstrating foundational knowledge in cybersecurity principles, practices, and technologies.',
    skills: ['Cybersecurity Fundamentals', 'Risk Management', 'Security Operations', 'Incident Response'],
  },
  {
    id: 5,
    title: "CSE Undergraduate NSA Cybersecurity Certificate",
    issuer: "University of North Texas",
    date: "Dec 2025",
    credentialId: "In Progress",
    description: "Currently pursuing the Cybersecurity Certificate program at the University of North Texas, focusing on core areas such as network security, threat mitigation, risk management, identity and access control, and security operations.",
    skills: ["Network Security", "Threat Detection and Mitigation", "Risk Management", "Incident Response"]
  },
];

export function CertificationsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
{/*           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ...
          </p> */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {/* Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-3">
                        <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {cert.date}
                        </div>
                        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Credential Info */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Credential ID</p>
                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{cert.credentialId}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                      >
                        {cert.verifyUrl && (
                        <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Verify
                        </a>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
