import { HeroSection } from '@/components/sections/hero';
import { EducationSection } from '@/components/sections/education';
import { ProjectsSection } from '@/components/sections/projects';
import { CertificationsSection } from '@/components/sections/certifications';
import { ExperienceSection } from '@/components/sections/experience';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}