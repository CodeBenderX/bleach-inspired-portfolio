import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/about-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection
        name="Angelo Tiquio"
        role="Full-Stack Developer & Educator"
      />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}
