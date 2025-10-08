"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projectsData = [
  {
    id: 1,
    title: "Multi-Modal Knowledge Assistant",
    description: "An AI-powered knowledge assistant that merges text, media, and documents into a unified RAG-based retrieval system with customizable agentic workflows.",
    image: "images/multimodal.png",
    technologies: ["Python", "TypeScript", "Next.js", "LangChain", "FAISS"],
    githubUrl: "",
    liveUrl: "",
    featured: true
  },
  {
    id: 2,
    title: "Indoor Navigation System",
    description: "An Indoor Navigation System for UNT's Engineering Building, with multi-floor support and route optimization.",
    image: "images/indoornav.png",
    technologies: ["JavaScript", "Bootstrap", "MySQL", "QJIS", "JOSM"],
    githubUrl: "https://github.com/Pranitha-Gaddam/UNT-Discovery-Park-Indoor-Navigation",
    liveUrl: "https://pranitha-gaddam.github.io/UNT-Discovery-Park-Indoor-Navigation/",
    featured: true
  },
  {
    id: 3,
    title: "Accessibility Plugin for Unity",
    description: "A Unity plugin that enhances game accessibility by guiding developers in detecting and resolving key accessibility issues.",
    image: "images/unity.png",
    technologies: ["Unity", "C#", "AWS", "OpenAI API"],
    githubUrl: "https://github.com/wajdialjedaani/UnityPlugin",
    liveUrl: "",
    featured: true
  },
  {
    id: 4,
    title: "Pomodoro Study Timer",
    description: "A deep-focus Pomodoro timer with customizable timer, backgrounds, audio, and additional tools for productivity.",
    image: "images/pomodoro.png",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/Pranitha-Gaddam/pomodoro-study-mode",
    liveUrl: "https://pomodoro-study-mode.vercel.app/",
    featured: true
  },
  {
    id: 5,
    title: "Automated File Downloader",
    description: "A python script using the Google Cloud Platform (GCP) to automatically download files from a folder in Google Drive to a local folder on your device.",
    image: "images/script.png",
    technologies: ["Python", "GCP", "OAuth", "Google Drive API"],
    githubUrl: "https://github.com/Pranitha-Gaddam/Google-Drive-Folder-Downloader",
    liveUrl: "",
    featured: false
  },
  {
    id: 6,
    title: "Restaurant Website",
    description: "A sample resaurant website for an indian restaurant with food menu display and the ability to let users make reservations online.",
    image: "images/indianres.png",
    technologies: ["React", "Spring", "PostgreSQL", "Tailwind CSS", "Heroku", "Vercel"],
    githubUrl: "https://github.com/Pranitha-Gaddam/Restaurant-Website",
    liveUrl: "https://restaurant-website-navy-three.vercel.app/",
    featured: false
  },
  {
  id: 7,
    title: "Job Scheduler",
    description: "A Simulated Annealing agent created to maximize work scheduling.",
    image: "images/jobscheduler.png",
    technologies: ["AI", "Python"],
    githubUrl: "https://github.com/Pranitha-Gaddam/Job-Scheduler",
    featured: false
  },
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate my skills and passion for development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                  >
                {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                </a>
                )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
