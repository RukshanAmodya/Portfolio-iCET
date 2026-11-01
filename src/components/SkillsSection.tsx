"use client";

import React from "react";
import LottiePlayer from "./LottiePlayer";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/assets";

export interface SkillItem {
  name: string;
  desc: string;
  icon: string;
}

export const row1Skills: SkillItem[] = [
  { name: "React", icon: "/icons/react.svg", desc: "UI component library" },
  { name: "TypeScript", icon: "/icons/typescript.svg", desc: "Typed JavaScript" },
  { name: "JavaScript", icon: "/icons/javascript.svg", desc: "Web scripting language" },
  { name: "Node.js", icon: "/icons/nodejs.svg", desc: "Server-side runtime" },
  { name: "Python", icon: "/icons/python.svg", desc: "Versatile scripting" },
  { name: "Tailwind CSS", icon: "/icons/tailwind.svg", desc: "Utility-first CSS" },
  { name: "Git", icon: "/icons/git.svg", desc: "Version control" },
  { name: "Docker", icon: "/icons/docker.svg", desc: "Container platform" },
  { name: "MongoDB", icon: "/icons/mongodb.svg", desc: "NoSQL database" },
  { name: "MySQL", icon: "/icons/mysql.svg", desc: "Relational database" },
  { name: "SQL", icon: "/icons/sql.svg", desc: "Query language" },
  { name: "SQLite", icon: "/icons/sqlite.svg", desc: "Embedded database" },
  { name: "TensorFlow", icon: "/icons/tensorflow.svg", desc: "ML framework" },
];

export const row2Skills: SkillItem[] = [
  { name: "Vite", icon: "/icons/vitejs.svg", desc: "Fast build tool" },
  { name: "Bootstrap", icon: "/icons/bootstrap.svg", desc: "CSS framework" },
  { name: "CSS", icon: "/icons/css.svg", desc: "Stylesheet language" },
  { name: "PHP", icon: "/icons/php.svg", desc: "Server-side scripting" },
  { name: "Linux", icon: "/icons/linux.svg", desc: "OS & shell env" },
  { name: "Figma", icon: "/icons/figma.svg", desc: "UI/UX design tool" },
  { name: "After Effects", icon: "/icons/after-effects.svg", desc: "Motion graphics" },
  { name: "PyTorch", icon: "/icons/pytorch.svg", desc: "Deep learning" },
  { name: "HuggingFace", icon: "/icons/huggingface.svg", desc: "AI model hub" },
  { name: "ComfyUI", icon: "/icons/comfyui.svg", desc: "Diffusion workflow" },
  { name: "Flux", icon: "/icons/flux.svg", desc: "Image gen model" },
  { name: "Replicate", icon: "/icons/replicate.svg", desc: "ML model API" },
];

export function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="flex flex-col justify-between w-[168px] sm:w-[185px] h-[102px] sm:h-[110px] p-4 bg-[#0e0e0e]/95 hover:bg-[#181818] border border-white/[0.08] hover:border-white/[0.22] rounded-2xl shrink-0 transition-all duration-300 hover:scale-[1.03] group shadow-[0_4px_24px_rgba(0,0,0,0.5)] select-none">
      {/* Icon */}
      <div className="w-8 h-8 flex items-center justify-center">
        <img
          src={assetUrl(skill.icon)}
          alt={skill.name}
          className="w-7 h-7 object-contain filter group-hover:brightness-110 transition-all"
        />
      </div>

      {/* Label and Subtitle */}
      <div className="text-left">
        <h4 className="text-sm font-semibold text-neutral-100 group-hover:text-white transition-colors truncate">
          {skill.name}
        </h4>
        <p className="text-[11px] text-neutral-400 font-normal truncate mt-0.5">
          {skill.desc}
        </p>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <div id="skills" className="relative w-full pt-12 pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3.5"
        >
          <div className="w-14 h-14 shrink-0">
            <LottiePlayer src="/animations/skills.json" className="w-full h-full" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-0.5">
              WHAT I WORK WITH
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Skills &amp; Expertise
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Dual Opposite Marquee Rows */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 sm:gap-5">
        {/* Deep Left & Right Shade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-black via-black/85 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-black via-black/85 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Right to Left */}
        <div className="marquee-container w-full overflow-hidden flex">
          <div className="marquee-track flex gap-4 sm:gap-5 animate-marquee-left shrink-0 py-1">
            {[...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills].map((skill, i) => (
              <SkillCard key={`r1-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="marquee-container w-full overflow-hidden flex">
          <div className="marquee-track flex gap-4 sm:gap-5 animate-marquee-right shrink-0 py-1">
            {[...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills].map((skill, i) => (
              <SkillCard key={`r2-${skill.name}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
