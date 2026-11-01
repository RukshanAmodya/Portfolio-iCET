"use client";

import React from "react";
import { ExternalLink, Github, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LottiePlayer from "./LottiePlayer";
import { assetUrl } from "@/lib/assets";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github: string;
  userCount?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "ArtimaX Flutter",
    description: "A premium Android Art Marketplace mobile app in Flutter allowing artists to showcase & sell artwork with realtime chat.",
    tech: ["Flutter", "Dart", "Firebase", "Android"],
    image: "/assets/images/projects/artimax.jpg",
    link: "https://github.com/RukshanAmodya/ArtimaX-Flutter",
    github: "https://github.com/RukshanAmodya/ArtimaX-Flutter",
    userCount: "1,500+",
  },
  {
    id: 2,
    title: "Sleep Love",
    description: "Luxury sleep meditation & atmospheric soundscapes app with dynamic audio mixer, offline caching, and glassmorphic UI.",
    tech: ["Flutter", "Dart", "Glassmorphic", "Audio"],
    image: "/assets/images/projects/sleeplove.jpg",
    link: "https://github.com/RukshanAmodya/Sleep-Love",
    github: "https://github.com/RukshanAmodya/Sleep-Love",
    userCount: "3,200+",
  },
  {
    id: 3,
    title: "Solarjade Service App",
    description: "Digital energy ecosystem for solar services, IoT hardware monitoring, automated deployment workflows, and field sync.",
    tech: ["Flutter", "Dart", "IoT Hardware", "Cloud"],
    image: "/assets/images/projects/solarjade.svg",
    link: "https://github.com/RukshanAmodya/Solarjade-Service-App",
    github: "https://github.com/RukshanAmodya/Solarjade-Service-App",
    userCount: "2,000+",
  },
  {
    id: 4,
    title: "Moni Finance Manager",
    description: "Production-ready, secure personal finance manager with real-time ledger, native QR camera shared budgeting, & savings challenges.",
    tech: ["Flutter", "Finance", "QR Sync", "Security"],
    image: "/assets/images/projects/moni.svg",
    link: "https://github.com/RukshanAmodya/Moni",
    github: "https://github.com/RukshanAmodya/Moni",
    userCount: "5,000+",
  },
  {
    id: 5,
    title: "PIRM Solar Care",
    description: "End-to-end solar management app with Solax API power tracking, multi-role portal, Cloudflare Worker proxy, and Supabase.",
    tech: ["Flutter", "Solax API", "Supabase", "Cloudflare"],
    image: "/assets/images/projects/solarcare.svg",
    link: "https://github.com/RukshanAmodya/PIRM-Solar-Care",
    github: "https://github.com/RukshanAmodya/PIRM-Solar-Care",
    userCount: "3,500+",
  },
  {
    id: 6,
    title: "Tale Look Teleprompter",
    description: "Creator & vlogger teleprompter mobile app with auto-scrolling script overlay right next to the camera lens for perfect eye contact.",
    tech: ["Flutter", "Camera HUD", "Teleprompter", "Creator"],
    image: "/assets/images/projects/talelook.svg",
    link: "https://github.com/RukshanAmodya/Tale-Look",
    github: "https://github.com/RukshanAmodya/Tale-Look",
    userCount: "6,500+",
  },
  {
    id: 7,
    title: "AP.LK Physics",
    description: "A/L Physics educational platform redesign with LearniX AI, Spline 3D interactions, exam marquees, and paper center network.",
    tech: ["Next.js", "React", "Spline 3D", "Tailwind"],
    image: "/assets/images/projects/tutor.svg",
    link: "https://github.com/RukshanAmodya/Tutor",
    github: "https://github.com/RukshanAmodya/Tutor",
    userCount: "8,500+",
  },
  {
    id: 8,
    title: "devlk.com LMS",
    description: "Intelligent LMS for AI instruction featuring automated course paths, code playground, and student progress tracking.",
    tech: ["Next.js", "TypeScript", "Node.js", "AI Engine"],
    image: "/assets/images/projects/devlk.svg",
    link: "https://github.com/RukshanAmodya/devlk.com",
    github: "https://github.com/RukshanAmodya/devlk.com",
    userCount: "4,000+",
  },
  {
    id: 9,
    title: "FlowBot Railway",
    description: "High-throughput Google Flow Image Generation backend API ready for 1-click deployment on Railway with async queues.",
    tech: ["Python", "FastAPI", "Railway", "AI API"],
    image: "/assets/images/projects/flowbot.svg",
    link: "https://github.com/RukshanAmodya/FlowBot-Railway",
    github: "https://github.com/RukshanAmodya/FlowBot-Railway",
    userCount: "15,000+",
  },
  {
    id: 10,
    title: "Kova Stream",
    description: "Sleek Korean Drama & Cinema streaming platform featuring instant HLS playback, subtitle sync, and episode indexing.",
    tech: ["React", "Next.js", "Tailwind", "HLS Stream"],
    image: "/assets/images/projects/kova.svg",
    link: "https://github.com/RukshanAmodya/Kova",
    github: "https://github.com/RukshanAmodya/Kova",
    userCount: "12,000+",
  },
  {
    id: 11,
    title: "Aethera V2",
    description: "Autonomous AI agent orchestration platform empowering teams to build, automate, and deploy self-hosted workflows.",
    tech: ["Python", "AI Agents", "FastAPI", "Docker"],
    image: "/assets/images/projects/aethera.svg",
    link: "https://github.com/RukshanAmodya/Aethera-V2",
    github: "https://github.com/RukshanAmodya/Aethera-V2",
    userCount: "25,000+",
  },
  {
    id: 12,
    title: "BookBoo Story App",
    description: "Interactive animated children's storybook app with rich illustrated visuals, voice narration, and engaging audio effects.",
    tech: ["Flutter", "Story Animation", "Audio Narration", "Kids UX"],
    image: "/assets/images/projects/bookboo.svg",
    link: "https://github.com/RukshanAmodya/BookBoo",
    github: "https://github.com/RukshanAmodya/BookBoo",
    userCount: "4,500+",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-black relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Mascot */}
        <div className="flex items-center gap-3.5 mb-12">
          <div className="w-10 h-10 shrink-0">
            <LottiePlayer
              src="/animations/welcome.json"
              className="w-full h-full object-contain"
              loop={true}
              autoplay={true}
            />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              WHAT I&apos;VE BUILT
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.07 }}
              className="group flex flex-col bg-[#0b0b0d] hover:bg-[#111114] border border-white/[0.08] hover:border-white/[0.22] rounded-2xl p-3.5 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.7)]"
            >
              {/* Graphic / Image Box */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-950/80 mb-3.5 border border-white/[0.04]">
                <img
                  src={assetUrl(project.image)}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & User Stats */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-[15px] font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {project.title}
                </h3>
                {project.userCount && (
                  <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 shrink-0">
                    <Users className="w-3 h-3 text-neutral-400" />
                    <span>{project.userCount}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-400 leading-relaxed mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                  >
                    {t.toLowerCase()}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-white/[0.06] flex items-center gap-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-neutral-300 hover:text-white transition-colors border border-white/[0.06]"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live</span>
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
