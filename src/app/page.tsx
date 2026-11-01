import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600/30 selection:text-white">
      <Navbar />
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
