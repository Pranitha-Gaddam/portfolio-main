"use client";

import { HeroSection } from '@/components/sections/hero';
import { EducationSection } from '@/components/sections/education';
import { ProjectsSection } from '@/components/sections/projects';
import { CertificationsSection } from '@/components/sections/certifications';
import { ExperienceSection } from '@/components/sections/experience';
import { ContactSection } from '@/components/sections/contact';
import { useEffect, useState } from "react";
import Loader from "@/components/sections/loading-screen";

const ANIMATION_DURATION: number = 4000;

export default function Home() {
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [contentReady, setContentReady] = useState<boolean>(false);

  useEffect(() => {
    // Reveal content at 3.5s (Right before slide exits at ~3.8s)
    const contentTimeout = setTimeout(() => {
      setContentReady(true);
    }, 2500); 

    const loaderRemovalTimeout = setTimeout(() => {
      setShowLoader(false);
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(contentTimeout);
      clearTimeout(loaderRemovalTimeout);
    };
  }, []);

  return (
    <>
    {showLoader && <Loader/>}
      <main className={`
          flex min-h-screen flex-col items-center justify-between w-full max-w-full
          transition-all duration-700 ease-in-out
          ${!contentReady 
            ? 'blur-sm pointer-events-none overflow-hidden h-screen' 
            : 'blur-0 opacity-100 h-auto overflow-auto'
          }
        `}>
      <div className="w-full">
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      </div>
      </main>
    </>
  );
}
